/**
 * Reusable Components for ISRS Website
 * Header, Footer, and Stay Connected sections
 */

// Language data - Comprehensive translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    icsr: 'ICSR',
    donate: 'DONATE',
    skipToMain: 'Skip to main content',

    // Homepage - Hero
    heroHeading: 'Building community and advancing innovation in global shellfish restoration',
    heroSubtitle: 'The International Shellfish Restoration Society (ISRS) unites scientists, practitioners, and communities worldwide to protect and restore vital shellfish ecosystems. Through knowledge sharing, collaboration, and innovative approaches, we\'re working to ensure the resilience of coastal ecosystems for generations to come.',

    // Homepage - Featured Initiatives
    icsrCardTitle: 'International Conference on Shellfish Restoration (ICSR)',
    icsrCardText: 'Join us in Washington\'s Puget Sound for ICSR 2026, the premier global gathering for shellfish restoration science and practice. Connect with leaders in the field, share your research, and discover innovative approaches to restoration challenges.',
    icsrCardButton: 'Learn More About ICSR 2026',

    knowledgeCardTitle: 'Global Knowledge Exchange',
    knowledgeCardText: 'Access cutting-edge research, best practices, and lessons learned from restoration projects worldwide. Our international network connects practitioners across continents to share expertise and accelerate successful restoration outcomes.',
    knowledgeCardButton: 'Explore Resources',

    communityCardTitle: 'Community Impact',
    communityCardText: 'From oyster reefs to mussel beds, shellfish restoration enhances water quality, supports biodiversity, and builds coastal resilience. Discover how our members are making a difference in coastal ecosystems around the world.',
    communityCardButton: 'View Success Stories',

    // Homepage - Latest News
    latestNews: 'Latest News',
    news1Title: 'Registration Opens Soon for ICSR 2026',
    news1Text: 'Mark your calendar for the next International Conference on Shellfish Restoration in Puget Sound.',
    news1Button: 'Get Updates',

    news2Title: 'Launch of a New Global Partnership',
    news2Text: 'ISRS joins forces with the Native Oyster Restoration Alliance (NORA) and the Australasian Coastal Restoration Network to advance international restoration efforts.',
    news2Button: 'Learn More',

    news3Title: 'Student Research Spotlight',
    news3Text: 'Meet the next generation of restoration scientists and their groundbreaking work.',
    news3Button: 'Next Gen Science',

    // Homepage - Why It Matters
    whyMattersHeading: 'Why Shellfish Restoration Matters',
    whyMattersIntro: 'Shellfish ecosystems provide essential services that support both marine life and human communities:',

    benefit1Title: '💧 Water Filtration',
    benefit1Text: 'Improved water quality through natural filtration',

    benefit2Title: '🐟 Critical Habitat',
    benefit2Text: 'Essential habitat for marine species',

    benefit3Title: '🌊 Coastal Protection',
    benefit3Text: 'Natural barriers against storm surge and erosion',

    benefit4Title: '🍽️ Food Security',
    benefit4Text: 'Sustainable seafood for local communities',

    benefit5Title: '🌱 Carbon Sequestration',
    benefit5Text: 'Climate change mitigation through carbon storage',

    benefit6Title: '🎣 Sustainable Fisheries',
    benefit6Text: 'Supporting local economies and food security',

    benefit7Title: '🏛️ Cultural Heritage',
    benefit7Text: 'Preservation of traditional practices',

    // Call to Action
    ctaText: 'Together, we can restore these vital ecosystems and build more resilient coasts.',

    // Get Involved Section
    getInvolvedHeading: 'Get Involved',

    joinNetworkTitle: 'Join Our Network',
    joinNetworkText: 'Connect with restoration practitioners, scientists, and community leaders worldwide. Members gain access to exclusive resources, networking opportunities, and conference discounts.',
    joinNetworkButton: 'Become a Member',

    shareKnowledgeTitle: 'Share Your Knowledge',
    shareKnowledgeText: 'Present your research, contribute to best practices guides, or mentor emerging professionals. Your expertise helps advance the field of shellfish restoration.',
    shareKnowledgeButton: 'Partner With Us',

    supportMissionTitle: 'Support Our Mission',
    supportMissionText: 'Help build a sustainable future for coastal ecosystems through membership, partnership, or charitable giving.',
    supportMissionButton: 'Make a Donation',

    donationNote: 'ISRS uses Zeffy, a 100% free fundraising platform that allows us to receive every dollar of your donation without deducting platform fees. When you donate, you\'ll see an optional contribution to support Zeffy\'s free service. This tip is completely optional - you may adjust it to any amount or $0.',

    // Global Network
    globalNetworkHeading: 'Our Global Network',
    globalNetworkIntro: 'Join our growing network of over 2,600 members working to advance shellfish restoration worldwide.',
    globalNetworkText: 'ISRS connects restoration practitioners across six continents, fostering collaboration among:',

    stakeholder1: 'Research institutions',
    stakeholder2: 'Government agencies',
    stakeholder3: 'Conservation organizations',
    stakeholder4: 'Indigenous communities',
    stakeholder5: 'Industry partners',
    stakeholder6: 'Local stakeholders',

    // Common buttons
    learnMore: 'Learn More',
    getInvolved: 'Get Involved',
    readMore: 'Read More',

    // Footer
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
    taxId: 'Tax ID (EIN): 39-2829151'
  },
  es: {
    // Navegación
    home: 'Inicio',
    about: 'Acerca de',
    icsr: 'ICSR',
    donate: 'DONAR',
    skipToMain: 'Saltar al contenido principal',

    // Página de inicio - Hero
    heroHeading: 'Construyendo comunidad e innovación avanzada en la restauración global de moluscos',
    heroSubtitle: 'La Sociedad Internacional para la Restauración de Moluscos (ISRS) une a científicos, profesionales y comunidades de todo el mundo para proteger y restaurar ecosistemas vitales de moluscos. A través del intercambio de conocimientos, la colaboración y enfoques innovadores, trabajamos para garantizar la resiliencia de los ecosistemas costeros para las generaciones venideras.',

    // Página de inicio - Iniciativas Destacadas
    icsrCardTitle: 'Conferencia Internacional sobre Restauración de Moluscos (ICSR)',
    icsrCardText: 'Únase a nosotros en Puget Sound, Washington, para ICSR 2026, la principal reunión global de ciencia y práctica de restauración de moluscos. Conéctese con líderes en el campo, comparta su investigación y descubra enfoques innovadores para los desafíos de restauración.',
    icsrCardButton: 'Más Información sobre ICSR 2026',

    knowledgeCardTitle: 'Intercambio Global de Conocimientos',
    knowledgeCardText: 'Acceda a investigaciones de vanguardia, mejores prácticas y lecciones aprendidas de proyectos de restauración en todo el mundo. Nuestra red internacional conecta a profesionales de todos los continentes para compartir experiencia y acelerar resultados exitosos de restauración.',
    knowledgeCardButton: 'Explorar Recursos',

    communityCardTitle: 'Impacto Comunitario',
    communityCardText: 'Desde arrecifes de ostras hasta lechos de mejillones, la restauración de moluscos mejora la calidad del agua, apoya la biodiversidad y construye la resiliencia costera. Descubra cómo nuestros miembros están marcando la diferencia en los ecosistemas costeros de todo el mundo.',
    communityCardButton: 'Ver Historias de Éxito',

    // Página de inicio - Últimas Noticias
    latestNews: 'Últimas Noticias',
    news1Title: 'Pronto se Abrirá el Registro para ICSR 2026',
    news1Text: 'Marque su calendario para la próxima Conferencia Internacional sobre Restauración de Moluscos en Puget Sound.',
    news1Button: 'Recibir Actualizaciones',

    news2Title: 'Lanzamiento de una Nueva Asociación Global',
    news2Text: 'ISRS une fuerzas con la Alianza para la Restauración de Ostras Nativas (NORA) y la Red de Restauración Costera de Australasia para avanzar en los esfuerzos de restauración internacional.',
    news2Button: 'Saber Más',

    news3Title: 'Destacados de Investigación Estudiantil',
    news3Text: 'Conozca a la próxima generación de científicos de restauración y su trabajo innovador.',
    news3Button: 'Ciencia de Nueva Generación',

    // Página de inicio - Por Qué Importa
    whyMattersHeading: 'Por Qué Importa la Restauración de Moluscos',
    whyMattersIntro: 'Los ecosistemas de moluscos proporcionan servicios esenciales que apoyan tanto a la vida marina como a las comunidades humanas:',

    benefit1Title: '💧 Filtración de Agua',
    benefit1Text: 'Mejor calidad del agua a través de filtración natural',

    benefit2Title: '🐟 Hábitat Crítico',
    benefit2Text: 'Hábitat esencial para especies marinas',

    benefit3Title: '🌊 Protección Costera',
    benefit3Text: 'Barreras naturales contra las marejadas y la erosión',

    benefit4Title: '🍽️ Seguridad Alimentaria',
    benefit4Text: 'Mariscos sostenibles para comunidades locales',

    benefit5Title: '🌱 Secuestro de Carbono',
    benefit5Text: 'Mitigación del cambio climático mediante almacenamiento de carbono',

    benefit6Title: '🎣 Pesquerías Sostenibles',
    benefit6Text: 'Apoyo a las economías locales y seguridad alimentaria',

    benefit7Title: '🏛️ Patrimonio Cultural',
    benefit7Text: 'Preservación de prácticas tradicionales',

    // Llamado a la Acción
    ctaText: 'Juntos, podemos restaurar estos ecosistemas vitales y construir costas más resilientes.',

    // Sección Participa
    getInvolvedHeading: 'Participa',

    joinNetworkTitle: 'Únete a Nuestra Red',
    joinNetworkText: 'Conéctate con profesionales de restauración, científicos y líderes comunitarios de todo el mundo. Los miembros obtienen acceso a recursos exclusivos, oportunidades de networking y descuentos en conferencias.',
    joinNetworkButton: 'Hazte Miembro',

    shareKnowledgeTitle: 'Comparte Tu Conocimiento',
    shareKnowledgeText: 'Presenta tu investigación, contribuye a guías de mejores prácticas o asesora a profesionales emergentes. Tu experiencia ayuda a avanzar en el campo de la restauración de moluscos.',
    shareKnowledgeButton: 'Asóciate con Nosotros',

    supportMissionTitle: 'Apoya Nuestra Misión',
    supportMissionText: 'Ayuda a construir un futuro sostenible para los ecosistemas costeros a través de membresía, asociación o donaciones caritativas.',
    supportMissionButton: 'Haz una Donación',

    donationNote: 'ISRS usa Zeffy, una plataforma de recaudación de fondos 100% gratuita que nos permite recibir cada dólar de tu donación sin deducir tarifas de plataforma. Cuando dones, verás una contribución opcional para apoyar el servicio gratuito de Zeffy. Esta propina es completamente opcional: puedes ajustarla a cualquier cantidad o $0.',

    // Red Global
    globalNetworkHeading: 'Nuestra Red Global',
    globalNetworkIntro: 'Únete a nuestra red en crecimiento de más de 2,600 miembros trabajando para avanzar en la restauración de moluscos en todo el mundo.',
    globalNetworkText: 'ISRS conecta a profesionales de restauración en seis continentes, fomentando la colaboración entre:',

    stakeholder1: 'Instituciones de investigación',
    stakeholder2: 'Agencias gubernamentales',
    stakeholder3: 'Organizaciones de conservación',
    stakeholder4: 'Comunidades indígenas',
    stakeholder5: 'Socios industriales',
    stakeholder6: 'Partes interesadas locales',

    // Botones comunes
    learnMore: 'Saber Más',
    getInvolved: 'Participar',
    readMore: 'Leer Más',

    // Pie de página
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
    taxId: 'Identificación Fiscal (EIN): 39-2829151'
  },
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À Propos',
    icsr: 'ICSR',
    donate: 'FAIRE UN DON',
    skipToMain: 'Passer au contenu principal',

    // Page d'accueil - Hero
    heroHeading: 'Construire une communauté et faire progresser l\'innovation dans la restauration mondiale des mollusques',
    heroSubtitle: 'La Société Internationale pour la Restauration des Mollusques (ISRS) réunit des scientifiques, des praticiens et des communautés du monde entier pour protéger et restaurer les écosystèmes de mollusques vitaux. Par le partage des connaissances, la collaboration et des approches innovantes, nous travaillons à assurer la résilience des écosystèmes côtiers pour les générations à venir.',

    // Page d'accueil - Initiatives Vedettes
    icsrCardTitle: 'Conférence Internationale sur la Restauration des Mollusques (ICSR)',
    icsrCardText: 'Rejoignez-nous à Puget Sound, Washington, pour ICSR 2026, le principal rassemblement mondial de science et de pratique de restauration des mollusques. Connectez-vous avec les leaders du domaine, partagez vos recherches et découvrez des approches innovantes aux défis de restauration.',
    icsrCardButton: 'En Savoir Plus sur ICSR 2026',

    knowledgeCardTitle: 'Échange Mondial de Connaissances',
    knowledgeCardText: 'Accédez à des recherches de pointe, aux meilleures pratiques et aux leçons tirées de projets de restauration dans le monde entier. Notre réseau international connecte les praticiens sur tous les continents pour partager l\'expertise et accélérer les résultats de restauration réussis.',
    knowledgeCardButton: 'Explorer les Ressources',

    communityCardTitle: 'Impact Communautaire',
    communityCardText: 'Des récifs d\'huîtres aux bancs de moules, la restauration des mollusques améliore la qualité de l\'eau, soutient la biodiversité et renforce la résilience côtière. Découvrez comment nos membres font une différence dans les écosystèmes côtiers du monde entier.',
    communityCardButton: 'Voir les Réussites',

    // Page d'accueil - Dernières Nouvelles
    latestNews: 'Dernières Nouvelles',
    news1Title: 'Les Inscriptions Ouvrent Bientôt pour ICSR 2026',
    news1Text: 'Marquez votre calendrier pour la prochaine Conférence Internationale sur la Restauration des Mollusques à Puget Sound.',
    news1Button: 'Recevoir les Mises à Jour',

    news2Title: 'Lancement d\'un Nouveau Partenariat Mondial',
    news2Text: 'ISRS s\'associe à la Native Oyster Restoration Alliance (NORA) et au Réseau de Restauration Côtière d\'Australasie pour faire progresser les efforts de restauration internationale.',
    news2Button: 'En Savoir Plus',

    news3Title: 'Recherche Étudiante en Vedette',
    news3Text: 'Rencontrez la prochaine génération de scientifiques de la restauration et leur travail révolutionnaire.',
    news3Button: 'Science de Nouvelle Génération',

    // Page d'accueil - Pourquoi C'est Important
    whyMattersHeading: 'Pourquoi la Restauration des Mollusques Importe',
    whyMattersIntro: 'Les écosystèmes de mollusques fournissent des services essentiels qui soutiennent à la fois la vie marine et les communautés humaines:',

    benefit1Title: '💧 Filtration de l\'Eau',
    benefit1Text: 'Qualité de l\'eau améliorée par filtration naturelle',

    benefit2Title: '🐟 Habitat Critique',
    benefit2Text: 'Habitat essentiel pour les espèces marines',

    benefit3Title: '🌊 Protection Côtière',
    benefit3Text: 'Barrières naturelles contre les ondes de tempête et l\'érosion',

    benefit4Title: '🍽️ Sécurité Alimentaire',
    benefit4Text: 'Fruits de mer durables pour les communautés locales',

    benefit5Title: '🌱 Séquestration du Carbone',
    benefit5Text: 'Atténuation du changement climatique par le stockage du carbone',

    benefit6Title: '🎣 Pêcheries Durables',
    benefit6Text: 'Soutien aux économies locales et à la sécurité alimentaire',

    benefit7Title: '🏛️ Patrimoine Culturel',
    benefit7Text: 'Préservation des pratiques traditionnelles',

    // Appel à l\'Action
    ctaText: 'Ensemble, nous pouvons restaurer ces écosystèmes vitaux et construire des côtes plus résilientes.',

    // Section S\'impliquer
    getInvolvedHeading: 'S\'impliquer',

    joinNetworkTitle: 'Rejoignez Notre Réseau',
    joinNetworkText: 'Connectez-vous avec des praticiens de la restauration, des scientifiques et des leaders communautaires du monde entier. Les membres ont accès à des ressources exclusives, des opportunités de réseautage et des réductions pour les conférences.',
    joinNetworkButton: 'Devenir Membre',

    shareKnowledgeTitle: 'Partagez Vos Connaissances',
    shareKnowledgeText: 'Présentez vos recherches, contribuez aux guides de meilleures pratiques ou mentorez des professionnels émergents. Votre expertise aide à faire progresser le domaine de la restauration des mollusques.',
    shareKnowledgeButton: 'Partenariat avec Nous',

    supportMissionTitle: 'Soutenez Notre Mission',
    supportMissionText: 'Aidez à construire un avenir durable pour les écosystèmes côtiers par le biais de l\'adhésion, du partenariat ou du don caritatif.',
    supportMissionButton: 'Faire un Don',

    donationNote: 'ISRS utilise Zeffy, une plateforme de collecte de fonds 100% gratuite qui nous permet de recevoir chaque dollar de votre don sans déduire de frais de plateforme. Lorsque vous faites un don, vous verrez une contribution optionnelle pour soutenir le service gratuit de Zeffy. Ce pourboire est entièrement optionnel - vous pouvez l\'ajuster à n\'importe quel montant ou 0$.',

    // Réseau Global
    globalNetworkHeading: 'Notre Réseau Mondial',
    globalNetworkIntro: 'Rejoignez notre réseau en croissance de plus de 2 600 membres travaillant à faire progresser la restauration des mollusques dans le monde entier.',
    globalNetworkText: 'ISRS connecte les praticiens de la restauration sur six continents, favorisant la collaboration entre:',

    stakeholder1: 'Institutions de recherche',
    stakeholder2: 'Agences gouvernementales',
    stakeholder3: 'Organisations de conservation',
    stakeholder4: 'Communautés autochtones',
    stakeholder5: 'Partenaires industriels',
    stakeholder6: 'Parties prenantes locales',

    // Boutons communs
    learnMore: 'En Savoir Plus',
    getInvolved: 'S\'impliquer',
    readMore: 'Lire Plus',

    // Pied de page
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
    taxId: 'Numéro fiscal (EIN): 39-2829151'
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

  // Translate page content
  translatePage();
}

// Translate all elements with data-i18n attributes
function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);

    // Handle different element types
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      if (element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      } else {
        element.value = translation;
      }
    } else {
      element.textContent = translation;
    }
  });
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

  // Translate page content
  translatePage();

  // Make functions globally available
  window.changeLanguage = changeLanguage;
  window.toggleMobileMenu = toggleMobileMenu;
  window.handleContactSubmit = handleContactSubmit;
});
