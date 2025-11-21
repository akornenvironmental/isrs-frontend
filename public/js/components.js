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
    stayConnectedText: 'Interested in working together? Fill out some info and we will be in touch shortly.<br>',
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

    // Member Portal - Login
    memberLogin: 'Member Login',
    loginSubtitle: 'Enter your email address and we\'ll send you a secure login link',
    emailAddress: 'Email Address',
    sendMagicLink: 'Send Magic Link',
    dontHaveAccount: 'Don\'t have an account yet?',
    pastAttendeeNote: 'If you\'ve attended a past ICSR conference, you already have an account! Just enter the email you used for registration.',
    learnAboutICSR: 'Learn About ICSR2026',
    checkYourEmail: 'Check Your Email!',
    magicLinkSent: 'We\'ve sent a secure login link to',
    magicLinkInstructions: 'Click the link in the email to access your member profile. The link will expire in 15 minutes.',
    sendAnotherLink: 'Send Another Link',

    // Member Portal - Verification
    verifyingLogin: 'Verifying Your Login',
    verifyingMessage: 'Please wait while we securely log you in...',
    loginFailed: 'Login Failed',
    invalidLink: 'This login link is invalid or has expired.',
    troubleshooting: 'Troubleshooting:',
    linkExpires: 'Magic links expire after 15 minutes',
    linkOnceOnly: 'Each link can only be used once',
    useLatestLink: 'Make sure you clicked the latest link sent to your email',
    requestNewLink: 'Request New Login Link',
    returnToHome: 'Return to Home',

    // Member Portal - Welcome/Profile Setup
    welcomeToISRS: 'Welcome to ISRS!',
    profileCompletion: 'Profile Completion',
    completeProfileMessage: 'Complete your profile to connect with other members and unlock all features',
    basicInformation: 'Basic Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailCannotChange: 'Email cannot be changed',
    country: 'Country',
    city: 'City',
    phone: 'Phone',

    // Professional Information
    professionalInformation: 'Professional Information',
    organization: 'Organization',
    positionTitle: 'Position/Title',
    department: 'Department',
    bioAboutMe: 'Bio / About Me',
    bioPlaceholder: 'Tell us about your work in shellfish restoration...',
    researchAreas: 'Research Areas',
    researchAreasPlaceholder: 'E.g., oyster reef restoration, water quality, habitat assessment...',
    separateWithCommas: 'Separate multiple areas with commas',

    // Conference History
    conferenceHistory: 'Your ICSR Conference History',

    // Privacy & Directory
    privacyDirectorySettings: 'Privacy & Directory Settings',
    memberDirectory: 'Member Directory',
    memberDirectoryDescription: 'The ISRS member directory helps connect researchers, practitioners, and stakeholders working in shellfish restoration worldwide.',
    includeInDirectory: 'Include me in the public member directory',
    chooseVisibleInfo: 'Choose what information to show in the directory:',
    nameRequired: 'Name (required)',
    position: 'Position',
    bio: 'Bio',
    conferenceHistoryLabel: 'Conference History',

    // Privacy & Terms
    privacyTerms: 'Privacy & Terms',
    privacyPolicyAgree: 'I have read and agree to the',
    privacyPolicy: 'Privacy Policy',
    privacyConsentText: 'and consent to ISRS collecting and processing my personal data as described.',
    termsOfService: 'Terms of Service',
    termsAgree: 'I agree to the ISRS Terms of Service and understand that this profile will be used for networking and conference purposes.',
    yourPrivacyRights: 'Your Privacy Rights:',
    privacyRightsText: 'You can request a copy of your data, update your information, or request account deletion at any time from your profile settings. We will never sell your data to third parties.',

    // Form Actions
    completeProfileContinue: 'Complete Profile & Continue',
    fieldsRequired: 'Fields marked with',
    areRequired: 'are required',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    saving: 'Saving...',

    // Profile Page
    myProfile: 'My Profile',
    memberSince: 'Member since',
    viewDirectory: 'View Directory',
    notProvided: 'Not provided',
    emailCannotChangeContact: 'Email cannot be changed. Contact support if needed.',
    expertiseKeywords: 'Expertise Keywords',
    separateKeywordsCommas: 'Separate keywords with commas',

    // Online Presence
    onlinePresence: 'Online Presence',
    website: 'Website',
    linkedinURL: 'LinkedIn URL',
    orcid: 'ORCID',

    // Directory Visibility
    directoryPrivacySettings: 'Directory & Privacy Settings',
    visibleFieldsDirectory: 'Visible Fields in Directory:',
    email: 'Email',

    // Profile Tips
    profileTip: 'Tip:',
    profileTipMessage: 'Complete more fields to increase your profile visibility and help other members find you!',

    // Profile Completion Status
    completeProfile: 'Complete Profile',
    profileComplete: 'Your profile is complete and looking great!',
    goodProgress: 'Good progress! Add more information to help members find you.',
    completeMoreFields: 'Complete more fields to increase your profile visibility.',

    // Data Privacy & Account
    dataPrivacyAccount: 'Data Privacy & Account',
    exportYourData: 'Export Your Data',
    exportDataDescription: 'Download a copy of all your personal data',
    requestDataExport: 'Request Data Export',
    deleteAccount: 'Delete Account',
    deleteAccountDescription: 'Permanently delete your account and data',
    logout: 'Logout',

    // Data Export/Deletion Confirmations
    exportDataConfirm: 'Request a copy of all your personal data? You will receive an email with a download link within 48 hours.',
    exportDataSuccess: 'Data export requested successfully! You will receive an email within 48 hours.',
    deleteAccountConfirm: 'Are you sure you want to delete your account?',
    deleteAccountWarning: 'This will:\n• Remove you from the member directory\n• Delete all your personal data\n• Cancel any conference registrations\n\nThis action cannot be undone.',
    deleteAccountReason: 'Optional: Please tell us why you\'re leaving (helps us improve):',
    deleteAccountSuccess: 'Account deletion requested. Your account will be deleted within 7 days. You will receive a confirmation email.',

    // Alerts & Messages
    profileUpdatedSuccess: 'Profile updated successfully!',
    failedToLoadProfile: 'Failed to load your profile. Please try refreshing the page.',
    failedToSaveProfile: 'Failed to save profile:',

    // Member Directory Page
    memberDirectoryTitle: 'Member Directory',
    memberDirectorySubtitle: 'Connect with researchers, practitioners, and stakeholders working in shellfish restoration worldwide',
    search: 'Search',
    searchPlaceholder: 'Search members...',
    searchFields: '(name, organization, bio, research areas)',
    allCountries: 'All Countries',
    conferenceYear: 'Conference Year',
    allYears: 'All Years',
    clearFilters: 'Clear Filters',
    loadingMembers: 'Loading members...',
    noMembersFound: 'No Members Found',
    adjustSearchCriteria: 'Try adjusting your search criteria or filters',
    membersFound: 'members found',
    memberFound: 'member found',

    // Directory CTA
    joinISRSCommunity: 'Join the ISRS Community',
    joinCommunityDescription: 'Connect with colleagues, share your research, and stay updated on shellfish restoration initiatives worldwide.',
    loginToProfile: 'Login to Your Profile',

    // Conference Registration
    conferenceRegistration: 'Conference Registration',
    registrationFor: 'Register for the International Shellfish Restoration Society Conference',
    backToConferenceInfo: 'Back to Conference Info',
    yourProfile: 'Your Profile',
    registrationDetails: 'Registration Details',
    sessionsWorkshops: 'Sessions & Workshops',
    reviewPayment: 'Review & Payment',

    // Registration Form - Profile Section
    cvResumeUpload: 'CV/Resume Upload (Optional)',
    orProvideLink: 'Or provide a link:',
    researchAreasCommaSeparated: 'Research Areas (comma-separated)',
    next: 'Next',
    back: 'Back',

    // Registration Form - Details Section
    registrationType: 'Registration Type',
    selectRegistrationType: 'Select registration type...',
    earlyBird: 'Early Bird',
    student: 'Student',
    earlyBirdPricing: 'Early Bird pricing available now! Register before March 1, 2026 to save.',
    discountCode: 'Discount Code (Optional)',
    discountCodeDescription: 'Have a promo code? Enter it here to save on your registration!',
    enterPromoCode: 'Enter promo code (e.g., EARLYBIRD2026)',
    applyCode: 'Apply Code',
    attendanceType: 'Attendance Type',
    inPerson: 'In-Person',
    virtual: 'Virtual',
    firstTimeISRS: 'This is my first ISRS conference',
    planToSubmitAbstract: 'I plan to submit an abstract for presentation',
    dietaryRestrictions: 'Dietary Restrictions',
    none: 'None',
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    glutenFree: 'Gluten-Free',
    other: 'Other (specify below)',
    dietaryNotes: 'Dietary Notes',
    dietaryNotesPlaceholder: 'Please specify any allergies or dietary requirements...',
    accessibilityNeeds: 'Accessibility Needs',
    accessibilityPlaceholder: 'Please let us know if you require any accommodations...',

    // Emergency Contact
    emergencyContactName: 'Emergency Contact Name',
    emergencyContactEmail: 'Emergency Contact Email',
    emergencyContactPhone: 'Emergency Contact Phone',
    relationship: 'Relationship',
    relationshipPlaceholder: 'e.g., Spouse, Parent, Friend',
    emergencyContactAuth: 'I authorize ISRS conference administrators to contact my designated emergency contact in the event of a medical emergency or other urgent situation during the conference.',

    // Special Events
    specialEventsActivities: 'Special Events & Activities',
    selectSpecialEvents: 'Select the special events and activities you\'d like to attend. Some events may have additional fees.',
    welcomeReception: 'Welcome Reception',
    welcomeReceptionDesc: 'Join us for the opening night reception (Included in registration)',
    lowCountryBoil: 'Low Country Boil Dinner',
    lowCountryBoilDesc: 'Traditional seafood feast with colleagues (Included in registration)',
    fieldTrips: 'Field Trips',
    fieldTripsDesc: 'Select all that interest you - limited capacity, additional fees may apply',
    dolphinTours: 'Dolphin Watching Tours - Guided coastal wildlife tour',
    seaTurtleCenter: 'Sea Turtle Center Visit - Educational tour of conservation facility',
    restorationSiteTour: 'Local Restoration Site Tour - Visit active restoration projects',
    golfTournament: 'Golf Tournament',
    golfTournamentDesc: 'Networking golf tournament (Additional fee: $75)',

    // T-Shirt & Guests
    tshirtSize: 'Conference T-Shirt Size (Optional)',
    noTshirt: 'No t-shirt needed',
    bringingGuest: 'Bringing a Guest to Social Events?',
    noGuests: 'No guests',
    guestFee: 'guest',
    guestsFee: 'guests',
    guestsDescription: 'Guests may attend social events and meals (additional fee applies)',

    // Continuing Education
    requestContinuingEducation: 'Request Continuing Education Credits',
    continuingEducationDesc: 'Society for Ecological Restoration (SER) CE credits',
    licenseNumber: 'Professional License Number (if applicable)',
    licensingOrg: 'Licensing Organization',

    // Accommodation
    accommodationPreferences: 'Accommodation Preferences',
    needsAccommodation: 'I need help booking accommodation',
    interestedRoomSharing: 'I\'m interested in sharing a room to reduce costs',
    roommatePreferences: 'Roommate Preferences/Notes',
    roommatePreferencesPlaceholder: 'Any preferences for a roommate? Gender preference, quiet vs social, etc.',

    // Additional Information
    additionalInformation: 'Additional Information',
    willingToVolunteer: 'Willing to volunteer during the conference',
    firstTimeAttendee: 'This is my first ISRS/ICSR conference',
    joinMailingList: 'Join ISRS mailing list',
    receiveFutureUpdates: 'Receive updates about future conferences',

    // Session Selection
    selectSessionsWorkshops: 'Select Your Sessions & Workshops',
    sessionSelectionDescription: 'Choose the workshops and sessions you\'d like to attend. Some sessions have limited capacity and may have a waitlist.',
    sessionSelectionOptional: 'Session selection is optional',
    sessionSelectionSkip: '- you can skip this step if you\'re not interested in specific sessions.',
    loadingSessions: 'Loading available sessions...',
    noSessionsAvailable: 'No sessions are currently available for selection.',
    checkBackLater: 'Check back later or continue with your registration.',
    continueToReview: 'Continue to Review',
    available: 'Available',
    limited: 'limited',
    spotsLeft: 'spots left',
    waitlistOnly: 'Waitlist Only',
    full: 'Full',
    additionalFee: 'Additional fee:',
    selected: 'Selected',
    chair: 'Chair:',

    // Review & Payment
    reviewPaymentTitle: 'Review & Payment',
    registrationSummary: 'Registration Summary',
    name: 'Name',
    notSpecified: 'Not specified',
    attendance: 'Attendance',
    registrationFee: 'Registration Fee',
    total: 'Total',
    paymentMethod: 'Payment Method',
    selectPaymentMethod: 'Select payment method...',
    onlinePayment: 'Online Payment (Credit/Debit Card via Zeffy)',
    bankTransfer: 'Bank Transfer',

    // Zeffy Payment Info
    onlinePaymentViaZeffy: 'Online Payment via Zeffy',
    zeffyDescription: 'ISRS uses Zeffy, a 100% free payment platform for nonprofits.',
    zeffyRedirect: 'When you proceed to payment, you\'ll be redirected to Zeffy\'s secure checkout page.',
    zeffyTipInfo: 'Zeffy may ask if you\'d like to add an optional tip to help keep their platform free for nonprofits like ISRS.',
    zeffyTipOptional: 'This tip is completely optional',
    zeffyTipAmount: 'and goes to Zeffy, not ISRS. You can choose "$0" or any amount you wish.',
    registrationFeeToISRS: 'Your conference registration fee goes 100% to ISRS to support the conference and our mission.',

    // Bank Transfer Info
    bankTransferInstructions: 'Bank Transfer Instructions',
    bankTransferMessage: 'Please transfer the registration fee to the following ISRS bank account:',
    bankName: 'Bank Name:',
    accountName: 'Account Name:',
    accountNumber: 'Account Number:',
    routingNumberACH: 'Routing Number (ACH/Direct Deposit):',
    routingNumberWire: 'Routing Number (Wire Transfer):',
    swiftCode: 'SWIFT Code:',
    swiftCodeNote: '(for international wire transfers)',
    bankTransferImportant: 'Important:',
    includeRegistrationNumber: 'Include your registration number in the transfer reference',
    sendProofOfTransfer: 'Send proof of transfer to',
    confirmationTimeline: 'Your registration will be confirmed once payment is received (typically 3-5 business days)',

    // Legal Agreements
    agreeToTerms: 'I agree to the',
    termsAndConditions: 'Terms and Conditions',
    acknowledgePrivacyPolicy: 'I acknowledge the',
    agreeCodeOfConduct: 'I agree to follow the',
    codeOfConduct: 'Code of Conduct',
    completeRegistration: 'Complete Registration',
    processingRegistration: 'Processing your registration...',

    // Confirmation Page
    registrationCreated: 'Registration Created!',
    thankYouRegistration: 'Thank you for registering for the ISRS International Conference 2026',
    yourRegistrationNumber: 'Your Registration Number:',
    completeYourPayment: 'Complete Your Payment',
    registrationPendingPayment: 'Your registration is currently',
    pendingPayment: 'pending payment',
    completePaymentMessage: 'Please complete your payment to confirm your attendance.',
    amountDue: 'Amount Due:',
    aboutZeffy: 'About Zeffy:',
    zeffyConfirmationNote: 'ISRS uses Zeffy, a 100% free payment platform for nonprofits. Zeffy may ask if you\'d like to add an',
    optionalTip: 'optional tip',
    zeffyTipNote: '- you can choose $0 or any amount. This tip goes to Zeffy, not ISRS.',
    payNowWithZeffy: 'Pay Now with Zeffy',
    emailConfirmationNote: 'You will receive a confirmation email once your payment is processed.',
    transferExactAmount: 'Transfer the exact amount shown above',
    includeRegNumber: 'Include your registration number',
    inTransferReference: 'in the transfer reference',
    emailProofOfTransfer: 'Email proof of transfer to',
    confirmationAfterPayment: 'Your registration will be confirmed once payment is received (typically 3-5 business days)',

    // What's Next
    whatsNext: 'What\'s Next?',
    completePaymentButton: 'Complete your payment using the button above',
    checkEmailConfirmation: 'Check your email for registration confirmation',
    abstractSubmissionOpens: 'Abstract submission opens April 1, 2026',
    submitAbstract: 'Submit your presentation abstract (if applicable)',
    bookTravel: 'Book your travel and accommodation',
    seeYouAt: 'Join us June 15-18, 2026!',

    // Profile Dashboard Access
    yourProfileDashboard: 'Your Profile Dashboard',
    accessDashboardDescription: 'Access your personalized dashboard to view all your registrations, manage your information, and track your conference activity.',
    accessYourProfile: 'Access Your Profile',
    submitYourAbstract: 'Submit Your Abstract',
    secureAccess: 'Secure Access:',
    secureAccessDescription: 'We use magic link authentication - no passwords needed! Check your email',
    magicLinkExpiry: 'for a secure login link that expires in 15 minutes.',
    fromDashboardYouCan: 'From your dashboard you can:',
    viewAllRegistrations: 'View all your conference registrations',
    submitManageAbstracts: 'Submit and manage multiple abstracts',
    updateContactInfo: 'Update your contact information',
    trackPaymentStatus: 'Track your payment status',

    // Social Sharing
    spreadTheWord: 'Spread the Word!',
    spreadTheWordDescription: 'Help us grow the shellfish restoration community! Share this conference with colleagues, friends, and family who care about marine conservation.',
    shareOnTwitter: 'Share on X',
    shareOnLinkedIn: 'Share on LinkedIn',
    shareOnFacebook: 'Share on Facebook',
    inviteByEmail: 'Invite Colleagues by Email',
    inviteByEmailDescription: 'Enter email addresses of colleagues who might be interested in attending:',
    add: 'Add',
    sendInvitations: 'Send Invitations',
    invitationsSent: 'Invitations sent successfully!',

    // Questions & Support
    questionsContact: 'Questions? Contact us at',

    // Error Messages
    invalidRegistrationLink: 'Invalid registration link. Please check your email or contact support.',
    unableToLoadRegistration: 'Unable to load registration details. Please contact support with your registration number.',
    pleaseEnterDiscountCode: 'Please enter a discount code',
    selectRegistrationTypeFirst: 'Please select a registration type first',
    invalidDiscountCode: 'Invalid discount code',
    failedToValidateDiscount: 'Failed to validate discount code. Please try again.',
    fillRequiredFields: 'Please fill in all required fields (marked with *)',
    enterValidEmail: 'Please enter a valid email address',
    selectPaymentMethodError: 'Please select a payment method',
    registrationFailed: 'Registration failed. Please try again.',

    // Success Messages
    registrationCreatedSuccess: 'Registration created successfully! Redirecting to payment...',
    registrationCreatedInstructions: 'Registration created successfully! Redirecting to payment instructions...'
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
    taxId: 'Identificación Fiscal (EIN): 39-2829151',

    // Portal de Miembros - Inicio de Sesión
    memberLogin: 'Inicio de Sesión de Miembro',
    loginSubtitle: 'Ingrese su dirección de correo electrónico y le enviaremos un enlace de inicio de sesión seguro',
    emailAddress: 'Dirección de Correo Electrónico',
    sendMagicLink: 'Enviar Enlace Mágico',
    dontHaveAccount: '¿Aún no tienes una cuenta?',
    pastAttendeeNote: 'Si ha asistido a una conferencia ICSR anterior, ¡ya tiene una cuenta! Simplemente ingrese el correo electrónico que usó para el registro.',
    learnAboutICSR: 'Información sobre ICSR2026',
    checkYourEmail: '¡Revise su Correo Electrónico!',
    magicLinkSent: 'Hemos enviado un enlace de inicio de sesión seguro a',
    magicLinkInstructions: 'Haga clic en el enlace del correo electrónico para acceder a su perfil de miembro. El enlace expirará en 15 minutos.',
    sendAnotherLink: 'Enviar Otro Enlace',

    // Portal de Miembros - Verificación
    verifyingLogin: 'Verificando su Inicio de Sesión',
    verifyingMessage: 'Por favor espere mientras lo conectamos de forma segura...',
    loginFailed: 'Inicio de Sesión Fallido',
    invalidLink: 'Este enlace de inicio de sesión no es válido o ha expirado.',
    troubleshooting: 'Solución de problemas:',
    linkExpires: 'Los enlaces mágicos expiran después de 15 minutos',
    linkOnceOnly: 'Cada enlace solo se puede usar una vez',
    useLatestLink: 'Asegúrese de haber hecho clic en el último enlace enviado a su correo electrónico',
    requestNewLink: 'Solicitar Nuevo Enlace de Inicio de Sesión',
    returnToHome: 'Volver al Inicio',

    // Portal de Miembros - Bienvenida/Configuración de Perfil
    welcomeToISRS: '¡Bienvenido a ISRS!',
    profileCompletion: 'Completar Perfil',
    completeProfileMessage: 'Complete su perfil para conectarse con otros miembros y desbloquear todas las funciones',
    basicInformation: 'Información Básica',
    emailCannotChange: 'El correo electrónico no se puede cambiar',
    country: 'País',
    city: 'Ciudad',
    phone: 'Teléfono',

    // Información Profesional
    professionalInformation: 'Información Profesional',
    organization: 'Organización',
    positionTitle: 'Cargo/Título',
    department: 'Departamento',
    bioAboutMe: 'Biografía / Acerca de Mí',
    bioPlaceholder: 'Cuéntenos sobre su trabajo en restauración de moluscos...',
    researchAreas: 'Áreas de Investigación',
    researchAreasPlaceholder: 'Ej., restauración de arrecifes de ostras, calidad del agua, evaluación de hábitat...',
    separateWithCommas: 'Separe múltiples áreas con comas',

    // Historial de Conferencias
    conferenceHistory: 'Su Historial de Conferencias ICSR',

    // Privacidad y Directorio
    privacyDirectorySettings: 'Configuración de Privacidad y Directorio',
    memberDirectory: 'Directorio de Miembros',
    memberDirectoryDescription: 'El directorio de miembros de ISRS ayuda a conectar investigadores, profesionales y partes interesadas que trabajan en restauración de moluscos en todo el mundo.',
    includeInDirectory: 'Incluirme en el directorio público de miembros',
    chooseVisibleInfo: 'Elija qué información mostrar en el directorio:',
    nameRequired: 'Nombre (obligatorio)',
    position: 'Cargo',
    bio: 'Biografía',
    conferenceHistoryLabel: 'Historial de Conferencias',

    // Privacidad y Términos
    privacyTerms: 'Privacidad y Términos',
    privacyPolicyAgree: 'He leído y acepto la',
    privacyPolicy: 'Política de Privacidad',
    privacyConsentText: 'y consiento que ISRS recopile y procese mis datos personales según lo descrito.',
    termsOfService: 'Términos de Servicio',
    termsAgree: 'Acepto los Términos de Servicio de ISRS y entiendo que este perfil se utilizará con fines de networking y conferencias.',
    yourPrivacyRights: 'Sus Derechos de Privacidad:',
    privacyRightsText: 'Puede solicitar una copia de sus datos, actualizar su información o solicitar la eliminación de su cuenta en cualquier momento desde la configuración de su perfil. Nunca venderemos sus datos a terceros.',

    // Acciones del Formulario
    completeProfileContinue: 'Completar Perfil y Continuar',
    fieldsRequired: 'Los campos marcados con',
    areRequired: 'son obligatorios',
    editProfile: 'Editar Perfil',
    saveChanges: 'Guardar Cambios',
    cancel: 'Cancelar',
    saving: 'Guardando...',

    // Página de Perfil
    myProfile: 'Mi Perfil',
    memberSince: 'Miembro desde',
    viewDirectory: 'Ver Directorio',
    notProvided: 'No proporcionado',
    emailCannotChangeContact: 'El correo electrónico no se puede cambiar. Contacte a soporte si es necesario.',
    expertiseKeywords: 'Palabras Clave de Experiencia',
    separateKeywordsCommas: 'Separe las palabras clave con comas',

    // Presencia en Línea
    onlinePresence: 'Presencia en Línea',
    website: 'Sitio Web',
    linkedinURL: 'URL de LinkedIn',
    orcid: 'ORCID',

    // Visibilidad en el Directorio
    directoryPrivacySettings: 'Configuración de Directorio y Privacidad',
    visibleFieldsDirectory: 'Campos Visibles en el Directorio:',

    // Consejos de Perfil
    profileTip: 'Consejo:',
    profileTipMessage: '¡Complete más campos para aumentar la visibilidad de su perfil y ayudar a otros miembros a encontrarlo!',

    // Estado de Completitud del Perfil
    completeProfile: 'Completar Perfil',
    profileComplete: '¡Su perfil está completo y se ve genial!',
    goodProgress: '¡Buen progreso! Agregue más información para ayudar a los miembros a encontrarlo.',
    completeMoreFields: 'Complete más campos para aumentar la visibilidad de su perfil.',

    // Privacidad de Datos y Cuenta
    dataPrivacyAccount: 'Privacidad de Datos y Cuenta',
    exportYourData: 'Exportar Sus Datos',
    exportDataDescription: 'Descargue una copia de todos sus datos personales',
    requestDataExport: 'Solicitar Exportación de Datos',
    deleteAccount: 'Eliminar Cuenta',
    deleteAccountDescription: 'Eliminar permanentemente su cuenta y datos',
    logout: 'Cerrar Sesión',

    // Confirmaciones de Exportación/Eliminación de Datos
    exportDataConfirm: '¿Solicitar una copia de todos sus datos personales? Recibirá un correo electrónico con un enlace de descarga dentro de 48 horas.',
    exportDataSuccess: '¡Exportación de datos solicitada exitosamente! Recibirá un correo electrónico dentro de 48 horas.',
    deleteAccountConfirm: '¿Está seguro de que desea eliminar su cuenta?',
    deleteAccountWarning: 'Esto:\n• Lo eliminará del directorio de miembros\n• Eliminará todos sus datos personales\n• Cancelará cualquier registro de conferencia\n\nEsta acción no se puede deshacer.',
    deleteAccountReason: 'Opcional: Por favor díganos por qué se va (nos ayuda a mejorar):',
    deleteAccountSuccess: 'Eliminación de cuenta solicitada. Su cuenta será eliminada dentro de 7 días. Recibirá un correo electrónico de confirmación.',

    // Alertas y Mensajes
    profileUpdatedSuccess: '¡Perfil actualizado exitosamente!',
    failedToLoadProfile: 'Error al cargar su perfil. Por favor intente actualizar la página.',
    failedToSaveProfile: 'Error al guardar el perfil:',

    // Página del Directorio de Miembros
    memberDirectoryTitle: 'Directorio de Miembros',
    memberDirectorySubtitle: 'Conéctese con investigadores, profesionales y partes interesadas que trabajan en restauración de moluscos en todo el mundo',
    search: 'Buscar',
    searchPlaceholder: 'Buscar miembros...',
    searchFields: '(nombre, organización, biografía, áreas de investigación)',
    allCountries: 'Todos los Países',
    conferenceYear: 'Año de Conferencia',
    allYears: 'Todos los Años',
    clearFilters: 'Limpiar Filtros',
    loadingMembers: 'Cargando miembros...',
    noMembersFound: 'No se Encontraron Miembros',
    adjustSearchCriteria: 'Intente ajustar sus criterios de búsqueda o filtros',
    membersFound: 'miembros encontrados',
    memberFound: 'miembro encontrado',

    // CTA del Directorio
    joinISRSCommunity: 'Únase a la Comunidad ISRS',
    joinCommunityDescription: 'Conéctese con colegas, comparta su investigación y manténgase actualizado sobre iniciativas de restauración de moluscos en todo el mundo.',
    loginToProfile: 'Iniciar Sesión en su Perfil',

    // Registro de Conferencia
    conferenceRegistration: 'Registro de Conferencia',
    registrationFor: 'Regístrese para la Conferencia de la Sociedad Internacional para la Restauración de Moluscos',
    backToConferenceInfo: 'Volver a Información de Conferencia',
    yourProfile: 'Su Perfil',
    registrationDetails: 'Detalles de Registro',
    sessionsWorkshops: 'Sesiones y Talleres',
    reviewPayment: 'Revisión y Pago',

    // Formulario de Registro - Sección de Perfil
    cvResumeUpload: 'Cargar CV/Currículum (Opcional)',
    orProvideLink: 'O proporcione un enlace:',
    researchAreasCommaSeparated: 'Áreas de Investigación (separadas por comas)',
    next: 'Siguiente',
    back: 'Atrás',

    // Formulario de Registro - Sección de Detalles
    registrationType: 'Tipo de Registro',
    selectRegistrationType: 'Seleccione tipo de registro...',
    earlyBird: 'Tarifa Anticipada',
    student: 'Estudiante',
    earlyBirdPricing: '¡Precio de tarifa anticipada disponible ahora! Regístrese antes del 1 de marzo de 2026 para ahorrar.',
    discountCode: 'Código de Descuento (Opcional)',
    discountCodeDescription: '¿Tiene un código promocional? ¡Ingréselo aquí para ahorrar en su registro!',
    enterPromoCode: 'Ingrese código promocional (ej., EARLYBIRD2026)',
    applyCode: 'Aplicar Código',
    attendanceType: 'Tipo de Asistencia',
    inPerson: 'Presencial',
    virtual: 'Virtual',
    firstTimeISRS: 'Esta es mi primera conferencia ISRS',
    planToSubmitAbstract: 'Planeo enviar un resumen para presentación',
    dietaryRestrictions: 'Restricciones Dietéticas',
    none: 'Ninguna',
    vegetarian: 'Vegetariano',
    vegan: 'Vegano',
    glutenFree: 'Sin Gluten',
    other: 'Otro (especificar abajo)',
    dietaryNotes: 'Notas Dietéticas',
    dietaryNotesPlaceholder: 'Por favor especifique cualquier alergia o requisito dietético...',
    accessibilityNeeds: 'Necesidades de Accesibilidad',
    accessibilityPlaceholder: 'Por favor háganos saber si requiere alguna adaptación...',

    // Contacto de Emergencia
    emergencyContactName: 'Nombre de Contacto de Emergencia',
    emergencyContactEmail: 'Correo Electrónico de Contacto de Emergencia',
    emergencyContactPhone: 'Teléfono de Contacto de Emergencia',
    relationship: 'Relación',
    relationshipPlaceholder: 'ej., Cónyuge, Padre, Amigo',
    emergencyContactAuth: 'Autorizo a los administradores de la conferencia ISRS a contactar a mi contacto de emergencia designado en caso de una emergencia médica u otra situación urgente durante la conferencia.',

    // Eventos Especiales
    specialEventsActivities: 'Eventos Especiales y Actividades',
    selectSpecialEvents: 'Seleccione los eventos especiales y actividades a los que le gustaría asistir. Algunos eventos pueden tener tarifas adicionales.',
    welcomeReception: 'Recepción de Bienvenida',
    welcomeReceptionDesc: 'Únase a nosotros para la recepción de la noche de apertura (Incluida en el registro)',
    lowCountryBoil: 'Cena Low Country Boil',
    lowCountryBoilDesc: 'Festín tradicional de mariscos con colegas (Incluida en el registro)',
    fieldTrips: 'Excursiones',
    fieldTripsDesc: 'Seleccione todas las que le interesen - capacidad limitada, pueden aplicar tarifas adicionales',
    dolphinTours: 'Tours de Observación de Delfines - Tour guiado de vida silvestre costera',
    seaTurtleCenter: 'Visita al Centro de Tortugas Marinas - Tour educativo de instalación de conservación',
    restorationSiteTour: 'Tour de Sitio de Restauración Local - Visite proyectos de restauración activos',
    golfTournament: 'Torneo de Golf',
    golfTournamentDesc: 'Torneo de golf de networking (Tarifa adicional: $75)',

    // Camiseta e Invitados
    tshirtSize: 'Talla de Camiseta de Conferencia (Opcional)',
    noTshirt: 'No necesito camiseta',
    bringingGuest: '¿Trae un Invitado a Eventos Sociales?',
    noGuests: 'Sin invitados',
    guestFee: 'invitado',
    guestsFee: 'invitados',
    guestsDescription: 'Los invitados pueden asistir a eventos sociales y comidas (aplica tarifa adicional)',

    // Educación Continua
    requestContinuingEducation: 'Solicitar Créditos de Educación Continua',
    continuingEducationDesc: 'Créditos de EC de la Sociedad para la Restauración Ecológica (SER)',
    licenseNumber: 'Número de Licencia Profesional (si aplica)',
    licensingOrg: 'Organización de Licencias',

    // Alojamiento
    accommodationPreferences: 'Preferencias de Alojamiento',
    needsAccommodation: 'Necesito ayuda para reservar alojamiento',
    interestedRoomSharing: 'Estoy interesado en compartir habitación para reducir costos',
    roommatePreferences: 'Preferencias/Notas de Compañero de Habitación',
    roommatePreferencesPlaceholder: '¿Alguna preferencia para un compañero de habitación? Preferencia de género, tranquilo vs social, etc.',

    // Información Adicional
    additionalInformation: 'Información Adicional',
    willingToVolunteer: 'Dispuesto a ser voluntario durante la conferencia',
    firstTimeAttendee: 'Esta es mi primera conferencia ISRS/ICSR',
    joinMailingList: 'Unirse a la lista de correo de ISRS',
    receiveFutureUpdates: 'Recibir actualizaciones sobre conferencias futuras',

    // Selección de Sesiones
    selectSessionsWorkshops: 'Seleccione sus Sesiones y Talleres',
    sessionSelectionDescription: 'Elija los talleres y sesiones a los que le gustaría asistir. Algunas sesiones tienen capacidad limitada y pueden tener lista de espera.',
    sessionSelectionOptional: 'La selección de sesiones es opcional',
    sessionSelectionSkip: '- puede omitir este paso si no está interesado en sesiones específicas.',
    loadingSessions: 'Cargando sesiones disponibles...',
    noSessionsAvailable: 'Actualmente no hay sesiones disponibles para selección.',
    checkBackLater: 'Vuelva a consultar más tarde o continúe con su registro.',
    continueToReview: 'Continuar a Revisión',
    available: 'Disponible',
    limited: 'limitado',
    spotsLeft: 'lugares disponibles',
    waitlistOnly: 'Solo Lista de Espera',
    full: 'Lleno',
    additionalFee: 'Tarifa adicional:',
    selected: 'Seleccionado',
    chair: 'Presidente:',

    // Revisión y Pago
    reviewPaymentTitle: 'Revisión y Pago',
    registrationSummary: 'Resumen de Registro',
    name: 'Nombre',
    notSpecified: 'No especificado',
    attendance: 'Asistencia',
    registrationFee: 'Tarifa de Registro',
    total: 'Total',
    paymentMethod: 'Método de Pago',
    selectPaymentMethod: 'Seleccione método de pago...',
    onlinePayment: 'Pago en Línea (Tarjeta de Crédito/Débito vía Zeffy)',
    bankTransfer: 'Transferencia Bancaria',

    // Información de Pago Zeffy
    onlinePaymentViaZeffy: 'Pago en Línea vía Zeffy',
    zeffyDescription: 'ISRS usa Zeffy, una plataforma de pago 100% gratuita para organizaciones sin fines de lucro.',
    zeffyRedirect: 'Cuando proceda al pago, será redirigido a la página de pago segura de Zeffy.',
    zeffyTipInfo: 'Zeffy puede preguntarle si desea agregar una propina opcional para ayudar a mantener su plataforma gratuita para organizaciones sin fines de lucro como ISRS.',
    zeffyTipOptional: 'Esta propina es completamente opcional',
    zeffyTipAmount: 'y va a Zeffy, no a ISRS. Puede elegir "$0" o cualquier cantidad que desee.',
    registrationFeeToISRS: 'Su tarifa de registro de conferencia va 100% a ISRS para apoyar la conferencia y nuestra misión.',

    // Información de Transferencia Bancaria
    bankTransferInstructions: 'Instrucciones de Transferencia Bancaria',
    bankTransferMessage: 'Por favor transfiera la tarifa de registro a la siguiente cuenta bancaria de ISRS:',
    bankName: 'Nombre del Banco:',
    accountName: 'Nombre de la Cuenta:',
    accountNumber: 'Número de Cuenta:',
    routingNumberACH: 'Número de Ruta (ACH/Depósito Directo):',
    routingNumberWire: 'Número de Ruta (Transferencia Bancaria):',
    swiftCode: 'Código SWIFT:',
    swiftCodeNote: '(para transferencias bancarias internacionales)',
    bankTransferImportant: 'Importante:',
    includeRegistrationNumber: 'Incluya su número de registro en la referencia de transferencia',
    sendProofOfTransfer: 'Envíe comprobante de transferencia a',
    confirmationTimeline: 'Su registro será confirmado una vez que se reciba el pago (típicamente 3-5 días hábiles)',

    // Acuerdos Legales
    agreeToTerms: 'Acepto los',
    termsAndConditions: 'Términos y Condiciones',
    acknowledgePrivacyPolicy: 'Reconozco la',
    agreeCodeOfConduct: 'Acepto seguir el',
    codeOfConduct: 'Código de Conducta',
    completeRegistration: 'Completar Registro',
    processingRegistration: 'Procesando su registro...',

    // Página de Confirmación
    registrationCreated: '¡Registro Creado!',
    thankYouRegistration: 'Gracias por registrarse en la Conferencia Internacional ISRS 2026',
    yourRegistrationNumber: 'Su Número de Registro:',
    completeYourPayment: 'Complete su Pago',
    registrationPendingPayment: 'Su registro está actualmente',
    pendingPayment: 'pendiente de pago',
    completePaymentMessage: 'Por favor complete su pago para confirmar su asistencia.',
    amountDue: 'Monto Adeudado:',
    aboutZeffy: 'Acerca de Zeffy:',
    zeffyConfirmationNote: 'ISRS usa Zeffy, una plataforma de pago 100% gratuita para organizaciones sin fines de lucro. Zeffy puede preguntarle si desea agregar una',
    optionalTip: 'propina opcional',
    zeffyTipNote: '- puede elegir $0 o cualquier cantidad. Esta propina va a Zeffy, no a ISRS.',
    payNowWithZeffy: 'Pagar Ahora con Zeffy',
    emailConfirmationNote: 'Recibirá un correo electrónico de confirmación una vez que se procese su pago.',
    transferExactAmount: 'Transfiera el monto exacto mostrado arriba',
    includeRegNumber: 'Incluya su número de registro',
    inTransferReference: 'en la referencia de transferencia',
    emailProofOfTransfer: 'Envíe comprobante de transferencia a',
    confirmationAfterPayment: 'Su registro será confirmado una vez que se reciba el pago (típicamente 3-5 días hábiles)',

    // ¿Qué Sigue?
    whatsNext: '¿Qué Sigue?',
    completePaymentButton: 'Complete su pago usando el botón de arriba',
    checkEmailConfirmation: 'Revise su correo electrónico para la confirmación de registro',
    abstractSubmissionOpens: 'La presentación de resúmenes abre el 1 de abril de 2026',
    submitAbstract: 'Envíe el resumen de su presentación (si aplica)',
    bookTravel: 'Reserve su viaje y alojamiento',
    seeYouAt: '¡Nos vemos del 15 al 18 de junio de 2026!',

    // Acceso al Panel de Perfil
    yourProfileDashboard: 'Su Panel de Perfil',
    accessDashboardDescription: 'Acceda a su panel personalizado para ver todos sus registros, administrar su información y rastrear su actividad de conferencia.',
    accessYourProfile: 'Acceder a su Perfil',
    submitYourAbstract: 'Enviar su Resumen',
    secureAccess: 'Acceso Seguro:',
    secureAccessDescription: 'Usamos autenticación de enlace mágico - ¡no se necesitan contraseñas! Revise su correo electrónico',
    magicLinkExpiry: 'para un enlace de inicio de sesión seguro que expira en 15 minutos.',
    fromDashboardYouCan: 'Desde su panel puede:',
    viewAllRegistrations: 'Ver todos sus registros de conferencia',
    submitManageAbstracts: 'Enviar y administrar múltiples resúmenes',
    updateContactInfo: 'Actualizar su información de contacto',
    trackPaymentStatus: 'Rastrear su estado de pago',

    // Compartir en Redes Sociales
    spreadTheWord: '¡Corra la Voz!',
    spreadTheWordDescription: '¡Ayúdenos a hacer crecer la comunidad de restauración de moluscos! Comparta esta conferencia con colegas, amigos y familiares que se preocupan por la conservación marina.',
    shareOnTwitter: 'Compartir en X',
    shareOnLinkedIn: 'Compartir en LinkedIn',
    shareOnFacebook: 'Compartir en Facebook',
    inviteByEmail: 'Invitar Colegas por Correo Electrónico',
    inviteByEmailDescription: 'Ingrese las direcciones de correo electrónico de colegas que podrían estar interesados en asistir:',
    add: 'Agregar',
    sendInvitations: 'Enviar Invitaciones',
    invitationsSent: '¡Invitaciones enviadas exitosamente!',

    // Preguntas y Soporte
    questionsContact: '¿Preguntas? Contáctenos en',

    // Mensajes de Error
    invalidRegistrationLink: 'Enlace de registro inválido. Por favor revise su correo electrónico o contacte a soporte.',
    unableToLoadRegistration: 'No se pueden cargar los detalles de registro. Por favor contacte a soporte con su número de registro.',
    pleaseEnterDiscountCode: 'Por favor ingrese un código de descuento',
    selectRegistrationTypeFirst: 'Por favor seleccione un tipo de registro primero',
    invalidDiscountCode: 'Código de descuento inválido',
    failedToValidateDiscount: 'Error al validar el código de descuento. Por favor intente nuevamente.',
    fillRequiredFields: 'Por favor complete todos los campos obligatorios (marcados con *)',
    enterValidEmail: 'Por favor ingrese una dirección de correo electrónico válida',
    selectPaymentMethodError: 'Por favor seleccione un método de pago',
    registrationFailed: 'Registro fallido. Por favor intente nuevamente.',

    // Mensajes de Éxito
    registrationCreatedSuccess: '¡Registro creado exitosamente! Redirigiendo al pago...',
    registrationCreatedInstructions: '¡Registro creado exitosamente! Redirigiendo a instrucciones de pago...'
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
    taxId: 'Numéro fiscal (EIN): 39-2829151',

    // Portail des Membres - Connexion
    memberLogin: 'Connexion Membre',
    loginSubtitle: 'Entrez votre adresse e-mail et nous vous enverrons un lien de connexion sécurisé',
    emailAddress: 'Adresse E-mail',
    sendMagicLink: 'Envoyer le Lien Magique',
    dontHaveAccount: 'Vous n\'avez pas encore de compte?',
    pastAttendeeNote: 'Si vous avez assisté à une conférence ICSR précédente, vous avez déjà un compte! Entrez simplement l\'adresse e-mail que vous avez utilisée pour l\'inscription.',
    learnAboutICSR: 'En Savoir Plus sur ICSR2026',
    checkYourEmail: 'Vérifiez Votre E-mail!',
    magicLinkSent: 'Nous avons envoyé un lien de connexion sécurisé à',
    magicLinkInstructions: 'Cliquez sur le lien dans l\'e-mail pour accéder à votre profil de membre. Le lien expirera dans 15 minutes.',
    sendAnotherLink: 'Envoyer un Autre Lien',

    // Portail des Membres - Vérification
    verifyingLogin: 'Vérification de Votre Connexion',
    verifyingMessage: 'Veuillez patienter pendant que nous vous connectons en toute sécurité...',
    loginFailed: 'Échec de Connexion',
    invalidLink: 'Ce lien de connexion est invalide ou a expiré.',
    troubleshooting: 'Dépannage:',
    linkExpires: 'Les liens magiques expirent après 15 minutes',
    linkOnceOnly: 'Chaque lien ne peut être utilisé qu\'une seule fois',
    useLatestLink: 'Assurez-vous d\'avoir cliqué sur le dernier lien envoyé à votre e-mail',
    requestNewLink: 'Demander un Nouveau Lien de Connexion',
    returnToHome: 'Retour à l\'Accueil',

    // Portail des Membres - Bienvenue/Configuration du Profil
    welcomeToISRS: 'Bienvenue à ISRS!',
    profileCompletion: 'Complétion du Profil',
    completeProfileMessage: 'Complétez votre profil pour vous connecter avec d\'autres membres et débloquer toutes les fonctionnalités',
    basicInformation: 'Informations de Base',
    emailCannotChange: 'L\'e-mail ne peut pas être modifié',
    country: 'Pays',
    city: 'Ville',
    phone: 'Téléphone',

    // Informations Professionnelles
    professionalInformation: 'Informations Professionnelles',
    organization: 'Organisation',
    positionTitle: 'Poste/Titre',
    department: 'Département',
    bioAboutMe: 'Biographie / À Propos de Moi',
    bioPlaceholder: 'Parlez-nous de votre travail en restauration des mollusques...',
    researchAreas: 'Domaines de Recherche',
    researchAreasPlaceholder: 'Ex., restauration de récifs d\'huîtres, qualité de l\'eau, évaluation de l\'habitat...',
    separateWithCommas: 'Séparez les domaines multiples par des virgules',

    // Historique des Conférences
    conferenceHistory: 'Votre Historique de Conférences ICSR',

    // Paramètres de Confidentialité et Répertoire
    privacyDirectorySettings: 'Paramètres de Confidentialité et Répertoire',
    memberDirectory: 'Répertoire des Membres',
    memberDirectoryDescription: 'Le répertoire des membres d\'ISRS aide à connecter les chercheurs, les praticiens et les parties prenantes travaillant dans la restauration des mollusques dans le monde entier.',
    includeInDirectory: 'M\'inclure dans le répertoire public des membres',
    chooseVisibleInfo: 'Choisissez les informations à afficher dans le répertoire:',
    nameRequired: 'Nom (obligatoire)',
    position: 'Poste',
    bio: 'Biographie',
    conferenceHistoryLabel: 'Historique des Conférences',

    // Confidentialité et Conditions
    privacyTerms: 'Confidentialité et Conditions',
    privacyPolicyAgree: 'J\'ai lu et j\'accepte la',
    privacyPolicy: 'Politique de Confidentialité',
    privacyConsentText: 'et consens à ce qu\'ISRS collecte et traite mes données personnelles comme décrit.',
    termsOfService: 'Conditions d\'Utilisation',
    termsAgree: 'J\'accepte les Conditions d\'Utilisation d\'ISRS et comprends que ce profil sera utilisé à des fins de réseautage et de conférence.',
    yourPrivacyRights: 'Vos Droits à la Confidentialité:',
    privacyRightsText: 'Vous pouvez demander une copie de vos données, mettre à jour vos informations ou demander la suppression de votre compte à tout moment à partir des paramètres de votre profil. Nous ne vendrons jamais vos données à des tiers.',

    // Actions du Formulaire
    completeProfileContinue: 'Compléter le Profil et Continuer',
    fieldsRequired: 'Les champs marqués d\'un',
    areRequired: 'sont obligatoires',
    editProfile: 'Modifier le Profil',
    saveChanges: 'Enregistrer les Modifications',
    cancel: 'Annuler',
    saving: 'Enregistrement...',

    // Page de Profil
    myProfile: 'Mon Profil',
    memberSince: 'Membre depuis',
    viewDirectory: 'Voir le Répertoire',
    notProvided: 'Non fourni',
    emailCannotChangeContact: 'L\'e-mail ne peut pas être modifié. Contactez le support si nécessaire.',
    expertiseKeywords: 'Mots-clés d\'Expertise',
    separateKeywordsCommas: 'Séparez les mots-clés par des virgules',

    // Présence en Ligne
    onlinePresence: 'Présence en Ligne',
    website: 'Site Web',
    linkedinURL: 'URL LinkedIn',
    orcid: 'ORCID',

    // Visibilité dans le Répertoire
    directoryPrivacySettings: 'Paramètres de Répertoire et Confidentialité',
    visibleFieldsDirectory: 'Champs Visibles dans le Répertoire:',

    // Conseils de Profil
    profileTip: 'Conseil:',
    profileTipMessage: 'Complétez plus de champs pour augmenter la visibilité de votre profil et aider les autres membres à vous trouver!',

    // État de Complétion du Profil
    completeProfile: 'Compléter le Profil',
    profileComplete: 'Votre profil est complet et superbe!',
    goodProgress: 'Bon progrès! Ajoutez plus d\'informations pour aider les membres à vous trouver.',
    completeMoreFields: 'Complétez plus de champs pour augmenter la visibilité de votre profil.',

    // Confidentialité des Données et Compte
    dataPrivacyAccount: 'Confidentialité des Données et Compte',
    exportYourData: 'Exporter Vos Données',
    exportDataDescription: 'Téléchargez une copie de toutes vos données personnelles',
    requestDataExport: 'Demander l\'Exportation des Données',
    deleteAccount: 'Supprimer le Compte',
    deleteAccountDescription: 'Supprimer définitivement votre compte et vos données',
    logout: 'Déconnexion',

    // Confirmations d\'Exportation/Suppression de Données
    exportDataConfirm: 'Demander une copie de toutes vos données personnelles? Vous recevrez un e-mail avec un lien de téléchargement dans les 48 heures.',
    exportDataSuccess: 'Exportation de données demandée avec succès! Vous recevrez un e-mail dans les 48 heures.',
    deleteAccountConfirm: 'Êtes-vous sûr de vouloir supprimer votre compte?',
    deleteAccountWarning: 'Cela va:\n• Vous retirer du répertoire des membres\n• Supprimer toutes vos données personnelles\n• Annuler toutes les inscriptions à des conférences\n\nCette action ne peut pas être annulée.',
    deleteAccountReason: 'Optionnel: Veuillez nous dire pourquoi vous partez (nous aide à améliorer):',
    deleteAccountSuccess: 'Suppression de compte demandée. Votre compte sera supprimé dans les 7 jours. Vous recevrez un e-mail de confirmation.',

    // Alertes et Messages
    profileUpdatedSuccess: 'Profil mis à jour avec succès!',
    failedToLoadProfile: 'Échec du chargement de votre profil. Veuillez essayer d\'actualiser la page.',
    failedToSaveProfile: 'Échec de l\'enregistrement du profil:',

    // Page du Répertoire des Membres
    memberDirectoryTitle: 'Répertoire des Membres',
    memberDirectorySubtitle: 'Connectez-vous avec des chercheurs, des praticiens et des parties prenantes travaillant dans la restauration des mollusques dans le monde entier',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher des membres...',
    searchFields: '(nom, organisation, biographie, domaines de recherche)',
    allCountries: 'Tous les Pays',
    conferenceYear: 'Année de Conférence',
    allYears: 'Toutes les Années',
    clearFilters: 'Effacer les Filtres',
    loadingMembers: 'Chargement des membres...',
    noMembersFound: 'Aucun Membre Trouvé',
    adjustSearchCriteria: 'Essayez d\'ajuster vos critères de recherche ou filtres',
    membersFound: 'membres trouvés',
    memberFound: 'membre trouvé',

    // CTA du Répertoire
    joinISRSCommunity: 'Rejoignez la Communauté ISRS',
    joinCommunityDescription: 'Connectez-vous avec des collègues, partagez vos recherches et restez informé des initiatives de restauration des mollusques dans le monde entier.',
    loginToProfile: 'Connexion à Votre Profil',

    // Inscription à la Conférence
    conferenceRegistration: 'Inscription à la Conférence',
    registrationFor: 'Inscrivez-vous à la Conférence de la Société Internationale pour la Restauration des Mollusques',
    backToConferenceInfo: 'Retour aux Informations sur la Conférence',
    yourProfile: 'Votre Profil',
    registrationDetails: 'Détails de l\'Inscription',
    sessionsWorkshops: 'Sessions et Ateliers',
    reviewPayment: 'Révision et Paiement',

    // Formulaire d\'Inscription - Section Profil
    cvResumeUpload: 'Téléchargement CV/Curriculum Vitae (Optionnel)',
    orProvideLink: 'Ou fournissez un lien:',
    researchAreasCommaSeparated: 'Domaines de Recherche (séparés par des virgules)',
    next: 'Suivant',
    back: 'Retour',

    // Formulaire d\'Inscription - Section Détails
    registrationType: 'Type d\'Inscription',
    selectRegistrationType: 'Sélectionnez le type d\'inscription...',
    earlyBird: 'Tarif Préférentiel',
    student: 'Étudiant',
    earlyBirdPricing: 'Tarif préférentiel disponible maintenant! Inscrivez-vous avant le 1er mars 2026 pour économiser.',
    discountCode: 'Code de Réduction (Optionnel)',
    discountCodeDescription: 'Vous avez un code promo? Entrez-le ici pour économiser sur votre inscription!',
    enterPromoCode: 'Entrez le code promo (ex., EARLYBIRD2026)',
    applyCode: 'Appliquer le Code',
    attendanceType: 'Type de Participation',
    inPerson: 'En Personne',
    virtual: 'Virtuel',
    firstTimeISRS: 'C\'est ma première conférence ISRS',
    planToSubmitAbstract: 'Je prévois de soumettre un résumé de présentation',
    dietaryRestrictions: 'Restrictions Alimentaires',
    none: 'Aucune',
    vegetarian: 'Végétarien',
    vegan: 'Végétalien',
    glutenFree: 'Sans Gluten',
    other: 'Autre (spécifier ci-dessous)',
    dietaryNotes: 'Notes Alimentaires',
    dietaryNotesPlaceholder: 'Veuillez spécifier toute allergie ou exigence alimentaire...',
    accessibilityNeeds: 'Besoins d\'Accessibilité',
    accessibilityPlaceholder: 'Veuillez nous faire savoir si vous avez besoin d\'aménagements...',

    // Contact d\'Urgence
    emergencyContactName: 'Nom du Contact d\'Urgence',
    emergencyContactEmail: 'E-mail du Contact d\'Urgence',
    emergencyContactPhone: 'Téléphone du Contact d\'Urgence',
    relationship: 'Relation',
    relationshipPlaceholder: 'ex., Conjoint, Parent, Ami',
    emergencyContactAuth: 'J\'autorise les administrateurs de la conférence ISRS à contacter mon contact d\'urgence désigné en cas d\'urgence médicale ou d\'autre situation urgente pendant la conférence.',

    // Événements Spéciaux
    specialEventsActivities: 'Événements Spéciaux et Activités',
    selectSpecialEvents: 'Sélectionnez les événements spéciaux et les activités auxquels vous souhaitez assister. Certains événements peuvent avoir des frais supplémentaires.',
    welcomeReception: 'Réception de Bienvenue',
    welcomeReceptionDesc: 'Rejoignez-nous pour la réception d\'ouverture (Inclus dans l\'inscription)',
    lowCountryBoil: 'Dîner Low Country Boil',
    lowCountryBoilDesc: 'Festin traditionnel de fruits de mer avec des collègues (Inclus dans l\'inscription)',
    fieldTrips: 'Excursions',
    fieldTripsDesc: 'Sélectionnez toutes celles qui vous intéressent - capacité limitée, des frais supplémentaires peuvent s\'appliquer',
    dolphinTours: 'Tours d\'Observation des Dauphins - Visite guidée de la faune côtière',
    seaTurtleCenter: 'Visite du Centre des Tortues Marines - Visite éducative de l\'installation de conservation',
    restorationSiteTour: 'Visite du Site de Restauration Local - Visitez des projets de restauration actifs',
    golfTournament: 'Tournoi de Golf',
    golfTournamentDesc: 'Tournoi de golf de réseautage (Frais supplémentaires: 75$)',

    // T-shirt et Invités
    tshirtSize: 'Taille du T-shirt de Conférence (Optionnel)',
    noTshirt: 'Pas besoin de t-shirt',
    bringingGuest: 'Amenez-vous un Invité aux Événements Sociaux?',
    noGuests: 'Pas d\'invités',
    guestFee: 'invité',
    guestsFee: 'invités',
    guestsDescription: 'Les invités peuvent assister aux événements sociaux et aux repas (frais supplémentaires s\'appliquent)',

    // Formation Continue
    requestContinuingEducation: 'Demander des Crédits de Formation Continue',
    continuingEducationDesc: 'Crédits de FC de la Society for Ecological Restoration (SER)',
    licenseNumber: 'Numéro de Licence Professionnelle (si applicable)',
    licensingOrg: 'Organisation de Licence',

    // Hébergement
    accommodationPreferences: 'Préférences d\'Hébergement',
    needsAccommodation: 'J\'ai besoin d\'aide pour réserver un hébergement',
    interestedRoomSharing: 'Je suis intéressé à partager une chambre pour réduire les coûts',
    roommatePreferences: 'Préférences/Notes de Colocataire',
    roommatePreferencesPlaceholder: 'Des préférences pour un colocataire? Préférence de genre, calme vs social, etc.',

    // Informations Supplémentaires
    additionalInformation: 'Informations Supplémentaires',
    willingToVolunteer: 'Disposé à faire du bénévolat pendant la conférence',
    firstTimeAttendee: 'C\'est ma première conférence ISRS/ICSR',
    joinMailingList: 'Rejoindre la liste de diffusion ISRS',
    receiveFutureUpdates: 'Recevoir des mises à jour sur les futures conférences',

    // Sélection de Sessions
    selectSessionsWorkshops: 'Sélectionnez Vos Sessions et Ateliers',
    sessionSelectionDescription: 'Choisissez les ateliers et les sessions auxquels vous souhaitez assister. Certaines sessions ont une capacité limitée et peuvent avoir une liste d\'attente.',
    sessionSelectionOptional: 'La sélection de sessions est optionnelle',
    sessionSelectionSkip: '- vous pouvez sauter cette étape si vous n\'êtes pas intéressé par des sessions spécifiques.',
    loadingSessions: 'Chargement des sessions disponibles...',
    noSessionsAvailable: 'Aucune session n\'est actuellement disponible pour la sélection.',
    checkBackLater: 'Revenez plus tard ou continuez votre inscription.',
    continueToReview: 'Continuer vers la Révision',
    available: 'Disponible',
    limited: 'limité',
    spotsLeft: 'places restantes',
    waitlistOnly: 'Liste d\'Attente Seulement',
    full: 'Complet',
    additionalFee: 'Frais supplémentaires:',
    selected: 'Sélectionné',
    chair: 'Président:',

    // Révision et Paiement
    reviewPaymentTitle: 'Révision et Paiement',
    registrationSummary: 'Résumé de l\'Inscription',
    name: 'Nom',
    notSpecified: 'Non spécifié',
    attendance: 'Participation',
    registrationFee: 'Frais d\'Inscription',
    total: 'Total',
    paymentMethod: 'Méthode de Paiement',
    selectPaymentMethod: 'Sélectionnez la méthode de paiement...',
    onlinePayment: 'Paiement en Ligne (Carte de Crédit/Débit via Zeffy)',
    bankTransfer: 'Virement Bancaire',

    // Informations de Paiement Zeffy
    onlinePaymentViaZeffy: 'Paiement en Ligne via Zeffy',
    zeffyDescription: 'ISRS utilise Zeffy, une plateforme de paiement 100% gratuite pour les organisations à but non lucratif.',
    zeffyRedirect: 'Lorsque vous procéderez au paiement, vous serez redirigé vers la page de paiement sécurisée de Zeffy.',
    zeffyTipInfo: 'Zeffy peut vous demander si vous souhaitez ajouter un pourboire optionnel pour aider à maintenir leur plateforme gratuite pour les organisations à but non lucratif comme ISRS.',
    zeffyTipOptional: 'Ce pourboire est entièrement optionnel',
    zeffyTipAmount: 'et va à Zeffy, pas à ISRS. Vous pouvez choisir "0$" ou n\'importe quel montant que vous souhaitez.',
    registrationFeeToISRS: 'Vos frais d\'inscription à la conférence vont 100% à ISRS pour soutenir la conférence et notre mission.',

    // Informations de Virement Bancaire
    bankTransferInstructions: 'Instructions de Virement Bancaire',
    bankTransferMessage: 'Veuillez transférer les frais d\'inscription sur le compte bancaire ISRS suivant:',
    bankName: 'Nom de la Banque:',
    accountName: 'Nom du Compte:',
    accountNumber: 'Numéro de Compte:',
    routingNumberACH: 'Numéro de Routage (ACH/Dépôt Direct):',
    routingNumberWire: 'Numéro de Routage (Virement Bancaire):',
    swiftCode: 'Code SWIFT:',
    swiftCodeNote: '(pour les virements bancaires internationaux)',
    bankTransferImportant: 'Important:',
    includeRegistrationNumber: 'Incluez votre numéro d\'inscription dans la référence du virement',
    sendProofOfTransfer: 'Envoyez la preuve du virement à',
    confirmationTimeline: 'Votre inscription sera confirmée une fois le paiement reçu (généralement 3-5 jours ouvrables)',

    // Accords Légaux
    agreeToTerms: 'J\'accepte les',
    termsAndConditions: 'Termes et Conditions',
    acknowledgePrivacyPolicy: 'Je reconnais la',
    agreeCodeOfConduct: 'J\'accepte de suivre le',
    codeOfConduct: 'Code de Conduite',
    completeRegistration: 'Compléter l\'Inscription',
    processingRegistration: 'Traitement de votre inscription...',

    // Page de Confirmation
    registrationCreated: 'Inscription Créée!',
    thankYouRegistration: 'Merci de vous être inscrit à la Conférence Internationale ISRS 2026',
    yourRegistrationNumber: 'Votre Numéro d\'Inscription:',
    completeYourPayment: 'Complétez Votre Paiement',
    registrationPendingPayment: 'Votre inscription est actuellement',
    pendingPayment: 'en attente de paiement',
    completePaymentMessage: 'Veuillez compléter votre paiement pour confirmer votre participation.',
    amountDue: 'Montant Dû:',
    aboutZeffy: 'À Propos de Zeffy:',
    zeffyConfirmationNote: 'ISRS utilise Zeffy, une plateforme de paiement 100% gratuite pour les organisations à but non lucratif. Zeffy peut vous demander si vous souhaitez ajouter un',
    optionalTip: 'pourboire optionnel',
    zeffyTipNote: '- vous pouvez choisir 0$ ou n\'importe quel montant. Ce pourboire va à Zeffy, pas à ISRS.',
    payNowWithZeffy: 'Payer Maintenant avec Zeffy',
    emailConfirmationNote: 'Vous recevrez un e-mail de confirmation une fois votre paiement traité.',
    transferExactAmount: 'Transférez le montant exact indiqué ci-dessus',
    includeRegNumber: 'Incluez votre numéro d\'inscription',
    inTransferReference: 'dans la référence du virement',
    emailProofOfTransfer: 'Envoyez la preuve du virement à',
    confirmationAfterPayment: 'Votre inscription sera confirmée une fois le paiement reçu (généralement 3-5 jours ouvrables)',

    // Et Ensuite?
    whatsNext: 'Et Ensuite?',
    completePaymentButton: 'Complétez votre paiement en utilisant le bouton ci-dessus',
    checkEmailConfirmation: 'Vérifiez votre e-mail pour la confirmation d\'inscription',
    abstractSubmissionOpens: 'La soumission de résumés ouvre le 1er avril 2026',
    submitAbstract: 'Soumettez le résumé de votre présentation (si applicable)',
    bookTravel: 'Réservez votre voyage et hébergement',
    seeYouAt: 'Rejoignez-nous du 15 au 18 juin 2026!',

    // Accès au Tableau de Bord du Profil
    yourProfileDashboard: 'Votre Tableau de Bord du Profil',
    accessDashboardDescription: 'Accédez à votre tableau de bord personnalisé pour voir toutes vos inscriptions, gérer vos informations et suivre votre activité de conférence.',
    accessYourProfile: 'Accéder à Votre Profil',
    submitYourAbstract: 'Soumettre Votre Résumé',
    secureAccess: 'Accès Sécurisé:',
    secureAccessDescription: 'Nous utilisons l\'authentification par lien magique - pas besoin de mots de passe! Vérifiez votre e-mail',
    magicLinkExpiry: 'pour un lien de connexion sécurisé qui expire dans 15 minutes.',
    fromDashboardYouCan: 'Depuis votre tableau de bord, vous pouvez:',
    viewAllRegistrations: 'Voir toutes vos inscriptions à des conférences',
    submitManageAbstracts: 'Soumettre et gérer plusieurs résumés',
    updateContactInfo: 'Mettre à jour vos informations de contact',
    trackPaymentStatus: 'Suivre votre statut de paiement',

    // Partage Social
    spreadTheWord: 'Faites Passer le Mot!',
    spreadTheWordDescription: 'Aidez-nous à développer la communauté de restauration des mollusques! Partagez cette conférence avec des collègues, des amis et de la famille qui se soucient de la conservation marine.',
    shareOnTwitter: 'Partager sur X',
    shareOnLinkedIn: 'Partager sur LinkedIn',
    shareOnFacebook: 'Partager sur Facebook',
    inviteByEmail: 'Inviter des Collègues par E-mail',
    inviteByEmailDescription: 'Entrez les adresses e-mail des collègues qui pourraient être intéressés à assister:',
    add: 'Ajouter',
    sendInvitations: 'Envoyer les Invitations',
    invitationsSent: 'Invitations envoyées avec succès!',

    // Questions et Support
    questionsContact: 'Des questions? Contactez-nous à',

    // Messages d\'Erreur
    invalidRegistrationLink: 'Lien d\'inscription invalide. Veuillez vérifier votre e-mail ou contacter le support.',
    unableToLoadRegistration: 'Impossible de charger les détails de l\'inscription. Veuillez contacter le support avec votre numéro d\'inscription.',
    pleaseEnterDiscountCode: 'Veuillez entrer un code de réduction',
    selectRegistrationTypeFirst: 'Veuillez d\'abord sélectionner un type d\'inscription',
    invalidDiscountCode: 'Code de réduction invalide',
    failedToValidateDiscount: 'Échec de la validation du code de réduction. Veuillez réessayer.',
    fillRequiredFields: 'Veuillez remplir tous les champs obligatoires (marqués d\'un *)',
    enterValidEmail: 'Veuillez entrer une adresse e-mail valide',
    selectPaymentMethodError: 'Veuillez sélectionner une méthode de paiement',
    registrationFailed: 'Échec de l\'inscription. Veuillez réessayer.',

    // Messages de Succès
    registrationCreatedSuccess: 'Inscription créée avec succès! Redirection vers le paiement...',
    registrationCreatedInstructions: 'Inscription créée avec succès! Redirection vers les instructions de paiement...'
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
        <img id="header-logo" src="/images/logo-wide-blue.png" alt="ISRS Logo" width="1640" height="640" fetchpriority="high" />
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
      <div class="header-controls">
        <div class="control-divider"></div>
        <button id="text-size-toggle" class="control-btn" onclick="cycleTextSize()" aria-label="Change text size" title="Change text size">
          <span aria-hidden="true">A</span>
        </button>
        <button id="theme-toggle" class="control-btn" onclick="toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode">
          <span class="theme-icon" aria-hidden="true">🌙</span>
        </button>
        <div class="control-divider"></div>
        <div class="language-switcher" role="group" aria-label="Language selection">
          <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" onclick="changeLanguage('en')" aria-label="English" ${currentLang === 'en' ? 'aria-current="true"' : ''}>EN</button>
          <button class="lang-btn ${currentLang === 'es' ? 'active' : ''}" data-lang="es" onclick="changeLanguage('es')" aria-label="Español" ${currentLang === 'es' ? 'aria-current="true"' : ''}>ES</button>
          <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr" onclick="changeLanguage('fr')" aria-label="Français" ${currentLang === 'fr' ? 'aria-current="true"' : ''}>FR</button>
        </div>
        <div class="control-divider"></div>
        <a href="/login.html" class="control-btn user-profile-btn" id="user-profile-btn" aria-label="Login / Member Portal" title="Login / Member Portal">
          <span aria-hidden="true">🦪</span>
        </a>
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
        <div class="stay-connected-wrapper">
          <div class="stay-connected-content">
            <h2 id="stay-connected-heading">${t('stayConnected')}</h2>
            <p class="stay-connected-text">
              ${t('stayConnectedText')}<br>
              ${t('stayConnectedText2')}
            </p>
          </div>
          <form class="contact-form" id="contactForm" onsubmit="handleContactSubmit(event)">
            <div class="form-row form-row-3">
              <div class="form-group">
                <label for="firstName">${t('firstName')} <span class="required" aria-label="required">${t('required')}</span></label>
                <input type="text" id="firstName" name="firstName" required aria-required="true" />
              </div>
              <div class="form-group">
                <label for="lastName">${t('lastName')} <span class="required" aria-label="required">${t('required')}</span></label>
                <input type="text" id="lastName" name="lastName" required aria-required="true" />
              </div>
              <div class="form-group">
                <label for="email">${t('email')} <span class="required" aria-label="required">${t('required')}</span></label>
                <input type="email" id="email" name="email" required aria-required="true" />
              </div>
            </div>
            <div class="form-group">
              <label for="message">${t('message')}</label>
              <textarea id="message" name="message" rows="3" aria-describedby="message-hint"></textarea>
              <span id="message-hint" class="sr-only">Optional message field</span>
            </div>
            <button type="submit" class="btn btn-primary">${t('send')}</button>
          </form>
        </div>
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
            <li><a href="/admin/" target="_blank" rel="noopener noreferrer">${t('adminPortal')}</a></li>
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

// Update user profile button based on login status
function updateUserProfileButton() {
  const profileBtn = document.getElementById('user-profile-btn');
  if (!profileBtn) return;

  try {
    const userData = localStorage.getItem('isrs_user_data');
    const authToken = localStorage.getItem('isrs_auth_token');

    if (userData && authToken) {
      const user = JSON.parse(userData);

      // User is logged in - route to appropriate portal
      if (user.role === 'admin' || user.role === 'superadmin' || user.role === 'board') {
        // Admin, superadmin, and board members go to admin portal
        profileBtn.href = '/admin/';
        profileBtn.setAttribute('target', '_blank');
        profileBtn.setAttribute('rel', 'noopener noreferrer');
        profileBtn.setAttribute('aria-label', 'Admin Portal (opens in new window)');
        profileBtn.setAttribute('title', 'Admin Portal (opens in new window)');
      } else {
        // Advisory and other members go to member portal
        profileBtn.href = '/member/profile.html';
        profileBtn.setAttribute('aria-label', 'My Profile');
        profileBtn.setAttribute('title', 'My Profile');
      }
    } else {
      // User is not logged in - go to login page
      profileBtn.href = '/login.html';
      profileBtn.setAttribute('aria-label', 'Login');
      profileBtn.setAttribute('title', 'Login');
    }
  } catch (error) {
    console.error('Error updating profile button:', error);
    // Default to login page on error
    profileBtn.href = '/login.html';
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

  // Update user profile button based on login status
  updateUserProfileButton();

  // Translate page content
  translatePage();

  // Initialize feedback widget
  if (typeof initFeedbackWidget !== 'undefined') {
    initFeedbackWidget({ isAdminPortal: false });
  }

  // Make functions globally available
  window.changeLanguage = changeLanguage;
  window.toggleMobileMenu = toggleMobileMenu;
  window.handleContactSubmit = handleContactSubmit;
});
