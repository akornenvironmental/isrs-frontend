/**
 * Reusable Components for ISRS Website
 * Header, Footer, and Stay Connected sections
 */

// Language data
const translations = {
  en: {
    home: 'Home',
    about: 'About',
    icsr: 'ICSR',
    donate: 'DONATE',
    stayConnected: 'Stay Connected',
    stayConnectedText: 'Interested in working together? Fill out some info and we will be in touch shortly.',
    stayConnectedText2: "We can't wait to hear from you!",
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    required: '*',
    quickLinks: 'Quick Links',
    connect: 'Connect',
    adminPortal: 'Admin Portal',
    copyright: '© 2025 International Shellfish Restoration Society. All rights reserved.',
    taxId: 'Tax ID (EIN): 39-2829151',
    skipToMain: 'Skip to main content'
  },
  es: {
    home: 'Inicio',
    about: 'Acerca de',
    icsr: 'ICSR',
    donate: 'DONAR',
    stayConnected: 'Mantente Conectado',
    stayConnectedText: '¿Interesado en trabajar juntos? Complete la información y nos pondremos en contacto en breve.',
    stayConnectedText2: '¡Esperamos saber de ti!',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo Electrónico',
    message: 'Mensaje',
    send: 'Enviar',
    required: '*',
    quickLinks: 'Enlaces Rápidos',
    connect: 'Conectar',
    adminPortal: 'Portal Administrativo',
    copyright: '© 2025 Sociedad Internacional para la Restauración de Moluscos. Todos los derechos reservados.',
    taxId: 'Identificación Fiscal (EIN): 39-2829151',
    skipToMain: 'Saltar al contenido principal'
  },
  fr: {
    home: 'Accueil',
    about: 'À Propos',
    icsr: 'ICSR',
    donate: 'FAIRE UN DON',
    stayConnected: 'Restez Connecté',
    stayConnectedText: 'Intéressé par une collaboration? Remplissez les informations et nous vous contacterons sous peu.',
    stayConnectedText2: 'Nous avons hâte de vous entendre!',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Courriel',
    message: 'Message',
    send: 'Envoyer',
    required: '*',
    quickLinks: 'Liens Rapides',
    connect: 'Connecter',
    adminPortal: 'Portail Admin',
    copyright: '© 2025 Société Internationale pour la Restauration des Mollusques. Tous droits réservés.',
    taxId: 'Numéro fiscal (EIN): 39-2829151',
    skipToMain: 'Passer au contenu principal'
  }
};

// Get current language from localStorage or default to English
let currentLang = localStorage.getItem('isrs_language') || 'en';

// Translate function
function t(key) {
  return translations[currentLang][key] || translations.en[key] || key;
}

// Change language
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('isrs_language', lang);
  document.documentElement.lang = lang;

  // Reload components with new language
  loadHeader();
  loadStayConnected();
  loadFooter();

  // Update language selector
  updateLanguageSelector();
}

// Update language selector UI
function updateLanguageSelector() {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'true');
    } else {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
    }
  });
}

// Header component
function loadHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <a href="#main-content" class="skip-link">${t('skipToMain')}</a>
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <a href="/" class="logo" aria-label="ISRS Home">
        <img src="/images/logo-wide-blue.png" alt="ISRS Logo" width="1640" height="640" fetchpriority="high" />
      </a>
      <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Toggle menu" aria-expanded="false">
        <span aria-hidden="true">☰</span>
      </button>
      <ul class="nav-links" id="navLinks">
        <li><a href="/">${t('home')}</a></li>
        <li><a href="/about.html">${t('about')}</a></li>
        <li class="dropdown">
          <a href="/icsr.html" aria-haspopup="true" aria-expanded="false">${t('icsr')}</a>
          <ul class="dropdown-menu" role="menu">
            <li role="none"><a href="/icsr.html" role="menuitem">${t('icsr')}</a></li>
            <li role="none"><a href="/icsr2026.html" role="menuitem">ICSR2026</a></li>
          </ul>
        </li>
        <li><a href="https://www.zeffy.com/en-US/donation-form/isrs-building-tomorrows-ocean-leaders" target="_blank" rel="noopener noreferrer" class="btn-donate">${t('donate')}</a></li>
      </ul>
      <div class="language-switcher" role="group" aria-label="Language selection">
        <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" onclick="changeLanguage('en')" aria-label="English" ${currentLang === 'en' ? 'aria-current="true"' : ''}>EN</button>
        <button class="lang-btn ${currentLang === 'es' ? 'active' : ''}" data-lang="es" onclick="changeLanguage('es')" aria-label="Español" ${currentLang === 'es' ? 'aria-current="true"' : ''}>ES</button>
        <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr" onclick="changeLanguage('fr')" aria-label="Français" ${currentLang === 'fr' ? 'aria-current="true"' : ''}>FR</button>
      </div>
    </nav>
  `;
}

// Stay Connected component
function loadStayConnected() {
  const stayConnected = document.getElementById('stay-connected');
  if (!stayConnected) return;

  stayConnected.innerHTML = `
    <section class="section stay-connected" aria-labelledby="stay-connected-heading">
      <div class="container">
        <h2 id="stay-connected-heading">${t('stayConnected')}</h2>
        <p class="stay-connected-text">
          ${t('stayConnectedText')}<br>
          ${t('stayConnectedText2')}
        </p>
        <form class="contact-form" id="contactForm" onsubmit="handleContactSubmit(event)">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">${t('firstName')} <span class="required" aria-label="required">${t('required')}</span></label>
              <input type="text" id="firstName" name="firstName" required aria-required="true" />
            </div>
            <div class="form-group">
              <label for="lastName">${t('lastName')} <span class="required" aria-label="required">${t('required')}</span></label>
              <input type="text" id="lastName" name="lastName" required aria-required="true" />
            </div>
          </div>
          <div class="form-group">
            <label for="email">${t('email')} <span class="required" aria-label="required">${t('required')}</span></label>
            <input type="email" id="email" name="email" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="message">${t('message')}</label>
            <textarea id="message" name="message" rows="5" aria-describedby="message-hint"></textarea>
            <span id="message-hint" class="sr-only">Optional message field</span>
          </div>
          <button type="submit" class="btn btn-primary">${t('send')}</button>
        </form>
      </div>
    </section>
  `;
}

// Footer component
function loadFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-section footer-logo-section">
          <img src="/images/logo-wide-white.svg" alt="ISRS Logo" class="footer-logo" />
          <p>International Shellfish Restoration Society</p>
          <p>Building community and advancing innovation in global shellfish restoration</p>
          <p class="footer-ein">${t('taxId')}</p>
        </div>
        <div class="footer-section">
          <h4>${t('quickLinks')}</h4>
          <ul>
            <li><a href="/">${t('home')}</a></li>
            <li><a href="/about.html">${t('about')}</a></li>
            <li><a href="/icsr.html">${t('icsr')}</a></li>
            <li><a href="/icsr2026.html">ICSR2026</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>${t('connect')}</h4>
          <ul>
            <li><a href="https://www.zeffy.com/en-US/donation-form/isrs-building-tomorrows-ocean-leaders" target="_blank" rel="noopener noreferrer">${t('donate')}</a></li>
            <li><a href="/admin/">${t('adminPortal')}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>${t('copyright')}</p>
      </div>
    </div>
  `;
}

// Handle contact form submission
async function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Track form submission
  if (window.ISRSAnalytics) {
    window.ISRSAnalytics.trackFormSubmission('contact_form');
  }

  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.textContent = '...';

  const formData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    // TODO: Send to backend API
    console.log('Contact form submitted:', formData);

    // Show success message
    alert('Thank you! We will be in touch soon.');
    form.reset();
  } catch (error) {
    console.error('Form submission error:', error);
    alert('Sorry, there was an error. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const toggle = document.querySelector('.mobile-menu-toggle');

  if (navLinks) {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    toggle.setAttribute('aria-expanded', isExpanded);
  }
}

// Initialize components on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set document language
  document.documentElement.lang = currentLang;

  // Load all components
  loadHeader();
  loadStayConnected();
  loadFooter();

  // Make functions globally available
  window.changeLanguage = changeLanguage;
  window.toggleMobileMenu = toggleMobileMenu;
  window.handleContactSubmit = handleContactSubmit;
});
