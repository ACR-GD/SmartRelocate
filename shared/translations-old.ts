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
  mm2hTitle: string;
  mm2hDescription: string;
  employmentPassTitle: string;
  employmentPassDescription: string;
  
  // Relocation Wizard
  wizardTitle: string;
  wizardSubtitle: string;
  locationStep: string;
  profileStep: string;
  resultsStep: string;
  selectContinentTitle: string;
  selectContinentDescription: string;
  selectCountryTitle: string;
  selectCountryDescription: string;
  continueToProfile: string;
  
  // Profile Form
  profileTitle: string;
  profileDescription: string;
  basicInformation: string;
  financialEmployment: string;
  nationality: string;
  age: string;
  profession: string;
  experience: string;
  education: string;
  annualIncome: string;
  liquidAssets: string;
  familyStatus: string;
  healthStatus: string;
  hasJobOffer: string;
  criminalRecord: string;
  languageSkills: string;
  calculateEligibility: string;
  
  // Results
  analysisTitle: string;
  analysisDescription: string;
  matchScore: string;
  topStrengths: string;
  improvementAreas: string;
  detailedBreakdown: string;
  viewRequirements: string;
  
  // Email Capture
  emailTitle: string;
  emailDescription: string;
  emailPlaceholder: string;
  getActionPlan: string;
  
  // Common
  totalCost: string;
  timeline: string;
  livingCost: string;
  processingTime: string;
  eligibilityAssessment: string;
  requirements: string;
  benefits: string;
  
  // Notifications
  analysisComplete: string;
  analysisCompleteDesc: string;
  emailSuccess: string;
  emailError: string;
  invalidEmail: string;
  
  // Placeholders
  selectContinent: string;
  selectCountry: string;
  selectNationality: string;
  selectProfession: string;
  selectEducation: string;
  selectFamilyStatus: string;
  selectHealthStatus: string;
  enterAge: string;
  enterExperience: string;
  enterIncome: string;
  enterAssets: string;
  enterLanguage: string;
  
  // Suitability levels
  excellentFit: string;
  goodFit: string;
  fairFit: string;
  poorFit: string;
  
  // Education levels
  highSchool: string;
  bachelors: string;
  masters: string;
  phd: string;
  
  // Family status
  single: string;
  married: string;
  marriedWithChildren: string;
  
  // Health status
  excellent: string;
  good: string;
  fair: string;
  poor: string;
  
  // Additional UI strings for comprehensive coverage
  moveToMalaysia: string;
  withConfidence: string;
  personalizedGuidance: string;
  startYourJourney: string;
  watchDemo: string;
  online: string;
  aiIsTyping: string;
  welcomeMessage: string;
  userExampleMessage: string;
  aiResponseMessage: string;
  
  // Chat and interaction
  startChat: string;
  sendMessage: string;
  typeMessage: string;
  chatWithAI: string;
  askAnything: string;
  
  // Email and contact
  stayUpdated: string;
  getNotified: string;
  subscribeNewsletter: string;
  enterEmailAddress: string;
  subscribe: string;
  
  // Footer
  smartRelocateDescription: string;
  quickLinks: string;
  support: string;
  legal: string;
  privacyPolicy: string;
  termsOfService: string;
  followUs: string;
  allRightsReserved: string;
  contact: string;
  
  // Navigation & Pricing
  pricing: string;
  
  // How It Works Section
  howItWorksDescription: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  
  // Visa Features
  deRantauFeature1: string;
  deRantauFeature2: string;
  deRantauFeature3: string;
  mm2hFeature1: string;
  mm2hFeature2: string;
  mm2hFeature3: string;
  employmentPassFeature1: string;
  employmentPassFeature2: string;
  employmentPassFeature3: string;
  
  // City Comparison
  cityComparisonTitle: string;
  cityComparisonDescription: string;
  
  // Wizard Steps
  wizardTitle: string;
  wizardDescription: string;
  countryOfOrigin: string;
  countryOfOriginDescription: string;
  professionalBackground: string;
  professionalBackgroundDescription: string;
  familySituation: string;
  familySituationDescription: string;
  incomeRequirements: string;
  incomeRequirementsDescription: string;
  
  // Plan Comparison
  compareAllPlans: string;
  compareAllPlansDescription: string;
  free: string;
  forever: string;
  currentPlan: string;
  basicVisaEligibility: string;
  aiChatGuidance: string;
  countryComparisonTool: string;
  basicCostEstimates: string;
  communityForumAccess: string;
  unlimitedAiAssessments: string;
}

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
    
    // Hero Section
    heroTitle: "Move to Malaysia",
    heroSubtitle: "with Confidence",
    heroDescription: "Get personalized guidance on visas, costs, and relocation steps tailored specifically for tech workers and digital nomads.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // How It Works
    howItWorksTitle: "How It Works",
    step1Title: "Assess Your Profile",
    step1Description: "Answer a few questions about your background, experience, and goals",
    step2Title: "Get Recommendations",
    step2Description: "Our AI analyzes your profile and suggests the best visa options",
    step3Title: "Plan Your Move",
    step3Description: "Receive a detailed plan with costs, timelines, and steps",
    step4Title: "Move with Confidence",
    step4Description: "Follow your personalized guide for a smooth relocation process",
    
    // Visa Types
    visaTypesTitle: "Visa Types",
    visaTypesDescription: "Explore different visa options available",
    deRantauTitle: "DE Rantau Pass",
    deRantauDescription: "For digital nomads and entrepreneurs",
    mm2hTitle: "MM2H Programme",
    mm2hDescription: "Long-term residence for retirees",
    employmentPassTitle: "Employment Pass",
    employmentPassDescription: "For skilled professionals with job offers",
    
    // Relocation Wizard
    wizardTitle: "Relocation Wizard",
    wizardSubtitle: "Discover your best options for moving to Malaysia",
    locationStep: "Location",
    profileStep: "Profile",
    resultsStep: "Results",
    selectContinentTitle: "Select Continent",
    selectContinentDescription: "Choose your home region",
    selectCountryTitle: "Select Country",
    selectCountryDescription: "Choose your destination in Malaysia",
    continueToProfile: "Continue to Profile",
    
    // Profile Form
    profileTitle: "Your Profile Information",
    profileDescription: "Help us calculate your visa eligibility by providing accurate information about your background",
    basicInformation: "Basic Information",
    financialEmployment: "Financial & Employment",
    nationality: "Nationality",
    age: "Age",
    profession: "Profession",
    experience: "Experience",
    education: "Education",
    annualIncome: "Annual Income",
    liquidAssets: "Liquid Assets",
    familyStatus: "Family Status",
    healthStatus: "Health Status",
    hasJobOffer: "Job Offer",
    criminalRecord: "Criminal Record",
    languageSkills: "Language Skills",
    calculateEligibility: "Calculate Eligibility",
    
    // Results
    analysisTitle: "Eligibility Analysis",
    analysisDescription: "Here are your visa eligibility results based on your profile",
    matchScore: "Match Score",
    topStrengths: "Top Strengths",
    improvementAreas: "Improvement Areas",
    detailedBreakdown: "Detailed Breakdown",
    viewRequirements: "View Requirements",
    
    // Email Capture
    emailTitle: "Get Your Personalized Action Plan",
    emailDescription: "Receive a step-by-step guide tailored to your profile",
    emailPlaceholder: "your@email.com",
    getActionPlan: "Get Action Plan",
    
    // Common
    totalCost: "Total Cost",
    timeline: "Timeline",
    livingCost: "Living Cost",
    processingTime: "Processing Time",
    eligibilityAssessment: "Eligibility Assessment",
    requirements: "Requirements",
    benefits: "Benefits",
    
    // Notifications
    analysisComplete: "Analysis Complete",
    analysisCompleteDesc: "Your visa eligibility results are ready",
    emailSuccess: "Email sent successfully",
    emailError: "Error sending email",
    invalidEmail: "Invalid email address",
    
    // Placeholders
    selectContinent: "Select continent",
    selectCountry: "Select country",
    selectNationality: "Select nationality",
    selectProfession: "Select profession",
    selectEducation: "Select education",
    selectFamilyStatus: "Select family status",
    selectHealthStatus: "Select health status",
    enterAge: "Enter age",
    enterExperience: "Enter experience",
    enterIncome: "Enter income",
    enterAssets: "Enter assets",
    enterLanguage: "Enter language",
    
    // Suitability levels
    excellentFit: "Excellent Fit",
    goodFit: "Good Fit",
    fairFit: "Fair Fit",
    poorFit: "Poor Fit",
    
    // Education levels
    highSchool: "High School",
    bachelors: "Bachelor's",
    masters: "Master's",
    phd: "PhD",
    
    // Family status
    single: "Single",
    married: "Married",
    marriedWithChildren: "Married with Children",
    
    // Health status
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    
    // Additional UI strings for comprehensive coverage
    moveToMalaysia: "Move to Malaysia",
    withConfidence: "with Confidence",
    personalizedGuidance: "Get personalized guidance on visas, costs, and relocation steps tailored specifically for tech workers and digital nomads.",
    startYourJourney: "Start Your Journey",
    watchDemo: "Watch Demo",
    online: "Online",
    aiIsTyping: "AI is typing...",
    welcomeMessage: "👋 Welcome to SmartRelocate.ai! I'll help you understand your options to move to Malaysia.",
    userExampleMessage: "I'm a software engineer from the US looking to relocate",
    aiResponseMessage: "Great! A few questions to guide you better...",
    
    // Chat and interaction
    startChat: "Start Chat",
    sendMessage: "Send Message",
    typeMessage: "Type your message...",
    chatWithAI: "Chat with AI",
    askAnything: "Ask anything about moving to Malaysia",
    
    // Email and contact
    stayUpdated: "Stay Updated",
    getNotified: "Get notified about visa changes and opportunities",
    subscribeNewsletter: "Subscribe to Newsletter",
    enterEmailAddress: "Enter your email address",
    subscribe: "Subscribe",
    
    // Footer
    smartRelocateDescription: "AI-powered relocation assistant helping tech professionals and digital nomads move to Malaysia with confidence.",
    quickLinks: "Quick Links",
    support: "Support",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    
    // Navigation & Pricing
    pricing: "Pricing",
    
    // How It Works Section
    howItWorksDescription: "Our AI-powered assistant guides you through the entire relocation process with personalized recommendations",
    
    // Visa Features
    deRantauFeature1: "12-month renewable visa",
    deRantauFeature2: "Work remotely for foreign employers",
    deRantauFeature3: "Minimum $24,000 annual income",
    mm2hFeature1: "10-year renewable visa",
    mm2hFeature2: "Bring spouse and children",
    mm2hFeature3: "Property purchase allowed",
    employmentPassFeature1: "Up to 5-year duration",
    employmentPassFeature2: "Work for Malaysian employer",
    employmentPassFeature3: "Path to permanent residence",
    
    // City Comparison
    cityComparisonTitle: "Compare Malaysian Cities",
    cityComparisonDescription: "Make informed decisions with our interactive city comparison tool featuring living costs, lifestyle factors, and practical insights for every major Malaysian city.",
    
    // Wizard Steps
    wizardDescription: "Ask anything about relocating to Malaysia",
    countryOfOrigin: "Country of Origin",
    countryOfOriginDescription: "Different visa requirements based on your nationality",
    professionalBackground: "Professional Background",
    professionalBackgroundDescription: "Visa eligibility varies by profession and experience",
    familySituation: "Family Situation",
    familySituationDescription: "Different options for individuals vs. families",
    incomeRequirements: "Income Requirements",
    incomeRequirementsDescription: "Minimum income thresholds for different visa types",
    
    // Plan Comparison
    compareAllPlans: "Compare All Plans",
    compareAllPlansDescription: "Detailed feature comparison across all pricing tiers",
    free: "Free",
    forever: "Forever",
    currentPlan: "Current Plan",
    basicVisaEligibility: "Basic visa eligibility assessment",
    aiChatGuidance: "AI chat guidance",
    countryComparisonTool: "Country comparison tool",
    basicCostEstimates: "Basic cost estimates",
    communityForumAccess: "Community forum access",
    unlimitedAiAssessments: "Unlimited AI assessments (3 per month)"
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
    
    // Hero Section
    heroTitle: "Déménager en Malaisie",
    heroSubtitle: "en toute confiance",
    heroDescription: "Obtenez des conseils personnalisés sur les visas, les coûts et les étapes de relocalisation spécialement conçus pour les travailleurs technologiques et les nomades numériques.",
    getStarted: "Commencer",
    learnMore: "En savoir plus",
    
    // How It Works
    howItWorksTitle: "Comment ça marche",
    step1Title: "Évaluez votre profil",
    step1Description: "Répondez à quelques questions sur votre formation, votre expérience et vos objectifs",
    step2Title: "Obtenez des recommandations",
    step2Description: "Notre IA analyse votre profil et suggère les meilleures options de visa",
    step3Title: "Planifiez votre déménagement",
    step3Description: "Recevez un plan détaillé avec des coûts, des délais et des étapes",
    step4Title: "Déménagez en toute confiance",
    step4Description: "Suivez votre guide personnalisé pour un processus de relocalisation fluide",
    
    // Visa Types
    visaTypesTitle: "Types de visas",
    visaTypesDescription: "Explorer les différentes options de visa disponibles",
    deRantauTitle: "DE Rantau Pass",
    deRantauDescription: "Pour les nomades numériques et les entrepreneurs",
    mm2hTitle: "Programme MM2H",
    mm2hDescription: "Résidence à long terme pour les retraités",
    employmentPassTitle: "Permis d'emploi",
    employmentPassDescription: "Pour les professionnels qualifiés avec offres d'emploi",
    
    // Relocation Wizard
    wizardTitle: "Assistant de relocalisation",
    wizardSubtitle: "Découvrez vos meilleures options pour déménager en Malaisie",
    locationStep: "Emplacement",
    profileStep: "Profil",
    resultsStep: "Résultats",
    selectContinentTitle: "Sélectionnez le continent",
    selectContinentDescription: "Choisissez votre région d'origine",
    selectCountryTitle: "Sélectionnez le pays",
    selectCountryDescription: "Choisissez votre destination en Malaisie",
    continueToProfile: "Continuer vers le profil",
    
    // Profile Form
    profileTitle: "Informations de profil",
    profileDescription: "Aidez-nous à calculer votre éligibilité aux visas en fournissant des informations précises sur votre parcours",
    basicInformation: "Informations de base",
    financialEmployment: "Finances et emploi",
    nationality: "Nationalité",
    age: "Âge",
    profession: "Profession",
    experience: "Expérience",
    education: "Éducation",
    annualIncome: "Revenu annuel",
    liquidAssets: "Actifs liquides",
    familyStatus: "Statut familial",
    healthStatus: "État de santé",
    hasJobOffer: "Offre d'emploi",
    criminalRecord: "Casier judiciaire",
    languageSkills: "Compétences linguistiques",
    calculateEligibility: "Calculer l'éligibilité",
    
    // Results
    analysisTitle: "Analyse de l'éligibilité",
    analysisDescription: "Voici vos résultats d'éligibilité aux visas basés sur votre profil",
    matchScore: "Score de correspondance",
    topStrengths: "Principales forces",
    improvementAreas: "Domaines d'amélioration",
    detailedBreakdown: "Répartition détaillée",
    viewRequirements: "Voir les exigences",
    
    // Email Capture
    emailTitle: "Obtenez votre plan d'action personnalisé",
    emailDescription: "Recevez un guide étape par étape adapté à votre profil",
    emailPlaceholder: "votre@email.com",
    getActionPlan: "Obtenir le plan d'action",
    
    // Common
    totalCost: "Coût total",
    timeline: "Chronologie",
    livingCost: "Coût de la vie",
    processingTime: "Temps de traitement",
    eligibilityAssessment: "Évaluation de l'éligibilité",
    requirements: "Exigences",
    benefits: "Avantages",
    
    // Notifications
    analysisComplete: "Analyse terminée",
    analysisCompleteDesc: "Vos résultats d'éligibilité aux visas sont prêts",
    emailSuccess: "E-mail envoyé avec succès",
    emailError: "Erreur lors de l'envoi de l'e-mail",
    invalidEmail: "Adresse e-mail invalide",
    
    // Placeholders
    selectContinent: "Sélectionnez le continent",
    selectCountry: "Sélectionnez le pays",
    selectNationality: "Sélectionnez la nationalité",
    selectProfession: "Sélectionnez la profession",
    selectEducation: "Sélectionnez l'éducation",
    selectFamilyStatus: "Sélectionnez le statut familial",
    selectHealthStatus: "Sélectionnez l'état de santé",
    enterAge: "Entrez l'âge",
    enterExperience: "Entrez l'expérience",
    enterIncome: "Entrez le revenu",
    enterAssets: "Entrez les actifs",
    enterLanguage: "Entrez la langue",
    
    // Suitability levels
    excellentFit: "Excellent ajustement",
    goodFit: "Bon ajustement",
    fairFit: "Ajustement correct",
    poorFit: "Mauvais ajustement",
    
    // Education levels
    highSchool: "Lycée",
    bachelors: "Licence",
    masters: "Master",
    phd: "Doctorat",
    
    // Family status
    single: "Célibataire",
    married: "Marié(e)",
    marriedWithChildren: "Marié(e) avec enfants",
    
    // Health status
    excellent: "Excellent",
    good: "Bon",
    fair: "Correct",
    poor: "Mauvais",
    
    // Additional UI strings for comprehensive coverage
    moveToMalaysia: "Déménager en Malaisie",
    withConfidence: "en toute confiance",
    personalizedGuidance: "Obtenez des conseils personnalisés sur les visas, les coûts et les étapes de relocalisation spécialement conçus pour les travailleurs technologiques et les nomades numériques.",
    startYourJourney: "Commencez votre voyage",
    watchDemo: "Regarder la démo",
    online: "En ligne",
    aiIsTyping: "L'IA tape...",
    welcomeMessage: "👋 Bienvenue sur SmartRelocate.ai ! Je vous aiderai à comprendre vos options pour déménager en Malaisie.",
    userExampleMessage: "Je suis un ingénieur logiciel des États-Unis cherchant à déménager",
    aiResponseMessage: "Parfait ! Quelques questions pour mieux vous guider...",
    
    // Chat and interaction
    startChat: "Commencer à chatter",
    sendMessage: "Envoyer un message",
    typeMessage: "Tapez votre message...",
    chatWithAI: "Discuter avec l'IA",
    askAnything: "Demandez n'importe quoi sur le déménagement en Malaisie",
    
    // Email and contact
    stayUpdated: "Restez à jour",
    getNotified: "Soyez informé des changements de visa et des opportunités",
    subscribeNewsletter: "S'abonner à la newsletter",
    enterEmailAddress: "Entrez votre adresse e-mail",
    subscribe: "S'abonner",
    
    // Footer
    smartRelocateDescription: "Assistant de relocalisation alimenté par l'IA aidant les professionnels de la technologie et les nomades numériques à déménager en Malaisie en toute confiance.",
    quickLinks: "Liens rapides",
    support: "Support",
    legal: "Légal",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions de service",
    followUs: "Suivez-nous",
    allRightsReserved: "Tous droits réservés."
  },

  ar: {
    // Common UI
    loading: "جاري التحميل",
    error: "خطأ",
    submit: "إرسال",
    cancel: "إلغاء",
    continue: "متابعة",
    back: "رجوع",
    next: "التالي",
    
    // Navigation
    home: "الرئيسية",
    about: "حول",
    contact: "اتصل بنا",
    
    // Hero Section
    heroTitle: "مساعد الانتقال الذكي بالذكاء الاصطناعي",
    heroSubtitle: "دليلك الشخصي للانتقال إلى ماليزيا",
    heroDescription: "احصل على إرشادات مخصصة حول التأشيرات والتكاليف وخطوات الانتقال المصممة خصيصاً للعاملين في التكنولوجيا والرحالة الرقميين.",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",
    
    // How It Works
    howItWorksTitle: "كيف يعمل SmartRelocate",
    step1Title: "1. تقييم الأهلية",
    step1Description: "أكمل تقييمنا المنظم المكون من 4 خطوات يغطي جنسيتك ومهنتك ومستوى دخلك ووضعك العائلي",
    step2Title: "2. مطابقة التأشيرات",
    step2Description: "احصل على توصيات تأشيرات مخصصة مع درجات الأهلية وأوقات المعالجة وتقديرات التكلفة لماليزيا",
    step3Title: "3. الدليل المتميز",
    step3Description: "اشترِ دليلنا الشامل بـ 19 دولاراً PDF مع قوائم تفصيلية وجداول زمنية وتعليمات خطوة بخطوة للانتقال",
    step4Title: "4. التنفيذ",
    step4Description: "نفذ خطة انتقالك مع دعم الخبراء ومساعدة الوثائق والإرشاد المستمر",
    
    // Visa Types
    visaTypesTitle: "فئات التأشيرات الشائعة",
    visaTypesDescription: "استكشف المسارات الأكثر شيوعاً للعاملين في التكنولوجيا والرحالة الرقميين",
    deRantauTitle: "تصريح DE Rantau",
    deRantauDescription: "مثالي للعاملين عن بُعد والرحالة الرقميين. اعمل من ماليزيا بينما تعمل لشركات خارجية.",
    mm2hTitle: "برنامج MM2H",
    mm2hDescription: "برنامج ماليزيا وطني الثاني للباحثين عن الإقامة طويلة الأمد مع مزايا عائلية.",
    employmentPassTitle: "تصريح العمل",
    employmentPassDescription: "تأشيرة العمل التقليدية للمهنيين الذين لديهم عروض عمل من شركات ماليزية.",
    
    // Relocation Wizard
    wizardTitle: "معالج الانتقال",
    wizardSubtitle: "احصل على توصيات مخصصة في دقائق",
    locationStep: "الموقع",
    profileStep: "الملف الشخصي",
    preferencesStep: "التفضيلات",
    resultsStep: "النتائج",
    
    // Forms
    nationality: "الجنسية",
    age: "العمر",
    profession: "المهنة",
    experience: "سنوات الخبرة",
    income: "الدخل السنوي (بالدولار الأمريكي)",
    familyStatus: "الحالة العائلية",
    education: "التعليم",
    languageSkills: "المهارات اللغوية",
    
    // Family Status Options
    single: "أعزب",
    married: "متزوج",
    marriedWithChildren: "متزوج مع أطفال",
    
    // Education Options
    highSchool: "الثانوية العامة",
    bachelor: "بكالوريوس",
    master: "ماجستير",
    phd: "دكتوراه",
    
    // Results
    eligibilityScore: "درجة الأهلية",
    processingTime: "وقت المعالجة",
    estimatedCost: "التكلفة المقدرة",
    requirements: "المتطلبات",
    recommendations: "التوصيات",
    
    // Pricing
    pricing: "التسعير",
    freePlan: "خطة مجانية",
    starterPlan: "خطة المبتدئين",
    proPlan: "خطة المحترفين",
    premiumPlan: "خطة المتميزة",
    
    // Countries (focused on African countries for SmartRelocate)
    algeria: "الجزائر",
    morocco: "المغرب",
    tunisia: "تونس",
    egypt: "مصر",
    southAfrica: "جنوب أفريقيا",
    nigeria: "نيجيريا",
    kenya: "كينيا",
    ghana: "غانا",
    ethiopia: "إثيوبيا",
    tanzania: "تنزانيا",
    uganda: "أوغندا",
    rwanda: "رواندا",
    botswana: "بوتسوانا",
    mauritius: "موريشيوس",
    senegal: "السنغال",
    
    // Countries additional
    unitedStates: "الولايات المتحدة",
    unitedKingdom: "المملكة المتحدة",
    canada: "كندا",
    australia: "أستراليا",
    newZealand: "نيوزيلندا",
    singapore: "سنغافورة",
    japan: "اليابان",
    southKorea: "كوريا الجنوبية",
    china: "الصين",
    india: "الهند",
    thailand: "تايلاند",
    philippines: "الفلبين",
    indonesia: "إندونيسيا",
    vietnam: "فيتنام",
    malaysia: "ماليزيا",
    
    // European countries
    germany: "ألمانيا",
    france: "فرنسا",
    italy: "إيطاليا",
    spain: "إسبانيا",
    portugal: "البرتغال",
    netherlands: "هولندا",
    belgium: "بلجيكا",
    switzerland: "سويسرا",
    austria: "النمسا",
    sweden: "السويد",
    norway: "النرويج",
    denmark: "الدنمارك",
    finland: "فنلندا",
    poland: "بولندا",
    czechRepublic: "جمهورية التشيك",
    
    // Professions
    softwareEngineer: "مهندس برمجيات",
    dataScientist: "عالم بيانات",
    productManager: "مدير منتج",
    designer: "مصمم",
    marketingManager: "مدير تسويق",
    consultant: "استشاري",
    entrepreneur: "رائد أعمال",
    freelancer: "عامل حر",
    teacher: "معلم",
    doctor: "طبيب",
    engineer: "مهندس",
    lawyer: "محامي",
    accountant: "محاسب",
    other: "أخرى",
    
    // Suitability levels
    excellent: "ممتاز",
    good: "جيد",
    fair: "مقبول",
    poor: "ضعيف",
    
    // Additional UI strings for comprehensive coverage
    moveToMalaysia: "انتقل إلى ماليزيا",
    withConfidence: "بثقة",
    personalizedGuidance: "احصل على إرشادات مخصصة حول التأشيرات والتكاليف وخطوات الانتقال المصممة خصيصاً للعاملين في التكنولوجيا والرحالة الرقميين.",
    startYourJourney: "ابدأ رحلتك",
    watchDemo: "شاهد العرض التوضيحي",
    online: "متصل",
    aiIsTyping: "الذكاء الاصطناعي يكتب...",
    welcomeMessage: "👋 مرحباً بك في SmartRelocate.ai! سأساعدك في فهم خياراتك للانتقال إلى ماليزيا.",
    userExampleMessage: "أنا مهندس برمجيات من الولايات المتحدة أسعى للانتقال",
    aiResponseMessage: "رائع! بعض الأسئلة لتوجيهك بشكل أفضل...",
    
    // Chat and interaction
    startChat: "ابدأ المحادثة",
    sendMessage: "إرسال رسالة",
    typeMessage: "اكتب رسالتك...",
    chatWithAI: "تحدث مع الذكاء الاصطناعي",
    askAnything: "اسأل أي شيء عن الانتقال إلى ماليزيا",
    
    // Email and contact
    stayUpdated: "ابق محدثاً",
    getNotified: "احصل على إشعارات حول تغييرات التأشيرات والفرص",
    subscribeNewsletter: "اشترك في النشرة الإخبارية",
    enterEmailAddress: "أدخل عنوان بريدك الإلكتروني",
    subscribe: "اشترك",
    
    // Footer
    smartRelocateDescription: "مساعد انتقال مدعوم بالذكاء الاصطناعي يساعد المهنيين في التكنولوجيا والرحالة الرقميين على الانتقال إلى ماليزيا بثقة.",
    quickLinks: "روابط سريعة",
    support: "الدعم",
    legal: "قانوني",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    followUs: "تابعنا",
    allRightsReserved: "جميع الحقوق محفوظة."
  }
};

export const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "zh", name: "中文" },
  { code: "th", name: "ไทย" },
  { code: "id", name: "Indonesia" },
  { code: "ja", name: "日本語" },
  { code: "ar", name: "العربية" }
];

export function getTranslation(language: string): Translation {
  return translations[language] || translations.en;
}