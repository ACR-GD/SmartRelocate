import { UserProfile } from "./eligibilityScoring";

export interface Translation {
  // Common UI
  loading: string;
  error: string;
  submit: string;
  cancel: string;
  continue: string;
  back: string;
  next: string;
  
  // Navigation
  home: string;
  about: string;
  contact: string;
  pricing: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  learnMore: string;
  moveToMalaysia: string;
  withConfidence: string;
  personalizedGuidance: string;
  startYourJourney: string;
  downloadFreeGuide: string;
  online: string;
  welcomeMessage: string;
  userExampleMessage: string;
  aiResponseMessage: string;
  aiIsTyping: string;
  
  // How It Works
  howItWorksTitle: string;
  howItWorksDescription: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  step4Title: string;
  step4Description: string;
  
  // Visa Types
  visaTypesTitle: string;
  visaTypesDescription: string;
  deRantauTitle: string;
  deRantauDescription: string;
  deRantauFeature1: string;
  deRantauFeature2: string;
  deRantauFeature3: string;
  mm2hTitle: string;
  mm2hDescription: string;
  mm2hFeature1: string;
  mm2hFeature2: string;
  mm2hFeature3: string;
  employmentPassTitle: string;
  employmentPassDescription: string;
  employmentPassFeature1: string;
  employmentPassFeature2: string;
  employmentPassFeature3: string;
  
  // Chat and Forms
  chatTitle: string;
  chatDescription: string;
  chatPlaceholder: string;
  sendMessage: string;
  tellUsAboutYourself: string;
  profession: string;
  familyStatus: string;
  experience: string;
  education: string;
  annualIncome: string;
  relocationTimeline: string;
  askAnything: string;
  startChat: string;
  
  // Start Your Journey Section
  countryOfOriginTitle: string;
  countryOfOriginDesc: string;
  professionalBackgroundTitle: string;
  professionalBackgroundDesc: string;
  familySituationTitle: string;
  familySituationDesc: string;
  incomeRequirementsTitle: string;
  incomeRequirementsDesc: string;
  
  // Options
  selectProfession: string;
  selectFamilyStatus: string;
  softwareDeveloper: string;
  dataScientist: string;
  productManager: string;
  designer: string;
  other: string;
  single: string;
  married: string;
  marriedWithChildren: string;
  
  // Results
  eligibilityScore: string;
  recommendedVisa: string;
  excellent: string;
  good: string;
  fair: string;
  poor: string;
  
  // Pricing Plans
  perMonth: string;
  freePlan: string;
  starterPlan: string;
  professionalPlan: string;
  premiumPlan: string;
  perfectForExploringOptions: string;
  oneTime: string;
  professionalPlanDescription: string;
  fullService: string;
  currentPlan: string;
  getPdfGuide: string;
  selectPlan: string;
  recommended: string;
  chooseYourRelocationPlan: string;
  fromBasicGuidanceToFullService: string;
  
  // Pricing Features
  basicVisaEligibility: string;
  aiChatGuidance: string;
  countryComparisonTool: string;
  basicCostEstimates: string;
  communityForumAccess: string;
  unlimitedAiAssessments: string;
  pdfExportChecklist: string;
  detailedVisaRequirements: string;
  priorityAiChatResponses: string;
  emailSupport: string;
  unlimitedAiAssessmentsLabel: string;
  relocationBudgetCalculator: string;
  savedRelocationProfiles: string;
  visaStatusAlerts: string;
  taxPlanningGuidance: string;
  oneOnOneConsultation: string;
  documentPreparationService: string;
  visaApplicationAssistance: string;
  bankAccountSetupGuidance: string;
  housingJobSearchSupport: string;
  dedicatedRelocationManager: string;
  allPlansIncludeCore: string;
  thirtyDayMoneyBack: string;
  securePaymentProcessing: string;
  cancelAnytime: string;
  compareAllFeatures: string;
  
  // General Pricing
  pricingTitle: string;
  pricingDescription: string;
  freeConsultation: string;
  fullAssessment: string;
  premiumSupport: string;
  expertConsultation: string;
  bookConsultation: string;
  
  // Free Guide
  freeGuideAvailable: string;
  freeGuideDescription: string;
  basicRelocationInfo: string;
  
  // Email Capture
  emailTitle: string;
  emailDescription: string;
  emailPlaceholder: string;
  subscribeNow: string;
  enterEmailAddress: string;
  getActionPlan: string;
  getNotified: string;
  emailSuccess: string;
  emailError: string;
  invalidEmail: string;
  
  // Footer
  footerDescription: string;
  quickLinks: string;
  contactInfo: string;
  followUs: string;
  smartRelocateDescription: string;
  support: string;
  helpCenter: string;
  privacyPolicy: string;
  termsOfService: string;
  resources: string;
  costCalculator: string;
  allRightsReserved: string;
  
  // Additional Pricing Table properties
  compareAllPlans: string;
  detailedFeatureComparison: string;
  free: string;
  forever: string;
  enterprisePlan: string;
  threePerMonth: string;
  tenPerMonth: string;
  twoSessions: string;
  
  // City Comparison
  compareMalaysianCities: string;
  startComparingCities: string;
  cityComparisonDescription: string;
  costAnalysis: string;
  costAnalysisDescription: string;
  lifestyleMetrics: string;
  lifestyleMetricsDescription: string;
  practicalInfo: string;
  practicalInfoDescription: string;
  transportOptions: string;
  
  // PDF Guide
  malaysiaRelocationGuide: string;
  completePdfChecklist: string;
  completeVisaComparisonChart: string;
  costBreakdownByVisaType: string;
  stepByStepApplicationProcess: string;
  livingCostsByCity: string;
  whatsIncluded: string;
  comprehensiveRelocationInfo: string;
  detailedBreakdownVisa: string;
}

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export const isRTL = (language: string): boolean => {
  return language === 'ar';
};

export const translations: Record<string, Translation> = {
  en: {
    // Common UI
    loading: "Loading...",
    error: "Error",
    submit: "Submit",
    cancel: "Cancel",
    continue: "Continue",
    back: "Back",
    next: "Next",
    
    // Navigation
    home: "Home",
    about: "About",
    contact: "Contact",
    pricing: "Pricing",
    
    // Hero Section
    heroTitle: "Your AI-Powered Relocation Assistant",
    heroSubtitle: "Simplify Your Move to Malaysia",
    heroDescription: "Get personalized visa recommendations, cost estimates, and expert guidance for your relocation journey.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    moveToMalaysia: "Move to Malaysia",
    withConfidence: "with Confidence",
    personalizedGuidance: "Get personalized guidance for your relocation journey",
    startYourJourney: "Start Your Journey",
    downloadFreeGuide: "Download Free Guide",
    online: "Online",
    welcomeMessage: "Welcome! I'm here to help with your Malaysia relocation questions.",
    userExampleMessage: "I'm a software developer from the US looking to move to KL. What visa should I apply for?",
    aiResponseMessage: "Based on your profile as a software developer, I'd recommend the Employment Pass if you have a job offer, or the DE Rantau visa for remote work. Let me know more about your situation!",
    aiIsTyping: "AI is typing...",
    
    // How It Works
    howItWorksTitle: "How It Works",
    howItWorksDescription: "Our AI-powered platform guides you through every step of your relocation process.",
    step1Title: "Assessment",
    step1Description: "Tell us about your background, profession, and relocation goals.",
    step2Title: "Analysis",
    step2Description: "Our AI analyzes your profile and calculates your eligibility scores.",
    step3Title: "Recommendations",
    step3Description: "Receive personalized visa recommendations and cost estimates.",
    step4Title: "Guidance",
    step4Description: "Get expert support and step-by-step guidance for your move.",
    
    // Visa Types
    visaTypesTitle: "Visa Options for Malaysia",
    visaTypesDescription: "Explore the different visa types available for your relocation to Malaysia.",
    deRantauTitle: "DE Rantau Visa",
    deRantauDescription: "Perfect for digital nomads and remote workers",
    deRantauFeature1: "Up to 12 months stay",
    deRantauFeature2: "Remote work allowed",
    deRantauFeature3: "Fast processing time",
    mm2hTitle: "MM2H Program",
    mm2hDescription: "Long-term residency for retirees and investors",
    mm2hFeature1: "10-year renewable visa",
    mm2hFeature2: "Investment requirements",
    mm2hFeature3: "Family inclusion possible",
    employmentPassTitle: "Employment Pass",
    employmentPassDescription: "Work visa for skilled professionals with job offers",
    employmentPassFeature1: "Up to 5 years validity",
    employmentPassFeature2: "Renewable with job",
    employmentPassFeature3: "Family dependent visas",
    
    // Chat and Forms
    chatTitle: "Ask Our AI Assistant",
    chatDescription: "Get instant answers about visas, costs, and relocation process.",
    chatPlaceholder: "Ask about visa requirements, costs, or anything else...",
    sendMessage: "Send",
    tellUsAboutYourself: "Tell us about yourself",
    profession: "Profession",
    familyStatus: "Family Status",
    experience: "Experience Level",
    education: "Education Level",
    annualIncome: "Annual Income (USD)",
    relocationTimeline: "Relocation Timeline",
    askAnything: "Ask anything about moving to Malaysia",
    startChat: "Start Your Journey",
    
    // Start Your Journey Section
    countryOfOriginTitle: "Country of Origin",
    countryOfOriginDesc: "Different visa requirements based on your nationality",
    professionalBackgroundTitle: "Professional Background",
    professionalBackgroundDesc: "Visa eligibility varies by profession and experience",
    familySituationTitle: "Family Situation",
    familySituationDesc: "Different options for individuals vs. families",
    incomeRequirementsTitle: "Income Requirements",
    incomeRequirementsDesc: "Minimum income thresholds for different visa types",
    
    // Options
    selectProfession: "Select your profession",
    selectFamilyStatus: "Select family status",
    softwareDeveloper: "Software Developer",
    dataScientist: "Data Scientist",
    productManager: "Product Manager",
    designer: "Designer",
    other: "Other",
    single: "Single",
    married: "Married",
    marriedWithChildren: "Married with Children",
    
    // Results
    eligibilityScore: "Eligibility Score",
    recommendedVisa: "Recommended Visa",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    
    // Pricing Plans
    perMonth: "Month",
    freePlan: "Free Plan",
    starterPlan: "Starter Plan",
    professionalPlan: "Professional Plan",
    premiumPlan: "Premium Plan",
    perfectForExploringOptions: "Perfect for exploring options",
    oneTime: "One-time payment",
    professionalPlanDescription: "Best for serious relocators",
    fullService: "Full-service package",
    currentPlan: "Current Plan",
    getPdfGuide: "Get PDF Guide",
    selectPlan: "Select Plan",
    recommended: "Recommended",
    chooseYourRelocationPlan: "Choose Your Relocation Plan",
    fromBasicGuidanceToFullService: "From basic guidance to full-service relocation support",
    
    // Pricing Features
    basicVisaEligibility: "Basic visa eligibility check",
    aiChatGuidance: "AI chat guidance",
    countryComparisonTool: "Country comparison tool",
    basicCostEstimates: "Basic cost estimates",
    communityForumAccess: "Community forum access",
    unlimitedAiAssessments: "Unlimited AI assessments",
    pdfExportChecklist: "PDF export checklist",
    detailedVisaRequirements: "Detailed visa requirements",
    priorityAiChatResponses: "Priority AI chat responses",
    emailSupport: "Email support",
    unlimitedAiAssessmentsLabel: "Unlimited AI assessments",
    relocationBudgetCalculator: "Relocation budget calculator",
    savedRelocationProfiles: "Saved relocation profiles",
    visaStatusAlerts: "Visa status alerts",
    taxPlanningGuidance: "Tax planning guidance",
    oneOnOneConsultation: "One-on-one consultation",
    documentPreparationService: "Document preparation service",
    visaApplicationAssistance: "Visa application assistance",
    bankAccountSetupGuidance: "Bank account setup guidance",
    housingJobSearchSupport: "Housing & job search support",
    dedicatedRelocationManager: "Dedicated relocation manager",
    allPlansIncludeCore: "All plans include core features and 24/7 support",
    thirtyDayMoneyBack: "30-day money-back guarantee",
    securePaymentProcessing: "Secure payment processing",
    cancelAnytime: "Cancel anytime",
    compareAllFeatures: "Compare All Features",
    
    // General Pricing
    pricingTitle: "Choose Your Plan",
    pricingDescription: "Get the support level that matches your needs.",
    freeConsultation: "Free Consultation",
    fullAssessment: "Full Assessment",
    premiumSupport: "Premium Support",
    expertConsultation: "Expert Consultation",
    bookConsultation: "Book Consultation",
    
    // Free Guide
    freeGuideAvailable: "Free Relocation Guide Available",
    freeGuideDescription: "Download our comprehensive guide to get started with your Malaysia relocation journey.",
    basicRelocationInfo: "Essential information for new relocators",
    
    // Email Capture
    emailTitle: "Stay Updated",
    emailDescription: "Get the latest updates on visa requirements and relocation tips.",
    emailPlaceholder: "Enter your email address",
    subscribeNow: "Subscribe Now",
    enterEmailAddress: "Enter your email address",
    getActionPlan: "Get Action Plan",
    getNotified: "Get notified about visa updates and new features",
    emailSuccess: "Success!",
    emailError: "Failed to subscribe. Please try again.",
    invalidEmail: "Invalid Email",
    
    // Footer
    footerDescription: "Simplifying international relocation with AI-powered guidance and expert support.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    followUs: "Follow Us",
    smartRelocateDescription: "AI-powered relocation assistant helping tech professionals and digital nomads move to Malaysia with confidence.",
    support: "Support",
    helpCenter: "Help Center",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    resources: "Resources",
    costCalculator: "Cost Calculator",
    allRightsReserved: "All rights reserved.",
    
    // Additional Pricing Table properties
    compareAllPlans: "Compare All Plans",
    detailedFeatureComparison: "Detailed feature comparison across all plans",
    free: "Free",
    forever: "Forever",
    enterprisePlan: "Enterprise Plan",
    threePerMonth: "3 per month",
    tenPerMonth: "10 per month",
    twoSessions: "2 sessions",
    
    // City Comparison
    compareMalaysianCities: "Compare Malaysian Cities",
    startComparingCities: "Start Comparing Cities",
    cityComparisonDescription: "Find the perfect Malaysian city for your relocation by comparing living costs, lifestyle, and practical information across major destinations.",
    costAnalysis: "Cost Analysis",
    costAnalysisDescription: "Compare rent, food, transport, and total living expenses across cities",
    lifestyleMetrics: "Lifestyle Metrics",
    lifestyleMetricsDescription: "Evaluate nightlife, culture, safety, expat community, and nature access",
    practicalInfo: "Practical Info",
    practicalInfoDescription: "Internet speeds, transport options, English usage, and visa requirements",
    transportOptions: "Transport Options",
    
    // PDF Guide
    malaysiaRelocationGuide: "Malaysia Relocation Guide",
    completePdfChecklist: "Complete PDF checklist with step-by-step instructions",
    completeVisaComparisonChart: "Complete visa comparison chart",
    costBreakdownByVisaType: "Cost breakdown by visa type",
    stepByStepApplicationProcess: "Step-by-step application process",
    livingCostsByCity: "Living costs by city",
    whatsIncluded: "What's Included",
    comprehensiveRelocationInfo: "Comprehensive relocation information and guides",
    detailedBreakdownVisa: "Detailed breakdown of all visa options with requirements and costs",
  },
  
  fr: {
    // Common UI
    loading: "Chargement...",
    error: "Erreur",
    submit: "Soumettre",
    cancel: "Annuler",
    continue: "Continuer",
    back: "Retour",
    next: "Suivant",
    
    // Navigation
    home: "Accueil",
    about: "À propos",
    contact: "Contact",
    pricing: "Tarifs",
    
    // Hero Section
    heroTitle: "Votre Assistant de Relocation Alimenté par IA",
    heroSubtitle: "Simplifiez Votre Déménagement en Malaisie",
    heroDescription: "Obtenez des recommandations de visa personnalisées, des estimations de coûts et des conseils d'experts pour votre parcours de relocation.",
    getStarted: "Commencer",
    learnMore: "En savoir plus",
    moveToMalaysia: "Déménager en Malaisie",
    withConfidence: "en toute confiance",
    personalizedGuidance: "Obtenez des conseils personnalisés pour votre parcours de relocation",
    startYourJourney: "Commencez Votre Voyage",
    downloadFreeGuide: "Télécharger le Guide Gratuit",
    online: "En ligne",
    welcomeMessage: "Bienvenue ! Je suis là pour vous aider avec vos questions de relocation en Malaisie.",
    userExampleMessage: "Je suis développeur logiciel des États-Unis et je cherche à déménager à KL. Quel visa dois-je demander ?",
    aiResponseMessage: "Basé sur votre profil de développeur logiciel, je recommande le Pass d'Emploi si vous avez une offre d'emploi, ou le visa DE Rantau pour le travail à distance. Dites-moi en plus sur votre situation !",
    aiIsTyping: "L'IA tape...",
    
    // How It Works
    howItWorksTitle: "Comment Ça Marche",
    howItWorksDescription: "Notre plateforme alimentée par IA vous guide à travers chaque étape de votre processus de relocation.",
    step1Title: "Évaluation",
    step1Description: "Parlez-nous de votre parcours, profession et objectifs de relocation.",
    step2Title: "Analyse",
    step2Description: "Notre IA analyse votre profil et calcule vos scores d'éligibilité.",
    step3Title: "Recommandations",
    step3Description: "Recevez des recommandations de visa personnalisées et des estimations de coûts.",
    step4Title: "Conseils",
    step4Description: "Obtenez un soutien d'expert et des conseils étape par étape pour votre déménagement.",
    
    // Visa Types
    visaTypesTitle: "Options de Visa pour la Malaisie",
    visaTypesDescription: "Explorez les différents types de visa disponibles pour votre relocation en Malaisie.",
    deRantauTitle: "Visa DE Rantau",
    deRantauDescription: "Parfait pour les nomades numériques et les travailleurs à distance",
    deRantauFeature1: "Séjour jusqu'à 12 mois",
    deRantauFeature2: "Travail à distance autorisé",
    deRantauFeature3: "Temps de traitement rapide",
    mm2hTitle: "Programme MM2H",
    mm2hDescription: "Résidence à long terme pour les retraités et investisseurs",
    mm2hFeature1: "Visa renouvelable de 10 ans",
    mm2hFeature2: "Exigences d'investissement",
    mm2hFeature3: "Inclusion familiale possible",
    employmentPassTitle: "Pass d'Emploi",
    employmentPassDescription: "Visa de travail pour les professionnels qualifiés avec offres d'emploi",
    employmentPassFeature1: "Validité jusqu'à 5 ans",
    employmentPassFeature2: "Renouvelable avec emploi",
    employmentPassFeature3: "Visas de dépendants familiaux",
    
    // Chat and Forms
    chatTitle: "Demandez à Notre Assistant IA",
    chatDescription: "Obtenez des réponses instantanées sur les visas, coûts et processus de relocation.",
    chatPlaceholder: "Demandez sur les exigences de visa, coûts, ou autre chose...",
    sendMessage: "Envoyer",
    tellUsAboutYourself: "Parlez-nous de vous",
    profession: "Profession",
    familyStatus: "Statut Familial",
    experience: "Niveau d'Expérience",
    education: "Niveau d'Éducation",
    annualIncome: "Revenu Annuel (USD)",
    relocationTimeline: "Chronologie de Relocation",
    askAnything: "Demandez tout sur le déménagement en Malaisie",
    startChat: "Commencez Votre Voyage",
    
    // Start Your Journey Section
    countryOfOriginTitle: "Pays d'Origine",
    countryOfOriginDesc: "Différentes exigences de visa basées sur votre nationalité",
    professionalBackgroundTitle: "Parcours Professionnel",
    professionalBackgroundDesc: "L'éligibilité du visa varie selon la profession et l'expérience",
    familySituationTitle: "Situation Familiale",
    familySituationDesc: "Différentes options pour les individus vs. les familles",
    incomeRequirementsTitle: "Exigences de Revenu",
    incomeRequirementsDesc: "Seuils de revenu minimum pour différents types de visa",
    
    // Options
    selectProfession: "Sélectionnez votre profession",
    selectFamilyStatus: "Sélectionnez le statut familial",
    softwareDeveloper: "Développeur Logiciel",
    dataScientist: "Scientifique des Données",
    productManager: "Chef de Produit",
    designer: "Designer",
    other: "Autre",
    single: "Célibataire",
    married: "Marié(e)",
    marriedWithChildren: "Marié(e) avec Enfants",
    
    // Results
    eligibilityScore: "Score d'Éligibilité",
    recommendedVisa: "Visa Recommandé",
    excellent: "Excellent",
    good: "Bon",
    fair: "Acceptable",
    poor: "Pauvre",
    
    // Pricing Plans
    perMonth: "Mois",
    freePlan: "Plan Gratuit",
    starterPlan: "Plan Débutant",
    professionalPlan: "Plan Professionnel",
    premiumPlan: "Plan Premium",
    perfectForExploringOptions: "Parfait pour explorer les options",
    oneTime: "Paiement unique",
    professionalPlanDescription: "Idéal pour les relocalisateurs sérieux",
    fullService: "Package service complet",
    currentPlan: "Plan Actuel",
    getPdfGuide: "Obtenir le Guide PDF",
    selectPlan: "Sélectionner le Plan",
    recommended: "Recommandé",
    chooseYourRelocationPlan: "Choisissez Votre Plan de Relocation",
    fromBasicGuidanceToFullService: "Des conseils de base au support de relocation service complet",
    
    // Pricing Features
    basicVisaEligibility: "Vérification d'éligibilité visa de base",
    aiChatGuidance: "Conseils de chat IA",
    countryComparisonTool: "Outil de comparaison de pays",
    basicCostEstimates: "Estimations de coûts de base",
    communityForumAccess: "Accès au forum communautaire",
    unlimitedAiAssessments: "Évaluations IA illimitées",
    pdfExportChecklist: "Liste de contrôle d'exportation PDF",
    detailedVisaRequirements: "Exigences de visa détaillées",
    priorityAiChatResponses: "Réponses de chat IA prioritaires",
    emailSupport: "Support email",
    unlimitedAiAssessmentsLabel: "Évaluations IA illimitées",
    relocationBudgetCalculator: "Calculateur de budget de relocation",
    savedRelocationProfiles: "Profils de relocation sauvegardés",
    visaStatusAlerts: "Alertes de statut de visa",
    taxPlanningGuidance: "Conseils de planification fiscale",
    oneOnOneConsultation: "Consultation individuelle",
    documentPreparationService: "Service de préparation de documents",
    visaApplicationAssistance: "Assistance pour demande de visa",
    bankAccountSetupGuidance: "Conseils d'ouverture de compte bancaire",
    housingJobSearchSupport: "Support recherche logement et emploi",
    dedicatedRelocationManager: "Gestionnaire de relocation dédié",
    allPlansIncludeCore: "Tous les plans incluent les fonctionnalités de base et le support 24/7",
    thirtyDayMoneyBack: "Garantie de remboursement 30 jours",
    securePaymentProcessing: "Traitement de paiement sécurisé",
    cancelAnytime: "Annuler à tout moment",
    compareAllFeatures: "Comparer Toutes les Fonctionnalités",
    
    // General Pricing
    pricingTitle: "Choisissez Votre Plan",
    pricingDescription: "Obtenez le niveau de support qui correspond à vos besoins.",
    freeConsultation: "Consultation Gratuite",
    fullAssessment: "Évaluation Complète",
    premiumSupport: "Support Premium",
    expertConsultation: "Consultation d'Expert",
    bookConsultation: "Réserver une Consultation",
    
    // Free Guide
    freeGuideAvailable: "Guide de Relocation Gratuit Disponible",
    freeGuideDescription: "Téléchargez notre guide complet pour commencer votre parcours de relocation en Malaisie.",
    basicRelocationInfo: "Informations essentielles pour nouveaux relocalisateurs",
    
    // Email Capture
    emailTitle: "Restez Informé",
    emailDescription: "Recevez les dernières mises à jour sur les exigences de visa et conseils de relocation.",
    emailPlaceholder: "Entrez votre adresse email",
    subscribeNow: "S'abonner Maintenant",
    enterEmailAddress: "Entrez votre adresse email",
    getActionPlan: "Obtenir le Plan d'Action",
    getNotified: "Recevez des notifications sur les mises à jour de visa et nouvelles fonctionnalités",
    emailSuccess: "Succès!",
    emailError: "Échec de l'abonnement. Veuillez réessayer.",
    invalidEmail: "Email Invalide",
    
    // Footer
    footerDescription: "Simplifier la relocation internationale avec des conseils alimentés par IA et un support d'expert.",
    quickLinks: "Liens Rapides",
    contactInfo: "Informations de Contact",
    followUs: "Suivez-Nous",
    smartRelocateDescription: "Assistant de relocation alimenté par l'IA aidant les professionnels de la technologie et les nomades numériques à déménager en Malaisie en toute confiance.",
    support: "Support",
    helpCenter: "Centre d'Aide",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    resources: "Ressources",
    costCalculator: "Calculateur de Coût",
    allRightsReserved: "Tous droits réservés.",
    
    // Additional Pricing Table properties
    compareAllPlans: "Comparer Tous les Plans",
    detailedFeatureComparison: "Comparaison détaillée des fonctionnalités sur tous les plans",
    free: "Gratuit",
    forever: "Pour toujours",
    enterprisePlan: "Plan Entreprise",
    threePerMonth: "3 par mois",
    tenPerMonth: "10 par mois",
    twoSessions: "2 sessions",
    
    // City Comparison
    compareMalaysianCities: "Comparer les Villes Malaises",
    startComparingCities: "Commencer la Comparaison",
    cityComparisonDescription: "Trouvez la ville malaise parfaite pour votre relocation en comparant les coûts de vie, le style de vie et les informations pratiques à travers les principales destinations.",
    costAnalysis: "Analyse des Coûts",
    costAnalysisDescription: "Comparez loyer, nourriture, transport et dépenses de vie totales à travers les villes",
    lifestyleMetrics: "Métriques de Style de Vie",
    lifestyleMetricsDescription: "Évaluez la vie nocturne, culture, sécurité, communauté expat et accès à la nature",
    practicalInfo: "Informations Pratiques",
    practicalInfoDescription: "Vitesses internet, options de transport, usage de l'anglais et exigences de visa",
    transportOptions: "Options de Transport",
    
    // PDF Guide
    malaysiaRelocationGuide: "Guide de Relocation Malaisie",
    completePdfChecklist: "Liste de contrôle PDF complète avec instructions étape par étape",
    completeVisaComparisonChart: "Tableau de comparaison de visa complet",
    costBreakdownByVisaType: "Répartition des coûts par type de visa",
    stepByStepApplicationProcess: "Processus de demande étape par étape",
    livingCostsByCity: "Coûts de vie par ville",
    whatsIncluded: "Ce qui est Inclus",
    comprehensiveRelocationInfo: "Informations et guides de relocation complets",
    detailedBreakdownVisa: "Répartition détaillée de toutes les options de visa avec exigences et coûts",
  },
  
  ar: {
    // Common UI
    loading: "جاري التحميل...",
    error: "خطأ",
    submit: "إرسال",
    cancel: "إلغاء",
    continue: "متابعة",
    back: "عودة",
    next: "التالي",
    
    // Navigation
    home: "الرئيسية",
    about: "حول",
    contact: "اتصل",
    pricing: "التسعير",
    
    // Hero Section
    heroTitle: "مساعد الانتقال المدعوم بالذكاء الاصطناعي",
    heroSubtitle: "بسّط انتقالك إلى ماليزيا",
    heroDescription: "احصل على توصيات فيزا مخصصة وتقديرات التكلفة والإرشاد الخبير لرحلة انتقالك.",
    getStarted: "ابدأ",
    learnMore: "تعلم المزيد",
    moveToMalaysia: "الانتقال إلى ماليزيا",
    withConfidence: "بثقة",
    personalizedGuidance: "احصل على إرشاد مخصص لرحلة انتقالك",
    startYourJourney: "ابدأ رحلتك",
    downloadFreeGuide: "تحميل الدليل المجاني",
    online: "عبر الإنترنت",
    welcomeMessage: "مرحباً! أنا هنا لمساعدتك في أسئلة الانتقال إلى ماليزيا.",
    userExampleMessage: "أنا مطور برمجيات من الولايات المتحدة وأتطلع للانتقال إلى كوالالمبور. ما الفيزا التي يجب أن أتقدم لها؟",
    aiResponseMessage: "بناءً على ملفك الشخصي كمطور برمجيات، أنصح بتصريح العمل إذا كان لديك عرض عمل، أو فيزا DE Rantau للعمل عن بُعد. أخبرني المزيد عن وضعك!",
    aiIsTyping: "الذكاء الاصطناعي يكتب...",
    
    // How It Works
    howItWorksTitle: "كيف يعمل",
    howItWorksDescription: "منصتنا المدعومة بالذكاء الاصطناعي ترشدك خلال كل خطوة من عملية انتقالك.",
    step1Title: "التقييم",
    step1Description: "أخبرنا عن خلفيتك ومهنتك وأهداف الانتقال.",
    step2Title: "التحليل",
    step2Description: "ذكاؤنا الاصطناعي يحلل ملفك الشخصي ويحسب درجات أهليتك.",
    step3Title: "التوصيات",
    step3Description: "احصل على توصيات فيزا مخصصة وتقديرات التكلفة.",
    step4Title: "الإرشاد",
    step4Description: "احصل على دعم خبير وإرشاد خطوة بخطوة لانتقالك.",
    
    // Visa Types
    visaTypesTitle: "خيارات الفيزا لماليزيا",
    visaTypesDescription: "استكشف أنواع الفيزا المختلفة المتاحة لانتقالك إلى ماليزيا.",
    deRantauTitle: "فيزا DE Rantau",
    deRantauDescription: "مثالية للرحالة الرقميين والعاملين عن بُعد",
    deRantauFeature1: "إقامة حتى 12 شهراً",
    deRantauFeature2: "العمل عن بُعد مسموح",
    deRantauFeature3: "وقت معالجة سريع",
    mm2hTitle: "برنامج MM2H",
    mm2hDescription: "إقامة طويلة المدى للمتقاعدين والمستثمرين",
    mm2hFeature1: "فيزا قابلة للتجديد لمدة 10 سنوات",
    mm2hFeature2: "متطلبات الاستثمار",
    mm2hFeature3: "إمكانية شمول العائلة",
    employmentPassTitle: "تصريح العمل",
    employmentPassDescription: "فيزا عمل للمهنيين المهرة مع عروض العمل",
    employmentPassFeature1: "صالحة حتى 5 سنوات",
    employmentPassFeature2: "قابلة للتجديد مع العمل",
    employmentPassFeature3: "فيز للمعالين",
    
    // Chat and Forms
    chatTitle: "اسأل مساعدنا الذكي",
    chatDescription: "احصل على إجابات فورية حول الفيز والتكاليف وعملية الانتقال.",
    chatPlaceholder: "اسأل عن متطلبات الفيزا أو التكاليف أو أي شيء آخر...",
    sendMessage: "إرسال",
    tellUsAboutYourself: "أخبرنا عن نفسك",
    profession: "المهنة",
    familyStatus: "الوضع العائلي",
    experience: "مستوى الخبرة",
    education: "المستوى التعليمي",
    annualIncome: "الدخل السنوي (دولار أمريكي)",
    relocationTimeline: "الجدول الزمني للانتقال",
    askAnything: "اسأل أي شيء عن الانتقال إلى ماليزيا",
    startChat: "ابدأ رحلتك",
    
    // Start Your Journey Section
    countryOfOriginTitle: "بلد المنشأ",
    countryOfOriginDesc: "متطلبات فيزا مختلفة بناءً على جنسيتك",
    professionalBackgroundTitle: "الخلفية المهنية",
    professionalBackgroundDesc: "أهلية الفيزا تختلف حسب المهنة والخبرة",
    familySituationTitle: "الوضع العائلي",
    familySituationDesc: "خيارات مختلفة للأفراد مقابل العائلات",
    incomeRequirementsTitle: "متطلبات الدخل",
    incomeRequirementsDesc: "حد أدنى للدخل لأنواع فيزا مختلفة",
    
    // Options
    selectProfession: "اختر مهنتك",
    selectFamilyStatus: "اختر الوضع العائلي",
    softwareDeveloper: "مطور برمجيات",
    dataScientist: "عالم بيانات",
    productManager: "مدير منتج",
    designer: "مصمم",
    other: "أخرى",
    single: "أعزب",
    married: "متزوج",
    marriedWithChildren: "متزوج مع أطفال",
    
    // Results
    eligibilityScore: "نتيجة الأهلية",
    recommendedVisa: "الفيزا الموصى بها",
    excellent: "ممتاز",
    good: "جيد",
    fair: "مقبول",
    poor: "ضعيف",
    
    // Pricing Plans
    perMonth: "شهر",
    freePlan: "الخطة المجانية",
    starterPlan: "خطة المبتدئين",
    professionalPlan: "الخطة المهنية",
    premiumPlan: "الخطة المميزة",
    perfectForExploringOptions: "مثالية لاستكشاف الخيارات",
    oneTime: "دفعة واحدة",
    professionalPlanDescription: "الأفضل للمنتقلين الجادين",
    fullService: "حزمة الخدمة الكاملة",
    currentPlan: "الخطة الحالية",
    getPdfGuide: "احصل على دليل PDF",
    selectPlan: "اختر الخطة",
    recommended: "موصى به",
    chooseYourRelocationPlan: "اختر خطة انتقالك",
    fromBasicGuidanceToFullService: "من الإرشاد الأساسي إلى دعم الانتقال الكامل",
    
    // Pricing Features
    basicVisaEligibility: "فحص أهلية الفيزا الأساسي",
    aiChatGuidance: "إرشاد الدردشة بالذكاء الاصطناعي",
    countryComparisonTool: "أداة مقارنة البلدان",
    basicCostEstimates: "تقديرات التكلفة الأساسية",
    communityForumAccess: "الوصول لمنتدى المجتمع",
    unlimitedAiAssessments: "تقييمات ذكاء اصطناعي غير محدودة",
    pdfExportChecklist: "قائمة تصدير PDF",
    detailedVisaRequirements: "متطلبات الفيزا التفصيلية",
    priorityAiChatResponses: "ردود دردشة ذكاء اصطناعي أولوية",
    emailSupport: "دعم البريد الإلكتروني",
    unlimitedAiAssessmentsLabel: "تقييمات ذكاء اصطناعي غير محدودة",
    relocationBudgetCalculator: "حاسبة ميزانية الانتقال",
    savedRelocationProfiles: "ملفات الانتقال المحفوظة",
    visaStatusAlerts: "تنبيهات حالة الفيزا",
    taxPlanningGuidance: "إرشاد التخطيط الضريبي",
    oneOnOneConsultation: "استشارة فردية",
    documentPreparationService: "خدمة إعداد الوثائق",
    visaApplicationAssistance: "مساعدة طلب الفيزا",
    bankAccountSetupGuidance: "إرشاد فتح الحساب المصرفي",
    housingJobSearchSupport: "دعم البحث عن السكن والعمل",
    dedicatedRelocationManager: "مدير انتقال مخصص",
    allPlansIncludeCore: "جميع الخطط تشمل الميزات الأساسية والدعم على مدار الساعة",
    thirtyDayMoneyBack: "ضمان استرداد المال لمدة 30 يوماً",
    securePaymentProcessing: "معالجة دفع آمنة",
    cancelAnytime: "إلغاء في أي وقت",
    compareAllFeatures: "قارن جميع الميزات",
    
    // General Pricing
    pricingTitle: "اختر خطتك",
    pricingDescription: "احصل على مستوى الدعم الذي يناسب احتياجاتك.",
    freeConsultation: "استشارة مجانية",
    fullAssessment: "تقييم كامل",
    premiumSupport: "دعم مميز",
    expertConsultation: "استشارة خبير",
    bookConsultation: "احجز استشارة",
    
    // Free Guide
    freeGuideAvailable: "دليل الانتقال المجاني متاح",
    freeGuideDescription: "حمّل دليلنا الشامل للبدء في رحلة انتقالك إلى ماليزيا.",
    basicRelocationInfo: "معلومات أساسية للمنتقلين الجدد",
    
    // Email Capture
    emailTitle: "ابق على اطلاع",
    emailDescription: "احصل على آخر التحديثات حول متطلبات الفيزا ونصائح الانتقال.",
    emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    subscribeNow: "اشترك الآن",
    enterEmailAddress: "أدخل عنوان بريدك الإلكتروني",
    getActionPlan: "احصل على خطة العمل",
    getNotified: "احصل على إشعارات حول تحديثات الفيزا والميزات الجديدة",
    emailSuccess: "نجح!",
    emailError: "فشل في الاشتراك. يرجى المحاولة مرة أخرى.",
    invalidEmail: "بريد إلكتروني غير صالح",
    
    // Footer
    footerDescription: "تبسيط الانتقال الدولي بإرشاد مدعوم بالذكاء الاصطناعي ودعم خبير.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    followUs: "تابعنا",
    smartRelocateDescription: "مساعد الانتقال المدعوم بالذكاء الاصطناعي الذي يساعد المتخصصين في التكنولوجيا والرحل الرقميين على الانتقال إلى ماليزيا بثقة.",
    support: "الدعم",
    helpCenter: "مركز المساعدة",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    resources: "الموارد",
    costCalculator: "حاسبة التكلفة",
    allRightsReserved: "جميع الحقوق محفوظة.",
    
    // Additional Pricing Table properties
    compareAllPlans: "قارن جميع الخطط",
    detailedFeatureComparison: "مقارنة مفصلة للميزات عبر جميع الخطط",
    free: "مجاني",
    forever: "إلى الأبد",
    enterprisePlan: "خطة المؤسسات",
    threePerMonth: "3 في الشهر",
    tenPerMonth: "10 في الشهر",
    twoSessions: "جلستان",
    
    // City Comparison
    compareMalaysianCities: "قارن المدن الماليزية",
    startComparingCities: "ابدأ مقارنة المدن",
    cityComparisonDescription: "اعثر على المدينة الماليزية المثالية لانتقالك من خلال مقارنة تكاليف المعيشة ونمط الحياة والمعلومات العملية عبر الوجهات الرئيسية.",
    costAnalysis: "تحليل التكلفة",
    costAnalysisDescription: "قارن الإيجار والطعام والنقل وإجمالي نفقات المعيشة عبر المدن",
    lifestyleMetrics: "مقاييس نمط الحياة",
    lifestyleMetricsDescription: "قيّم الحياة الليلية والثقافة والأمان ومجتمع الوافدين والوصول للطبيعة",
    practicalInfo: "معلومات عملية",
    practicalInfoDescription: "سرعات الإنترنت وخيارات النقل واستخدام الإنجليزية ومتطلبات الفيزا",
    transportOptions: "خيارات النقل",
    
    // PDF Guide
    malaysiaRelocationGuide: "دليل الانتقال إلى ماليزيا",
    completePdfChecklist: "قائمة فحص PDF كاملة مع تعليمات خطوة بخطوة",
    completeVisaComparisonChart: "جدول مقارنة الفيزا الكامل",
    costBreakdownByVisaType: "تفصيل التكلفة حسب نوع الفيزا",
    stepByStepApplicationProcess: "عملية التطبيق خطوة بخطوة",
    livingCostsByCity: "تكاليف المعيشة حسب المدينة",
    whatsIncluded: "ما هو مشمول",
    comprehensiveRelocationInfo: "معلومات وأدلة انتقال شاملة",
    detailedBreakdownVisa: "تفصيل مفصل لجميع خيارات الفيزا مع المتطلبات والتكاليف",
  },
};