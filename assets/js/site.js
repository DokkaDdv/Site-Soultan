/* Soultan Maçonnerie — comportements communs (sans dépendance). Socle repris de Bati Home Concept. */
(() => {
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const rm = root.classList.contains('rm');
  const track = (name) => { if (window.plausible) window.plausible(name); };
  window.__smSite = true;

  /* Menu mobile */
  const hdr = $('#hdr');
  const menuBtn = $('.hdr-menu');
  const setMenu = (open) => {
    hdr.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Fermer' : 'Menu';
  };
  menuBtn.addEventListener('click', () => setMenu(!hdr.classList.contains('menu-open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && hdr.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });
  $$('.mnav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* Menu Services : survol à la souris, clic ou clavier ailleurs ; Échap ou clic extérieur pour fermer */
  const drop = $('.nav-drop');
  if (drop) {
    const hover = matchMedia('(hover: hover)').matches;
    let t = 0;
    drop.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { clearTimeout(t); drop.open = true; } });
    drop.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') t = setTimeout(() => { drop.open = false; }, 250); });
    $('summary', drop).addEventListener('click', (e) => { if (hover && e.detail) { e.preventDefault(); drop.open = true; } });
    document.addEventListener('click', (e) => { if (!drop.contains(e.target)) drop.open = false; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drop.open) { drop.open = false; $('summary', drop).focus(); } });
  }

  /* Mesure des clics de contact (Plausible, si activé) */
  document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

  /* Apparitions au défilement */
  const reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !rm) {
    const rio = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => rio.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-in'));

  /* Formulaire de devis en 3 étapes, envoyé par Formspree (hébergement Vercel) */
  $$('form.devis').forEach((form) => {
    const steps = $$('.step', form), nEl = $('[data-step-n]', form), status = $('.form-status', form);
    const btn = $('[type=submit]', form);
    let i = 0;
    const valid = () => {
      const bad = $$('input, select, textarea', steps[i]).find((f) => !f.checkValidity());
      if (bad) { bad.reportValidity(); return false; }
      status.textContent = '';
      return true;
    };
    const show = (k) => {
      steps[i].classList.remove('is-active');
      i = k;
      steps[i].classList.add('is-active');
      nEl.textContent = String(i + 1);
      const f = $('input:not([type=hidden]), select, textarea', steps[i]);
      if (f) f.focus({ preventScroll: true });
    };
    form.addEventListener('click', (e) => {
      if (e.target.closest('[data-next]') && valid()) show(i + 1);
      if (e.target.closest('[data-prev]')) show(i - 1);
      /* Étape 1 : un clic sur un type de travaux suffit pour passer à la suite
         (au clavier, les flèches changent le choix sans avancer : e.detail vaut 0) */
      if (i === 0 && e.detail && e.target.matches('input[type=radio]')) setTimeout(() => { if (i === 0) show(1); }, 250);
    });
    const choix = $('[data-choix]', form);
    form.addEventListener('change', (e) => { if (e.target.name === 'travaux') choix.textContent = ` · ${e.target.value}`; });
    /* Venu d'une page de service (/devis/?travaux=…) : le type est déjà choisi, on commence à l'étape 2 */
    const pre = new URLSearchParams(location.search).get('travaux');
    const radio = pre && $$('input[name=travaux]', form).find((r) => r.value === pre);
    if (radio) { radio.checked = true; choix.textContent = ` · ${pre}`; steps[0].classList.remove('is-active'); i = 1; steps[1].classList.add('is-active'); nEl.textContent = '2'; }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!valid() || btn.disabled) return;
      btn.disabled = true; // pas de double envoi
      status.textContent = 'Envoi…';
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        const go = () => { location.href = '/merci/'; };
        if (window.plausible) { window.plausible('Devis envoyé', { callback: go }); setTimeout(go, 1000); } else go();
      } catch (err) {
        btn.disabled = false;
        status.textContent = 'L’envoi n’a pas fonctionné. Appelez Soultan au 06 87 82 83 29.';
      }
    });
  });
})();
