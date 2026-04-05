/**
 * CONFIGURATION DU SITE — À compléter avec les infos définitives de l’artisan.
 * Tout ce qui est vide ("" ou []) affichera un libellé temporaire sur le site
 * ou conservera les emplacements galerie par défaut.
 *
 * Champs principaux :
 * - baseUrl : URL publique du site (avec https, sans slash final) — pour sitemap / schema
 * - siret, addressLine, postalCode, city : mentions légales + schema
 * - phoneDisplay / phoneTel : affichage vs lien tel:+33...
 * - email
 * - gallery : quand tu ajoutes des objets { src, alt, caption }, la galerie remplace les placeholders
 * - ogImageFilename : nom du fichier dans /images/ (ex. "og.jpg") une fois uploadé
 */
window.SITE_CONFIG = {
  baseUrl: "https://soultan-maconnerie.vercel.app",

  businessName: "Soultan Maçonnerie",
  /** Nom de l’auto-entrepreneur (facturation, légal) */
  legalName: "Doudaev Soultan",
  legalStatus: "Auto-entrepreneur",
  publicationDirector: "Doudaev Soultan",

  /**
   * Numéro d’identification (9 chiffres = SIREN ; factures = SIRET 14 chiffres si différent).
   * Complétez avec les 5 derniers chiffres (NIC) si vous les avez pour l’affichage SIRET complet.
   */
  siret: "829 543 560",
  vatNumber: "",

  addressLine: "88 avenue Sainte Marguerite",
  postalCode: "06200",
  city: "Nice",
  region: "Provence-Alpes-Côte d'Azur",

  copyrightYear: "2026",

  phoneDisplay: "06 87 82 83 29",
  phoneTel: "+33687828329",
  email: "soultan1971@gmail.com",

  decennaleInsurer: "",
  decennalePolicy: "",

  hostName: "Vercel Inc.",
  hostAddress: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
  hostUrl: "https://vercel.com",

  /** Image Open Graph : place le fichier dans /images/ puis mets le nom ici (ex. "og.jpg") */
  ogImageFilename: "",

  /**
   * Réalisations : laisse [] pour garder les emplacements vides du composant.
   * Exemple d’entrée : { src: "images/chantiers/mur-nice-01.jpg", alt: "Mur porteur", caption: "Nice, 2024" }
   */
  gallery: [],

  /** Texte sous le titre galerie quand il y a au moins une photo (optionnel) */
  galleryLeadWhenFilled: "",
};
