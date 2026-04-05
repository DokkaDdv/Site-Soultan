async function loadIncludes() {
  const nodes = Array.from(document.querySelectorAll("[data-include]"));
  for (const el of nodes) {
    const path = el.getAttribute("data-include");
    if (!path) continue;
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = (await res.text()).trim();
      el.insertAdjacentHTML("beforebegin", html);
      el.remove();
    } catch (err) {
      console.error("Chargement impossible:", path, err);
      el.innerHTML =
        '<p style="padding:2rem 1.5rem;color:#b91c1c;font-family:Inter,sans-serif;font-size:0.9rem;">Impossible de charger une partie de la page. Utilisez un serveur local (ex. <code>npx serve</code>) ou déployez sur Vercel : les fichiers <code>components/</code> ne se chargent pas en ouvrant le fichier directement.</p>';
    }
  }
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });
}

function initObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay, 10) || 0;
          setTimeout(() => entry.target.classList.add("visible"), delay);
        }
      });
    },
    { threshold: 0.12 }
  );
  document
    .querySelectorAll(
      ".stat, .service-card, .testimonial-card, .ref-card, .photo-slot, .gallery-photo, .realisation-block, .real-card, .real-preview-card, .real-stat"
    )
    .forEach((el) => observer.observe(el));
}

function initModals() {
  const backdrop = document.getElementById('modal-backdrop');
  if (!backdrop) return;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute('open', '');
    backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => modal.classList.add('is-open'));
    modal.querySelector('.modal-close')?.focus();
  }

  function closeAll() {
    document.querySelectorAll('.real-modal[open]').forEach(m => {
      m.classList.remove('is-open');
      setTimeout(() => m.removeAttribute('open'), 250);
    });
    backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.real-card[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  backdrop.addEventListener('click', closeAll);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
}

function initForm() {
  const form = document.getElementById("devis-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation côté client
    const prenom = form.prenom.value.trim();
    const nom = form.nom.value.trim();
    const telephone = form.telephone.value.trim();
    const email = form.email.value.trim();
    const type_travaux = form.type_travaux.value;
    const description = form.description.value.trim();

    if (!prenom || !nom || !telephone || !type_travaux || !description) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert("Adresse email invalide.");
      return;
    }

    const telRegex = /^[\d\s\-\+\(\)]+$/;
    if (!telRegex.test(telephone)) {
      alert("Numéro de téléphone invalide.");
      return;
    }

    const btn = form.querySelector(".form-submit");
    btn.textContent = "Envoi en cours...";
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        const success = document.getElementById("form-success");
        if (success) success.style.display = "block";
        btn.textContent = "✓ Envoyé";
      } else {
        btn.textContent = "Erreur — réessayez";
        btn.disabled = false;
      }
    } catch {
      btn.textContent = "Erreur — réessayez";
      btn.disabled = false;
    }
  });
}

(async function boot() {
  await loadIncludes();
  if (typeof window.applySiteConfig === "function") window.applySiteConfig();
  initNavbar();
  if (typeof window.initMobileNav === "function") window.initMobileNav();
  if (typeof window.initRealisationsGallery === "function") window.initRealisationsGallery();
  initObserver();
  initModals();
  initForm();
})();
