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
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  learnMore: string;
  
  // How It Works
  howItWorksTitle: string;
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
}

import { additionalTranslationKeys } from "./translation-utils";

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
    heroTitle: "Your Journey to Malaysia Starts Here",
    heroSubtitle: "AI-Powered Relocation Assistant",
    heroDescription: "Get personalized visa recommendations, eligibility scoring, and step-by-step guidance for moving to Malaysia as a tech professional or digital nomad.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // How It Works
    howItWorksTitle: "How It Works",
    step1Title: "Tell Us About Yourself",
    step1Description: "Share your background, profession, and relocation goals through our intelligent questionnaire.",
    step2Title: "Get AI-Powered Analysis",
    step2Description: "Our advanced algorithms analyze your profile against Malaysia's visa requirements and policies.",
    step3Title: "Receive Personalized Recommendations",
    step3Description: "Get ranked visa options with detailed eligibility scores and improvement suggestions.",
    step4Title: "Follow Your Action Plan",
    step4Description: "Receive step-by-step guidance, document checklists, and timeline for your chosen visa path.",
    
    // Visa Types
    visaTypesTitle: "Popular Visa Types",
    visaTypesDescription: "Explore the most common visa options for professionals moving to Malaysia",
    deRantauTitle: "DE Rantau Pass",
    deRantauDescription: "Perfect for digital nomads and remote workers looking to live and work from Malaysia",
    mm2hTitle: "MM2H Programme",
    mm2hDescription: "Long-term residence program for individuals seeking to live in Malaysia with substantial assets",
    employmentPassTitle: "Employment Pass",
    employmentPassDescription: "For professionals with job offers or seeking employment opportunities in Malaysia",
    
    // Relocation Wizard
    wizardTitle: "Find Your Perfect Malaysia Visa",
    wizardSubtitle: "Get personalized recommendations with AI-powered eligibility scoring",
    locationStep: "Location",
    profileStep: "Profile",
    resultsStep: "Results",
    selectContinentTitle: "Step 1: Select Your Current Region",
    selectContinentDescription: "Choose the continent where you currently reside",
    selectCountryTitle: "Step 2: Select Your Country",
    selectCountryDescription: "Choose your current country of residence",
    continueToProfile: "Continue to Profile Assessment",
    
    // Profile Form
    profileTitle: "Your Profile Information",
    profileDescription: "Help us calculate your visa eligibility by providing accurate information about your background",
    basicInformation: "Basic Information",
    financialEmployment: "Financial & Employment",
    nationality: "Nationality",
    age: "Age",
    profession: "Profession",
    experience: "Years of Experience",
    education: "Education Level",
    annualIncome: "Annual Income (USD)",
    liquidAssets: "Liquid Assets (USD)",
    familyStatus: "Family Status",
    healthStatus: "Health Status",
    hasJobOffer: "I have a job offer in Malaysia",
    criminalRecord: "I have a criminal record",
    languageSkills: "Language Skills",
    calculateEligibility: "Calculate Visa Eligibility",
    
    // Results
    analysisTitle: "Your Personalized Visa Analysis",
    analysisDescription: "Based on your profile, here are your best visa options ranked by eligibility",
    matchScore: "Match Score",
    topStrengths: "Top Strengths",
    improvementAreas: "Improvement Areas",
    detailedBreakdown: "Detailed Breakdown",
    viewRequirements: "View Full Requirements",
    
    // Email Capture
    emailTitle: "Get Your Personalized Action Plan",
    emailDescription: "Receive a detailed PDF with your analysis results, step-by-step instructions, and timeline",
    emailPlaceholder: "Enter your email address",
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
    analysisComplete: "Analysis Complete!",
    analysisCompleteDesc: "Your visa eligibility scores have been calculated.",
    emailSuccess: "Success!",
    emailError: "Failed to capture email. Please try again.",
    invalidEmail: "Please enter a valid email address.",
    
    // Placeholders
    selectContinent: "Select your continent",
    selectCountry: "Select your country",
    selectNationality: "Select nationality",
    selectProfession: "Select profession",
    selectEducation: "Select education",
    selectFamilyStatus: "Select status",
    selectHealthStatus: "Select health status",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Enter language",
    
    // Suitability levels
    excellentFit: "Excellent Fit",
    goodFit: "Good Fit",
    fairFit: "Fair Fit",
    poorFit: "Poor Fit",
    
    // Education levels
    highSchool: "High School",
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
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
    allRightsReserved: "All rights reserved."
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
    heroTitle: "Déménagez en Malaisie",
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
  
  zh: {
    // Common UI
    loading: "加载中...",
    error: "错误",
    submit: "提交",
    cancel: "取消",
    continue: "继续",
    back: "返回",
    next: "下一步",
    
    // Navigation
    home: "首页",
    about: "关于",
    contact: "联系",
    
    // Hero Section
    heroTitle: "您的马来西亚之旅从这里开始",
    heroSubtitle: "AI驱动的移居助手",
    heroDescription: "为科技专业人士和数字游民提供个性化签证推荐、资格评分和移居马来西亚的分步指导。",
    getStarted: "开始使用",
    learnMore: "了解更多",
    
    // How It Works
    howItWorksTitle: "工作原理",
    step1Title: "告诉我们您的情况",
    step1Description: "通过我们的智能问卷分享您的背景、职业和移居目标。",
    step2Title: "获得AI分析",
    step2Description: "我们的先进算法会根据马来西亚的签证要求和政策分析您的档案。",
    step3Title: "获得个性化推荐",
    step3Description: "获得排名的签证选项，包含详细的资格评分和改进建议。",
    step4Title: "遵循您的行动计划",
    step4Description: "获得分步指导、文件清单和您选择的签证路径时间表。",
    
    // Visa Types
    visaTypesTitle: "热门签证类型",
    visaTypesDescription: "探索专业人士移居马来西亚的最常见签证选项",
    deRantauTitle: "DE Rantau通行证",
    deRantauDescription: "适合希望在马来西亚生活和工作的数字游民和远程工作者",
    mm2hTitle: "MM2H计划",
    mm2hDescription: "为拥有大量资产且寻求在马来西亚居住的个人提供的长期居留计划",
    employmentPassTitle: "就业准证",
    employmentPassDescription: "适合有工作邀请或在马来西亚寻求就业机会的专业人士",
    
    // Relocation Wizard
    wizardTitle: "找到您的完美马来西亚签证",
    wizardSubtitle: "通过AI驱动的资格评分获得个性化推荐",
    locationStep: "位置",
    profileStep: "档案",
    resultsStep: "结果",
    selectContinentTitle: "步骤1：选择您的当前地区",
    selectContinentDescription: "选择您目前居住的大陆",
    selectCountryTitle: "步骤2：选择您的国家",
    selectCountryDescription: "选择您目前的居住国家",
    continueToProfile: "继续档案评估",
    
    // Profile Form
    profileTitle: "您的档案信息",
    profileDescription: "通过提供准确的背景信息帮助我们计算您的签证资格",
    basicInformation: "基本信息",
    financialEmployment: "财务和就业",
    nationality: "国籍",
    age: "年龄",
    profession: "职业",
    experience: "工作年限",
    education: "教育水平",
    annualIncome: "年收入（美元）",
    liquidAssets: "流动资产（美元）",
    familyStatus: "家庭状况",
    healthStatus: "健康状况",
    hasJobOffer: "我在马来西亚有工作邀请",
    criminalRecord: "我有犯罪记录",
    languageSkills: "语言技能",
    calculateEligibility: "计算签证资格",
    
    // Results
    analysisTitle: "您的个性化签证分析",
    analysisDescription: "根据您的档案，以下是按资格排名的最佳签证选项",
    matchScore: "匹配分数",
    topStrengths: "主要优势",
    improvementAreas: "改进领域",
    detailedBreakdown: "详细分解",
    viewRequirements: "查看完整要求",
    
    // Email Capture
    emailTitle: "获取您的个性化行动计划",
    emailDescription: "接收包含分析结果、分步说明和时间表的详细PDF",
    emailPlaceholder: "输入您的邮箱地址",
    getActionPlan: "获取行动计划",
    
    // Common
    totalCost: "总费用",
    timeline: "时间表",
    livingCost: "生活费用",
    processingTime: "处理时间",
    eligibilityAssessment: "资格评估",
    requirements: "要求",
    benefits: "好处",
    
    // Notifications
    analysisComplete: "分析完成！",
    analysisCompleteDesc: "您的签证资格分数已计算完成。",
    emailSuccess: "成功！",
    emailError: "邮箱获取失败。请重试。",
    invalidEmail: "请输入有效的邮箱地址。",
    
    // Placeholders
    selectContinent: "选择您的大陆",
    selectCountry: "选择您的国家",
    selectNationality: "选择国籍",
    selectProfession: "选择职业",
    selectEducation: "选择教育",
    selectFamilyStatus: "选择状况",
    selectHealthStatus: "选择健康状况",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "输入语言",
    
    // Suitability levels
    excellentFit: "非常合适",
    goodFit: "合适",
    fairFit: "一般合适",
    poorFit: "不太合适",
    
    // Education levels
    highSchool: "高中",
    bachelors: "学士学位",
    masters: "硕士学位",
    phd: "博士学位",
    
    // Family status
    single: "单身",
    married: "已婚",
    marriedWithChildren: "已婚有子女",
    
    // Health status
    excellent: "优秀",
    good: "良好",
    fair: "一般",
    poor: "较差",
    
    // Additional UI strings for comprehensive coverage
    moveToMalaysia: "移居马来西亚",
    withConfidence: "满怀信心",
    personalizedGuidance: "获得专为科技工作者和数字游民量身定制的签证、费用和搬迁步骤的个性化指导。",
    startYourJourney: "开始您的旅程",
    watchDemo: "观看演示",
    online: "在线",
    aiIsTyping: "AI正在输入...",
    welcomeMessage: "👋 欢迎来到SmartRelocate.ai！我将帮助您了解移居马来西亚的选择。",
    userExampleMessage: "我是来自美国的软件工程师，希望移居",
    aiResponseMessage: "太好了！几个问题来更好地指导您...",
    
    // Chat and interaction
    startChat: "开始聊天",
    sendMessage: "发送消息",
    typeMessage: "输入您的消息...",
    chatWithAI: "与AI聊天",
    askAnything: "询问有关移居马来西亚的任何事情",
    
    // Email and contact
    stayUpdated: "保持更新",
    getNotified: "获得签证变化和机会的通知",
    subscribeNewsletter: "订阅通讯",
    enterEmailAddress: "输入您的邮箱地址",
    subscribe: "订阅",
    
    // Footer
    smartRelocateDescription: "AI驱动的移居助手，帮助科技专业人士和数字游民满怀信心地移居马来西亚。",
    quickLinks: "快速链接",
    support: "支持",
    legal: "法律",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    followUs: "关注我们",
    allRightsReserved: "版权所有。"
  },
  
  ms: {
    // Common UI
    loading: "Memuatkan...",
    error: "Ralat",
    submit: "Hantar",
    cancel: "Batal",
    continue: "Teruskan",
    back: "Kembali",
    next: "Seterusnya",
    
    // Navigation
    home: "Utama",
    about: "Tentang",
    contact: "Hubungi",
    
    // Hero Section
    heroTitle: "Perjalanan Anda ke Malaysia Bermula Di Sini",
    heroSubtitle: "Pembantu Penghijrahan Berkuasa AI",
    heroDescription: "Dapatkan cadangan visa yang dipersonalisasi, pemarkahan kelayakan, dan panduan langkah demi langkah untuk berpindah ke Malaysia sebagai profesional teknologi atau nomad digital.",
    getStarted: "Mula Sekarang",
    learnMore: "Ketahui Lebih Lanjut",
    
    // How It Works
    howItWorksTitle: "Bagaimana Ia Berfungsi",
    step1Title: "Beritahu Kami Tentang Diri Anda",
    step1Description: "Kongsi latar belakang, profesion, dan matlamat penghijrahan anda melalui soal selidik pintar kami.",
    step2Title: "Dapatkan Analisis Berkuasa AI",
    step2Description: "Algoritma canggih kami menganalisis profil anda terhadap keperluan dan dasar visa Malaysia.",
    step3Title: "Terima Cadangan Yang Dipersonalisasi",
    step3Description: "Dapatkan pilihan visa berperingkat dengan skor kelayakan terperinci dan cadangan penambahbaikan.",
    step4Title: "Ikuti Pelan Tindakan Anda",
    step4Description: "Terima panduan langkah demi langkah, senarai semak dokumen, dan garis masa untuk laluan visa pilihan anda.",
    
    // Visa Types
    visaTypesTitle: "Jenis Visa Popular",
    visaTypesDescription: "Terokai pilihan visa yang paling biasa untuk profesional yang berpindah ke Malaysia",
    deRantauTitle: "Pas DE Rantau",
    deRantauDescription: "Sesuai untuk nomad digital dan pekerja jarak jauh yang ingin tinggal dan bekerja dari Malaysia",
    mm2hTitle: "Program MM2H",
    mm2hDescription: "Program kediaman jangka panjang untuk individu yang ingin tinggal di Malaysia dengan aset yang besar",
    employmentPassTitle: "Pas Pekerjaan",
    employmentPassDescription: "Untuk profesional dengan tawaran kerja atau mencari peluang pekerjaan di Malaysia",
    
    // Relocation Wizard
    wizardTitle: "Cari Visa Malaysia Yang Sempurna Untuk Anda",
    wizardSubtitle: "Dapatkan cadangan yang dipersonalisasi dengan pemarkahan kelayakan berkuasa AI",
    locationStep: "Lokasi",
    profileStep: "Profil",
    resultsStep: "Keputusan",
    selectContinentTitle: "Langkah 1: Pilih Wilayah Semasa Anda",
    selectContinentDescription: "Pilih benua tempat anda tinggal sekarang",
    selectCountryTitle: "Langkah 2: Pilih Negara Anda",
    selectCountryDescription: "Pilih negara kediaman semasa anda",
    continueToProfile: "Teruskan ke Penilaian Profil",
    
    // Profile Form
    profileTitle: "Maklumat Profil Anda",
    profileDescription: "Bantu kami mengira kelayakan visa anda dengan memberikan maklumat yang tepat tentang latar belakang anda",
    basicInformation: "Maklumat Asas",
    financialEmployment: "Kewangan & Pekerjaan",
    nationality: "Kewarganegaraan",
    age: "Umur",
    profession: "Profesion",
    experience: "Tahun Pengalaman",
    education: "Tahap Pendidikan",
    annualIncome: "Pendapatan Tahunan (USD)",
    liquidAssets: "Aset Cair (USD)",
    familyStatus: "Status Keluarga",
    healthStatus: "Status Kesihatan",
    hasJobOffer: "Saya mempunyai tawaran kerja di Malaysia",
    criminalRecord: "Saya mempunyai rekod jenayah",
    languageSkills: "Kemahiran Bahasa",
    calculateEligibility: "Kira Kelayakan Visa",
    
    // Results
    analysisTitle: "Analisis Visa Peribadi Anda",
    analysisDescription: "Berdasarkan profil anda, berikut adalah pilihan visa terbaik anda yang disusun mengikut kelayakan",
    matchScore: "Skor Padanan",
    topStrengths: "Kekuatan Utama",
    improvementAreas: "Bidang Penambahbaikan",
    detailedBreakdown: "Pecahan Terperinci",
    viewRequirements: "Lihat Keperluan Penuh",
    
    // Email Capture
    emailTitle: "Dapatkan Pelan Tindakan Peribadi Anda",
    emailDescription: "Terima PDF terperinci dengan keputusan analisis, arahan langkah demi langkah, dan garis masa anda",
    emailPlaceholder: "Masukkan alamat e-mel anda",
    getActionPlan: "Dapatkan Pelan Tindakan",
    
    // Common
    totalCost: "Jumlah Kos",
    timeline: "Garis Masa",
    livingCost: "Kos Sara Hidup",
    processingTime: "Masa Pemprosesan",
    eligibilityAssessment: "Penilaian Kelayakan",
    requirements: "Keperluan",
    benefits: "Faedah",
    
    // Notifications
    analysisComplete: "Analisis Selesai!",
    analysisCompleteDesc: "Skor kelayakan visa anda telah dikira.",
    emailSuccess: "Berjaya!",
    emailError: "Gagal menangkap e-mel. Sila cuba lagi.",
    invalidEmail: "Sila masukkan alamat e-mel yang sah.",
    
    // Placeholders
    selectContinent: "Pilih benua anda",
    selectCountry: "Pilih negara anda",
    selectNationality: "Pilih kewarganegaraan",
    selectProfession: "Pilih profesion",
    selectEducation: "Pilih pendidikan",
    selectFamilyStatus: "Pilih status",
    selectHealthStatus: "Pilih status kesihatan",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Masukkan bahasa",
    
    // Suitability levels
    excellentFit: "Sangat Sesuai",
    goodFit: "Sesuai",
    fairFit: "Agak Sesuai",
    poorFit: "Kurang Sesuai",
    
    // Education levels
    highSchool: "Sekolah Menengah",
    bachelors: "Ijazah Sarjana Muda",
    masters: "Ijazah Sarjana",
    phd: "PhD",
    
    // Family status
    single: "Bujang",
    married: "Berkahwin",
    marriedWithChildren: "Berkahwin dengan Anak",
    
    // Health status
    excellent: "Cemerlang",
    good: "Baik",
    fair: "Sederhana",
    poor: "Lemah",
    
    // Additional UI strings for comprehensive coverage
    moveToMalaysia: "Berpindah ke Malaysia",
    withConfidence: "dengan yakin",
    personalizedGuidance: "Dapatkan panduan yang dipersonalisasi mengenai visa, kos, dan langkah pemindahan yang direka khas untuk pekerja teknologi dan nomad digital.",
    startYourJourney: "Mulakan Perjalanan Anda",
    watchDemo: "Tonton Demo",
    online: "Dalam Talian",
    aiIsTyping: "AI sedang menaip...",
    welcomeMessage: "👋 Selamat datang ke SmartRelocate.ai! Saya akan membantu anda memahami pilihan untuk berpindah ke Malaysia.",
    userExampleMessage: "Saya seorang jurutera perisian dari AS yang ingin berpindah",
    aiResponseMessage: "Hebat! Beberapa soalan untuk membimbing anda dengan lebih baik...",
    
    // Chat and interaction
    startChat: "Mula Chat",
    sendMessage: "Hantar Mesej",
    typeMessage: "Taip mesej anda...",
    chatWithAI: "Chat dengan AI",
    askAnything: "Tanya apa-apa tentang berpindah ke Malaysia",
    
    // Email and contact
    stayUpdated: "Kekal Terkini",
    getNotified: "Dapatkan pemberitahuan tentang perubahan visa dan peluang",
    subscribeNewsletter: "Langgan Surat Berita",
    enterEmailAddress: "Masukkan alamat e-mel anda",
    subscribe: "Langgan",
    
    // Footer
    smartRelocateDescription: "Pembantu pemindahan berkuasa AI membantu profesional teknologi dan nomad digital berpindah ke Malaysia dengan yakin.",
    quickLinks: "Pautan Pantas",
    support: "Sokongan",
    legal: "Undang-undang",
    privacyPolicy: "Dasar Privasi",
    termsOfService: "Syarat Perkhidmatan",
    followUs: "Ikuti Kami",
    allRightsReserved: "Hak cipta terpelihara."
  },
  
  de: {
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
    heroTitle: "Votre voyage en Malaisie commence ici",
    heroSubtitle: "Assistant de relocalisation alimenté par l'IA",
    heroDescription: "Obtenez des recommandations de visa personnalisées, un scoring d'éligibilité et des conseils étape par étape pour déménager en Malaisie en tant que professionnel de la technologie ou nomade numérique.",
    getStarted: "Commencer",
    learnMore: "En savoir plus",
    
    // How It Works
    howItWorksTitle: "Comment ça marche",
    step1Title: "Parlez-nous de vous",
    step1Description: "Partagez votre parcours, votre profession et vos objectifs de relocalisation grâce à notre questionnaire intelligent.",
    step2Title: "Obtenez une analyse alimentée par l'IA",
    step2Description: "Nos algorithmes avancés analysent votre profil par rapport aux exigences et politiques de visa de la Malaisie.",
    step3Title: "Recevez des recommandations personnalisées",
    step3Description: "Obtenez des options de visa classées avec des scores d'éligibilité détaillés et des suggestions d'amélioration.",
    step4Title: "Suivez votre plan d'action",
    step4Description: "Recevez des conseils étape par étape, des listes de documents et un calendrier pour votre parcours de visa choisi.",
    
    // Visa Types
    visaTypesTitle: "Types de visa populaires",
    visaTypesDescription: "Explorez les options de visa les plus courantes pour les professionnels déménageant en Malaisie",
    deRantauTitle: "Pass DE Rantau",
    deRantauDescription: "Parfait pour les nomades numériques et les travailleurs à distance souhaitant vivre et travailler depuis la Malaisie",
    mm2hTitle: "Programme MM2H",
    mm2hDescription: "Programme de résidence à long terme pour les individus cherchant à vivre en Malaisie avec des actifs substantiels",
    employmentPassTitle: "Permis de travail",
    employmentPassDescription: "Pour les professionnels avec des offres d'emploi ou cherchant des opportunités d'emploi en Malaisie",
    
    // Relocation Wizard
    wizardTitle: "Trouvez votre visa parfait pour la Malaisie",
    wizardSubtitle: "Obtenez des recommandations personnalisées avec un scoring d'éligibilité alimenté par l'IA",
    locationStep: "Localisation",
    profileStep: "Profil",
    resultsStep: "Résultats",
    selectContinentTitle: "Étape 1: Sélectionnez votre région actuelle",
    selectContinentDescription: "Choisissez le continent où vous résidez actuellement",
    selectCountryTitle: "Étape 2: Sélectionnez votre pays",
    selectCountryDescription: "Choisissez votre pays de résidence actuel",
    continueToProfile: "Continuer vers l'évaluation du profil",
    
    // Profile Form
    profileTitle: "Informations de votre profil",
    profileDescription: "Aidez-nous à calculer votre éligibilité de visa en fournissant des informations précises sur votre parcours",
    basicInformation: "Informations de base",
    financialEmployment: "Finances et emploi",
    nationality: "Nationalité",
    age: "Âge",
    profession: "Profession",
    experience: "Années d'expérience",
    education: "Niveau d'éducation",
    annualIncome: "Revenu annuel (USD)",
    liquidAssets: "Actifs liquides (USD)",
    familyStatus: "Statut familial",
    healthStatus: "État de santé",
    hasJobOffer: "J'ai une offre d'emploi en Malaisie",
    criminalRecord: "J'ai un casier judiciaire",
    languageSkills: "Compétences linguistiques",
    calculateEligibility: "Calculer l'éligibilité du visa",
    
    // Results
    analysisTitle: "Votre analyse de visa personnalisée",
    analysisDescription: "Basé sur votre profil, voici vos meilleures options de visa classées par éligibilité",
    matchScore: "Score de correspondance",
    topStrengths: "Principales forces",
    improvementAreas: "Domaines d'amélioration",
    detailedBreakdown: "Répartition détaillée",
    viewRequirements: "Voir les exigences complètes",
    
    // Email Capture
    emailTitle: "Obtenez votre plan d'action personnalisé",
    emailDescription: "Recevez un PDF détaillé avec vos résultats d'analyse, des instructions étape par étape et un calendrier",
    emailPlaceholder: "Entrez votre adresse e-mail",
    getActionPlan: "Obtenir le plan d'action",
    
    // Common
    totalCost: "Coût total",
    timeline: "Calendrier",
    livingCost: "Coût de la vie",
    processingTime: "Temps de traitement",
    eligibilityAssessment: "Évaluation d'éligibilité",
    requirements: "Exigences",
    benefits: "Avantages",
    
    // Notifications
    analysisComplete: "Analyse terminée !",
    analysisCompleteDesc: "Vos scores d'éligibilité de visa ont été calculés.",
    emailSuccess: "Succès !",
    emailError: "Échec de capture d'e-mail. Veuillez réessayer.",
    invalidEmail: "Veuillez entrer une adresse e-mail valide.",
    
    // Placeholders
    selectContinent: "Sélectionnez votre continent",
    selectCountry: "Sélectionnez votre pays",
    selectNationality: "Sélectionnez la nationalité",
    selectProfession: "Sélectionnez la profession",
    selectEducation: "Sélectionnez l'éducation",
    selectFamilyStatus: "Sélectionnez le statut",
    selectHealthStatus: "Sélectionnez l'état de santé",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Entrez la langue",
    
    // Suitability levels
    excellentFit: "Parfaitement adapté",
    goodFit: "Bien adapté",
    fairFit: "Moyennement adapté",
    poorFit: "Peu adapté",
    
    // Education levels
    highSchool: "École secondaire",
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
    poor: "Mauvais"
  },
  
  de: {
    // Common UI
    loading: "Laden...",
    error: "Fehler",
    submit: "Senden",
    cancel: "Abbrechen",
    continue: "Weiter",
    back: "Zurück",
    next: "Weiter",
    
    // Navigation
    home: "Startseite",
    about: "Über uns",
    contact: "Kontakt",
    
    // Hero Section
    heroTitle: "Ihre Reise nach Malaysia beginnt hier",
    heroSubtitle: "KI-gestützter Umzugsassistent",
    heroDescription: "Erhalten Sie personalisierte Visa-Empfehlungen, Berechtigungsbewertungen und schrittweise Anleitungen für den Umzug nach Malaysia als Technologie-Profi oder digitaler Nomade.",
    getStarted: "Loslegen",
    learnMore: "Mehr erfahren",
    
    // How It Works
    howItWorksTitle: "Wie es funktioniert",
    step1Title: "Erzählen Sie uns von sich",
    step1Description: "Teilen Sie Ihren Hintergrund, Beruf und Umzugsziele über unseren intelligenten Fragebogen mit.",
    step2Title: "Erhalten Sie KI-gestützte Analyse",
    step2Description: "Unsere fortschrittlichen Algorithmen analysieren Ihr Profil gegen Malaysias Visa-Anforderungen und -Richtlinien.",
    step3Title: "Erhalten Sie personalisierte Empfehlungen",
    step3Description: "Erhalten Sie bewertete Visa-Optionen mit detaillierten Berechtigungswerten und Verbesserungsvorschlägen.",
    step4Title: "Folgen Sie Ihrem Aktionsplan",
    step4Description: "Erhalten Sie schrittweise Anleitungen, Dokumentenchecklisten und Zeitpläne für Ihren gewählten Visa-Weg.",
    
    // Visa Types
    visaTypesTitle: "Beliebte Visa-Typen",
    visaTypesDescription: "Erkunden Sie die häufigsten Visa-Optionen für Fachkräfte, die nach Malaysia ziehen",
    deRantauTitle: "DE Rantau Pass",
    deRantauDescription: "Perfekt für digitale Nomaden und Remote-Arbeiter, die in Malaysia leben und arbeiten möchten",
    mm2hTitle: "MM2H Programm",
    mm2hDescription: "Langzeitaufenthaltsprogramm für Personen, die in Malaysia mit erheblichen Vermögenswerten leben möchten",
    employmentPassTitle: "Arbeitserlaubnis",
    employmentPassDescription: "Für Fachkräfte mit Stellenangeboten oder die Beschäftigungsmöglichkeiten in Malaysia suchen",
    
    // Relocation Wizard
    wizardTitle: "Finden Sie Ihr perfektes Malaysia-Visum",
    wizardSubtitle: "Erhalten Sie personalisierte Empfehlungen mit KI-gestützter Berechtigungsbewertung",
    locationStep: "Standort",
    profileStep: "Profil",
    resultsStep: "Ergebnisse",
    selectContinentTitle: "Schritt 1: Wählen Sie Ihre aktuelle Region",
    selectContinentDescription: "Wählen Sie den Kontinent, auf dem Sie derzeit wohnen",
    selectCountryTitle: "Schritt 2: Wählen Sie Ihr Land",
    selectCountryDescription: "Wählen Sie Ihr aktuelles Wohnsitzland",
    continueToProfile: "Weiter zur Profilbewertung",
    
    // Profile Form
    profileTitle: "Ihre Profilinformationen",
    profileDescription: "Helfen Sie uns, Ihre Visa-Berechtigung zu berechnen, indem Sie genaue Informationen über Ihren Hintergrund bereitstellen",
    basicInformation: "Grundinformationen",
    financialEmployment: "Finanzen und Beschäftigung",
    nationality: "Staatsangehörigkeit",
    age: "Alter",
    profession: "Beruf",
    experience: "Jahre Erfahrung",
    education: "Bildungsniveau",
    annualIncome: "Jahreseinkommen (USD)",
    liquidAssets: "Liquide Vermögenswerte (USD)",
    familyStatus: "Familienstand",
    healthStatus: "Gesundheitszustand",
    hasJobOffer: "Ich habe ein Stellenangebot in Malaysia",
    criminalRecord: "Ich habe ein Vorstrafenregister",
    languageSkills: "Sprachkenntnisse",
    calculateEligibility: "Visa-Berechtigung berechnen",
    
    // Results
    analysisTitle: "Ihre personalisierte Visa-Analyse",
    analysisDescription: "Basierend auf Ihrem Profil sind hier Ihre besten Visa-Optionen nach Berechtigung geordnet",
    matchScore: "Übereinstimmungswert",
    topStrengths: "Hauptstärken",
    improvementAreas: "Verbesserungsbereiche",
    detailedBreakdown: "Detaillierte Aufschlüsselung",
    viewRequirements: "Vollständige Anforderungen anzeigen",
    
    // Email Capture
    emailTitle: "Erhalten Sie Ihren personalisierten Aktionsplan",
    emailDescription: "Erhalten Sie ein detailliertes PDF mit Ihren Analyseergebnissen, schrittweisen Anweisungen und Zeitplan",
    emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
    getActionPlan: "Aktionsplan erhalten",
    
    // Common
    totalCost: "Gesamtkosten",
    timeline: "Zeitplan",
    livingCost: "Lebenshaltungskosten",
    processingTime: "Bearbeitungszeit",
    eligibilityAssessment: "Berechtigungsbewertung",
    requirements: "Anforderungen",
    benefits: "Vorteile",
    
    // Notifications
    analysisComplete: "Analyse abgeschlossen!",
    analysisCompleteDesc: "Ihre Visa-Berechtigungswerte wurden berechnet.",
    emailSuccess: "Erfolg!",
    emailError: "E-Mail-Erfassung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    
    // Placeholders
    selectContinent: "Wählen Sie Ihren Kontinent",
    selectCountry: "Wählen Sie Ihr Land",
    selectNationality: "Staatsangehörigkeit wählen",
    selectProfession: "Beruf wählen",
    selectEducation: "Bildung wählen",
    selectFamilyStatus: "Status wählen",
    selectHealthStatus: "Gesundheitszustand wählen",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Sprache eingeben",
    
    // Suitability levels
    excellentFit: "Ausgezeichnet geeignet",
    goodFit: "Gut geeignet",
    fairFit: "Mäßig geeignet",
    poorFit: "Wenig geeignet",
    
    // Education levels
    highSchool: "Gymnasium",
    bachelors: "Bachelor",
    masters: "Master",
    phd: "Promotion",
    
    // Family status
    single: "Ledig",
    married: "Verheiratet",
    marriedWithChildren: "Verheiratet mit Kindern",
    
    // Health status
    excellent: "Ausgezeichnet",
    good: "Gut",
    fair: "Ordentlich",
    poor: "Schlecht"
  },
  
  it: {
    // Common UI
    loading: "Caricamento...",
    error: "Errore",
    submit: "Invia",
    cancel: "Annulla",
    continue: "Continua",
    back: "Indietro",
    next: "Avanti",
    
    // Navigation
    home: "Home",
    about: "Chi siamo",
    contact: "Contatti",
    
    // Hero Section
    heroTitle: "Il tuo viaggio in Malaysia inizia qui",
    heroSubtitle: "Assistente per il trasferimento alimentato dall'IA",
    heroDescription: "Ottieni raccomandazioni personalizzate per i visti, punteggi di idoneità e guida passo-passo per trasferirti in Malaysia come professionista tech o nomade digitale.",
    getStarted: "Inizia",
    learnMore: "Scopri di più",
    
    // How It Works
    howItWorksTitle: "Come funziona",
    step1Title: "Parlaci di te",
    step1Description: "Condividi il tuo background, professione e obiettivi di trasferimento attraverso il nostro questionario intelligente.",
    step2Title: "Ottieni analisi alimentata dall'IA",
    step2Description: "I nostri algoritmi avanzati analizzano il tuo profilo contro i requisiti e le politiche dei visti della Malaysia.",
    step3Title: "Ricevi raccomandazioni personalizzate",
    step3Description: "Ottieni opzioni di visto classificate con punteggi di idoneità dettagliati e suggerimenti per miglioramenti.",
    step4Title: "Segui il tuo piano d'azione",
    step4Description: "Ricevi guida passo-passo, liste di controllo documenti e cronologia per il percorso del visto scelto.",
    
    // Visa Types
    visaTypesTitle: "Tipi di visto popolari",
    visaTypesDescription: "Esplora le opzioni di visto più comuni per i professionisti che si trasferiscono in Malaysia",
    deRantauTitle: "Pass DE Rantau",
    deRantauDescription: "Perfetto per nomadi digitali e lavoratori remoti che vogliono vivere e lavorare dalla Malaysia",
    mm2hTitle: "Programma MM2H",
    mm2hDescription: "Programma di residenza a lungo termine per individui che cercano di vivere in Malaysia con beni sostanziali",
    employmentPassTitle: "Permesso di lavoro",
    employmentPassDescription: "Per professionisti con offerte di lavoro o che cercano opportunità di impiego in Malaysia",
    
    // Relocation Wizard
    wizardTitle: "Trova il tuo visto perfetto per la Malaysia",
    wizardSubtitle: "Ottieni raccomandazioni personalizzate con punteggi di idoneità alimentati dall'IA",
    locationStep: "Posizione",
    profileStep: "Profilo",
    resultsStep: "Risultati",
    selectContinentTitle: "Passo 1: Seleziona la tua regione attuale",
    selectContinentDescription: "Scegli il continente dove risiedi attualmente",
    selectCountryTitle: "Passo 2: Seleziona il tuo paese",
    selectCountryDescription: "Scegli il tuo paese di residenza attuale",
    continueToProfile: "Continua alla valutazione del profilo",
    
    // Profile Form
    profileTitle: "Le tue informazioni del profilo",
    profileDescription: "Aiutaci a calcolare la tua idoneità al visto fornendo informazioni accurate sul tuo background",
    basicInformation: "Informazioni di base",
    financialEmployment: "Finanze e impiego",
    nationality: "Nazionalità",
    age: "Età",
    profession: "Professione",
    experience: "Anni di esperienza",
    education: "Livello di istruzione",
    annualIncome: "Reddito annuale (USD)",
    liquidAssets: "Beni liquidi (USD)",
    familyStatus: "Stato familiare",
    healthStatus: "Stato di salute",
    hasJobOffer: "Ho un'offerta di lavoro in Malaysia",
    criminalRecord: "Ho precedenti penali",
    languageSkills: "Competenze linguistiche",
    calculateEligibility: "Calcola idoneità al visto",
    
    // Results
    analysisTitle: "La tua analisi personalizzata del visto",
    analysisDescription: "Basato sul tuo profilo, ecco le tue migliori opzioni di visto classificate per idoneità",
    matchScore: "Punteggio di corrispondenza",
    topStrengths: "Principali punti di forza",
    improvementAreas: "Aree di miglioramento",
    detailedBreakdown: "Dettaglio analitico",
    viewRequirements: "Visualizza requisiti completi",
    
    // Email Capture
    emailTitle: "Ottieni il tuo piano d'azione personalizzato",
    emailDescription: "Ricevi un PDF dettagliato con i risultati della tua analisi, istruzioni passo-passo e cronologia",
    emailPlaceholder: "Inserisci il tuo indirizzo email",
    getActionPlan: "Ottieni piano d'azione",
    
    // Common
    totalCost: "Costo totale",
    timeline: "Cronologia",
    livingCost: "Costo della vita",
    processingTime: "Tempo di elaborazione",
    eligibilityAssessment: "Valutazione idoneità",
    requirements: "Requisiti",
    benefits: "Benefici",
    
    // Notifications
    analysisComplete: "Analisi completata!",
    analysisCompleteDesc: "I tuoi punteggi di idoneità al visto sono stati calcolati.",
    emailSuccess: "Successo!",
    emailError: "Acquisizione email fallita. Riprova.",
    invalidEmail: "Inserisci un indirizzo email valido.",
    
    // Placeholders
    selectContinent: "Seleziona il tuo continente",
    selectCountry: "Seleziona il tuo paese",
    selectNationality: "Seleziona nazionalità",
    selectProfession: "Seleziona professione",
    selectEducation: "Seleziona istruzione",
    selectFamilyStatus: "Seleziona stato",
    selectHealthStatus: "Seleziona stato di salute",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Inserisci lingua",
    
    // Suitability levels
    excellentFit: "Perfettamente adatto",
    goodFit: "Adatto",
    fairFit: "Moderatamente adatto",
    poorFit: "Poco adatto",
    
    // Education levels
    highSchool: "Scuola superiore",
    bachelors: "Laurea triennale",
    masters: "Laurea magistrale",
    phd: "Dottorato",
    
    // Family status
    single: "Single",
    married: "Sposato/a",
    marriedWithChildren: "Sposato/a con figli",
    
    // Health status
    excellent: "Eccellente",
    good: "Buono",
    fair: "Discreto",
    poor: "Scarso"
  },
  
  es: {
    // Common UI
    loading: "Cargando...",
    error: "Error",
    submit: "Enviar",
    cancel: "Cancelar",
    continue: "Continuar",
    back: "Atrás",
    next: "Siguiente",
    
    // Navigation
    home: "Inicio",
    about: "Acerca de",
    contact: "Contacto",
    
    // Hero Section
    heroTitle: "Tu viaje a Malasia comienza aquí",
    heroSubtitle: "Asistente de reubicación impulsado por IA",
    heroDescription: "Obtén recomendaciones personalizadas de visa, puntuación de elegibilidad y orientación paso a paso para mudarte a Malasia como profesional tecnológico o nómada digital.",
    getStarted: "Comenzar",
    learnMore: "Saber más",
    
    // How It Works
    howItWorksTitle: "Cómo funciona",
    step1Title: "Cuéntanos sobre ti",
    step1Description: "Comparte tu experiencia, profesión y objetivos de reubicación a través de nuestro cuestionario inteligente.",
    step2Title: "Obtén análisis impulsado por IA",
    step2Description: "Nuestros algoritmos avanzados analizan tu perfil contra los requisitos y políticas de visa de Malasia.",
    step3Title: "Recibe recomendaciones personalizadas",
    step3Description: "Obtén opciones de visa clasificadas con puntuaciones de elegibilidad detalladas y sugerencias de mejora.",
    step4Title: "Sigue tu plan de acción",
    step4Description: "Recibe orientación paso a paso, listas de verificación de documentos y cronograma para tu ruta de visa elegida.",
    
    // Visa Types
    visaTypesTitle: "Tipos de visa populares",
    visaTypesDescription: "Explora las opciones de visa más comunes para profesionales que se mudan a Malasia",
    deRantauTitle: "Pase DE Rantau",
    deRantauDescription: "Perfecto para nómadas digitales y trabajadores remotos que buscan vivir y trabajar desde Malasia",
    mm2hTitle: "Programa MM2H",
    mm2hDescription: "Programa de residencia a largo plazo para individuos que buscan vivir en Malasia con activos sustanciales",
    employmentPassTitle: "Permiso de trabajo",
    employmentPassDescription: "Para profesionales con ofertas de trabajo o que buscan oportunidades de empleo en Malasia",
    
    // Relocation Wizard
    wizardTitle: "Encuentra tu visa perfecta para Malasia",
    wizardSubtitle: "Obtén recomendaciones personalizadas con puntuación de elegibilidad impulsada por IA",
    locationStep: "Ubicación",
    profileStep: "Perfil",
    resultsStep: "Resultados",
    selectContinentTitle: "Paso 1: Selecciona tu región actual",
    selectContinentDescription: "Elige el continente donde resides actualmente",
    selectCountryTitle: "Paso 2: Selecciona tu país",
    selectCountryDescription: "Elige tu país de residencia actual",
    continueToProfile: "Continuar a la evaluación del perfil",
    
    // Profile Form
    profileTitle: "Tu información de perfil",
    profileDescription: "Ayúdanos a calcular tu elegibilidad de visa proporcionando información precisa sobre tu experiencia",
    basicInformation: "Información básica",
    financialEmployment: "Finanzas y empleo",
    nationality: "Nacionalidad",
    age: "Edad",
    profession: "Profesión",
    experience: "Años de experiencia",
    education: "Nivel de educación",
    annualIncome: "Ingresos anuales (USD)",
    liquidAssets: "Activos líquidos (USD)",
    familyStatus: "Estado familiar",
    healthStatus: "Estado de salud",
    hasJobOffer: "Tengo una oferta de trabajo en Malasia",
    criminalRecord: "Tengo antecedentes penales",
    languageSkills: "Habilidades lingüísticas",
    calculateEligibility: "Calcular elegibilidad de visa",
    
    // Results
    analysisTitle: "Tu análisis personalizado de visa",
    analysisDescription: "Basado en tu perfil, aquí están tus mejores opciones de visa clasificadas por elegibilidad",
    matchScore: "Puntuación de coincidencia",
    topStrengths: "Principales fortalezas",
    improvementAreas: "Áreas de mejora",
    detailedBreakdown: "Desglose detallado",
    viewRequirements: "Ver requisitos completos",
    
    // Email Capture
    emailTitle: "Obtén tu plan de acción personalizado",
    emailDescription: "Recibe un PDF detallado con tus resultados de análisis, instrucciones paso a paso y cronograma",
    emailPlaceholder: "Ingresa tu dirección de correo electrónico",
    getActionPlan: "Obtener plan de acción",
    
    // Common
    totalCost: "Costo total",
    timeline: "Cronograma",
    livingCost: "Costo de vida",
    processingTime: "Tiempo de procesamiento",
    eligibilityAssessment: "Evaluación de elegibilidad",
    requirements: "Requisitos",
    benefits: "Beneficios",
    
    // Notifications
    analysisComplete: "¡Análisis completado!",
    analysisCompleteDesc: "Tus puntuaciones de elegibilidad de visa han sido calculadas.",
    emailSuccess: "¡Éxito!",
    emailError: "Error al capturar correo electrónico. Inténtalo de nuevo.",
    invalidEmail: "Por favor ingresa una dirección de correo electrónico válida.",
    
    // Placeholders
    selectContinent: "Selecciona tu continente",
    selectCountry: "Selecciona tu país",
    selectNationality: "Selecciona nacionalidad",
    selectProfession: "Selecciona profesión",
    selectEducation: "Selecciona educación",
    selectFamilyStatus: "Selecciona estado",
    selectHealthStatus: "Selecciona estado de salud",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Ingresa idioma",
    
    // Suitability levels
    excellentFit: "Excelente ajuste",
    goodFit: "Buen ajuste",
    fairFit: "Ajuste regular",
    poorFit: "Ajuste deficiente",
    
    // Education levels
    highSchool: "Bachillerato",
    bachelors: "Licenciatura",
    masters: "Maestría",
    phd: "Doctorado",
    
    // Family status
    single: "Soltero/a",
    married: "Casado/a",
    marriedWithChildren: "Casado/a con hijos",
    
    // Health status
    excellent: "Excelente",
    good: "Bueno",
    fair: "Regular",
    poor: "Malo"
  },
  
  pt: {
    // Common UI
    loading: "Carregando...",
    error: "Erro",
    submit: "Enviar",
    cancel: "Cancelar",
    continue: "Continuar",
    back: "Voltar",
    next: "Próximo",
    
    // Navigation
    home: "Início",
    about: "Sobre",
    contact: "Contato",
    
    // Hero Section
    heroTitle: "Sua jornada para a Malásia começa aqui",
    heroSubtitle: "Assistente de relocação alimentado por IA",
    heroDescription: "Obtenha recomendações personalizadas de visto, pontuação de elegibilidade e orientação passo a passo para se mudar para a Malásia como profissional de tecnologia ou nômade digital.",
    getStarted: "Começar",
    learnMore: "Saiba mais",
    
    // How It Works
    howItWorksTitle: "Como funciona",
    step1Title: "Conte-nos sobre você",
    step1Description: "Compartilhe seu histórico, profissão e objetivos de relocação através do nosso questionário inteligente.",
    step2Title: "Obtenha análise alimentada por IA",
    step2Description: "Nossos algoritmos avançados analisam seu perfil contra os requisitos e políticas de visto da Malásia.",
    step3Title: "Receba recomendações personalizadas",
    step3Description: "Obtenha opções de visto classificadas com pontuações de elegibilidade detalhadas e sugestões de melhoria.",
    step4Title: "Siga seu plano de ação",
    step4Description: "Receba orientação passo a passo, listas de verificação de documentos e cronograma para seu caminho de visto escolhido.",
    
    // Visa Types
    visaTypesTitle: "Tipos de visto populares",
    visaTypesDescription: "Explore as opções de visto mais comuns para profissionais se mudando para a Malásia",
    deRantauTitle: "Passe DE Rantau",
    deRantauDescription: "Perfeito para nômades digitais e trabalhadores remotos que procuram viver e trabalhar da Malásia",
    mm2hTitle: "Programa MM2H",
    mm2hDescription: "Programa de residência de longo prazo para indivíduos que procuram viver na Malásia com ativos substanciais",
    employmentPassTitle: "Visto de trabalho",
    employmentPassDescription: "Para profissionais com ofertas de trabalho ou procurando oportunidades de emprego na Malásia",
    
    // Relocation Wizard
    wizardTitle: "Encontre seu visto perfeito para a Malásia",
    wizardSubtitle: "Obtenha recomendações personalizadas com pontuação de elegibilidade alimentada por IA",
    locationStep: "Localização",
    profileStep: "Perfil",
    resultsStep: "Resultados",
    selectContinentTitle: "Passo 1: Selecione sua região atual",
    selectContinentDescription: "Escolha o continente onde você reside atualmente",
    selectCountryTitle: "Passo 2: Selecione seu país",
    selectCountryDescription: "Escolha seu país de residência atual",
    continueToProfile: "Continuar para avaliação do perfil",
    
    // Profile Form
    profileTitle: "Suas informações de perfil",
    profileDescription: "Ajude-nos a calcular sua elegibilidade de visto fornecendo informações precisas sobre seu histórico",
    basicInformation: "Informações básicas",
    financialEmployment: "Finanças e emprego",
    nationality: "Nacionalidade",
    age: "Idade",
    profession: "Profissão",
    experience: "Anos de experiência",
    education: "Nível de educação",
    annualIncome: "Renda anual (USD)",
    liquidAssets: "Ativos líquidos (USD)",
    familyStatus: "Estado familiar",
    healthStatus: "Estado de saúde",
    hasJobOffer: "Tenho uma oferta de trabalho na Malásia",
    criminalRecord: "Tenho antecedentes criminais",
    languageSkills: "Habilidades linguísticas",
    calculateEligibility: "Calcular elegibilidade de visto",
    
    // Results
    analysisTitle: "Sua análise personalizada de visto",
    analysisDescription: "Baseado em seu perfil, aqui estão suas melhores opções de visto classificadas por elegibilidade",
    matchScore: "Pontuação de correspondência",
    topStrengths: "Principais pontos fortes",
    improvementAreas: "Áreas de melhoria",
    detailedBreakdown: "Detalhamento detalhado",
    viewRequirements: "Ver requisitos completos",
    
    // Email Capture
    emailTitle: "Obtenha seu plano de ação personalizado",
    emailDescription: "Receba um PDF detalhado com seus resultados de análise, instruções passo a passo e cronograma",
    emailPlaceholder: "Digite seu endereço de e-mail",
    getActionPlan: "Obter plano de ação",
    
    // Common
    totalCost: "Custo total",
    timeline: "Cronograma",
    livingCost: "Custo de vida",
    processingTime: "Tempo de processamento",
    eligibilityAssessment: "Avaliação de elegibilidade",
    requirements: "Requisitos",
    benefits: "Benefícios",
    
    // Notifications
    analysisComplete: "Análise concluída!",
    analysisCompleteDesc: "Suas pontuações de elegibilidade de visto foram calculadas.",
    emailSuccess: "Sucesso!",
    emailError: "Falha ao capturar e-mail. Tente novamente.",
    invalidEmail: "Por favor, digite um endereço de e-mail válido.",
    
    // Placeholders
    selectContinent: "Selecione seu continente",
    selectCountry: "Selecione seu país",
    selectNationality: "Selecione nacionalidade",
    selectProfession: "Selecione profissão",
    selectEducation: "Selecione educação",
    selectFamilyStatus: "Selecione status",
    selectHealthStatus: "Selecione estado de saúde",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Digite idioma",
    
    // Suitability levels
    excellentFit: "Excelente compatibilidade",
    goodFit: "Boa compatibilidade",
    fairFit: "Compatibilidade regular",
    poorFit: "Baixa compatibilidade",
    
    // Education levels
    highSchool: "Ensino médio",
    bachelors: "Bacharelado",
    masters: "Mestrado",
    phd: "Doutorado",
    
    // Family status
    single: "Solteiro/a",
    married: "Casado/a",
    marriedWithChildren: "Casado/a com filhos",
    
    // Health status
    excellent: "Excelente",
    good: "Bom",
    fair: "Regular",
    poor: "Ruim"
  },
  
  th: {
    // Common UI
    loading: "กำลังโหลด...",
    error: "ข้อผิดพลาด",
    submit: "ส่ง",
    cancel: "ยกเลิก",
    continue: "ดำเนินการต่อ",
    back: "กลับ",
    next: "ถัดไป",
    
    // Navigation
    home: "หน้าแรก",
    about: "เกี่ยวกับ",
    contact: "ติดต่อ",
    
    // Hero Section
    heroTitle: "การเดินทางสู่มาเลเซียของคุณเริ่มต้นที่นี่",
    heroSubtitle: "ผู้ช่วยย้ายที่อยู่อาศัยขับเคลื่อนด้วย AI",
    heroDescription: "รับคำแนะนำวีซ่าเฉพาะบุคคล คะแนนความมีสิทธิ์ และคำแนะนำทีละขั้นตอนสำหรับการย้ายไปมาเลเซียในฐานะมืออาชีพด้านเทคโนโลยีหรือดิจิทัลโนแมด",
    getStarted: "เริ่มต้น",
    learnMore: "เรียนรู้เพิ่มเติม",
    
    // How It Works
    howItWorksTitle: "วิธีการทำงาน",
    step1Title: "บอกเล่าเกี่ยวกับตัวคุณ",
    step1Description: "แบ่งปันภูมิหลัง อาชีพ และเป้าหมายการย้ายที่อยู่อาศัยผ่านแบบสอบถามอัจฉริยะของเรา",
    step2Title: "รับการวิเคราะห์ขับเคลื่อนด้วย AI",
    step2Description: "อัลกอริทึมขั้นสูงของเราวิเคราะห์โปรไฟล์ของคุณเทียบกับข้อกำหนดและนโยบายวีซ่าของมาเลเซีย",
    step3Title: "รับคำแนะนำเฉพาะบุคคล",
    step3Description: "รับตัวเลือกวีซ่าที่จัดอันดับพร้อมคะแนนความมีสิทธิ์โดยละเอียดและข้อเสนอแนะการปรับปรุง",
    step4Title: "ปฏิบัติตามแผนปฏิบัติการของคุณ",
    step4Description: "รับคำแนะนำทีละขั้นตอน รายการตรวจสอบเอกสาร และกำหนดเวลาสำหรับเส้นทางวีซ่าที่คุณเลือก",
    
    // Visa Types
    visaTypesTitle: "ประเภทวีซ่าที่นิยม",
    visaTypesDescription: "สำรวจตัวเลือกวีซ่าที่พบบ่อยที่สุดสำหรับมืออาชีพที่ย้ายไปมาเลเซีย",
    deRantauTitle: "DE Rantau Pass",
    deRantauDescription: "เหมาะสำหรับดิจิทัลโนแมดและคนทำงานระยะไกลที่ต้องการอาศัยและทำงานจากมาเลเซีย",
    mm2hTitle: "โปรแกรม MM2H",
    mm2hDescription: "โปรแกรมการอยู่อาศัยระยะยาวสำหรับบุคคลที่ต้องการอาศัยในมาเลเซียด้วยสินทรัพย์จำนวนมาก",
    employmentPassTitle: "ใบอนุญาทำงาน",
    employmentPassDescription: "สำหรับมืออาชีพที่มีข้อเสนอการทำงานหรือกำลังมองหาโอกาสการจ้างงานในมาเลเซีย",
    
    // Relocation Wizard
    wizardTitle: "ค้นหาวีซ่ามาเลเซียที่สมบูรณ์แบบของคุณ",
    wizardSubtitle: "รับคำแนะนำเฉพาะบุคคลด้วยคะแนนความมีสิทธิ์ขับเคลื่อนด้วย AI",
    locationStep: "ตำแหน่งที่ตั้ง",
    profileStep: "โปรไฟล์",
    resultsStep: "ผลลัพธ์",
    selectContinentTitle: "ขั้นตอนที่ 1: เลือกภูมิภาคปัจจุบันของคุณ",
    selectContinentDescription: "เลือกทวีปที่คุณอาศัยอยู่ในปัจจุบัน",
    selectCountryTitle: "ขั้นตอนที่ 2: เลือกประเทศของคุณ",
    selectCountryDescription: "เลือกประเทศที่อยู่อาศัยปัจจุบันของคุณ",
    continueToProfile: "ดำเนินการต่อไปยังการประเมินโปรไฟล์",
    
    // Profile Form
    profileTitle: "ข้อมูลโปรไฟล์ของคุณ",
    profileDescription: "ช่วยเราคำนวณความมีสิทธิ์วีซ่าของคุณโดยการให้ข้อมูลที่แม่นยำเกี่ยวกับภูมิหลังของคุณ",
    basicInformation: "ข้อมูลพื้นฐาน",
    financialEmployment: "การเงินและการจ้างงาน",
    nationality: "สัญชาติ",
    age: "อายุ",
    profession: "อาชีพ",
    experience: "ปีของประสบการณ์",
    education: "ระดับการศึกษา",
    annualIncome: "รายได้ต่อปี (USD)",
    liquidAssets: "สินทรัพย์สภาพคล่อง (USD)",
    familyStatus: "สถานะครอบครัว",
    healthStatus: "สถานะสุขภาพ",
    hasJobOffer: "ฉันมีข้อเสนอการทำงานในมาเลเซีย",
    criminalRecord: "ฉันมีประวัติอาชญากรรม",
    languageSkills: "ทักษะทางภาษา",
    calculateEligibility: "คำนวณความมีสิทธิ์วีซ่า",
    
    // Results
    analysisTitle: "การวิเคราะห์วีซ่าเฉพาะบุคคลของคุณ",
    analysisDescription: "อิงจากโปรไฟล์ของคุณ นี่คือตัวเลือกวีซ่าที่ดีที่สุดของคุณจัดอันดับตามความมีสิทธิ์",
    matchScore: "คะแนนการจับคู่",
    topStrengths: "จุดแข็งสูงสุด",
    improvementAreas: "พื้นที่การปรับปรุง",
    detailedBreakdown: "รายละเอียดการแบ่งย่อย",
    viewRequirements: "ดูข้อกำหนดทั้งหมด",
    
    // Email Capture
    emailTitle: "รับแผนปฏิบัติการเฉพาะบุคคลของคุณ",
    emailDescription: "รับ PDF รายละเอียดพร้อมผลการวิเคราะห์ คำแนะนำทีละขั้นตอน และกำหนดเวลาของคุณ",
    emailPlaceholder: "ป้อนที่อยู่อีเมลของคุณ",
    getActionPlan: "รับแผนปฏิบัติการ",
    
    // Common
    totalCost: "ค่าใช้จ่ายทั้งหมด",
    timeline: "กำหนดเวลา",
    livingCost: "ค่าครองชีพ",
    processingTime: "เวลาการประมวลผล",
    eligibilityAssessment: "การประเมินความมีสิทธิ์",
    requirements: "ข้อกำหนด",
    benefits: "ผลประโยชน์",
    
    // Notifications
    analysisComplete: "การวิเคราะห์เสร็จสิ้น!",
    analysisCompleteDesc: "คะแนนความมีสิทธิ์วีซ่าของคุณได้รับการคำนวณแล้ว",
    emailSuccess: "สำเร็จ!",
    emailError: "การดักจับอีเมลล้มเหลว กรุณาลองใหม่อีกครั้ง",
    invalidEmail: "กรุณาป้อนที่อยู่อีเมลที่ถูกต้อง",
    
    // Placeholders
    selectContinent: "เลือกทวีปของคุณ",
    selectCountry: "เลือกประเทศของคุณ",
    selectNationality: "เลือกสัญชาติ",
    selectProfession: "เลือกอาชีพ",
    selectEducation: "เลือกการศึกษา",
    selectFamilyStatus: "เลือกสถานะ",
    selectHealthStatus: "เลือกสถานะสุขภาพ",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "ป้อนภาษา",
    
    // Suitability levels
    excellentFit: "เหมาะสมอย่างยอดเยี่ยม",
    goodFit: "เหมาะสม",
    fairFit: "เหมาะสมปานกลาง",
    poorFit: "ไม่ค่อยเหมาะสม",
    
    // Education levels
    highSchool: "มัธยมปลาย",
    bachelors: "ปริญญาตรี",
    masters: "ปริญญาโท",
    phd: "ปริญญาเอก",
    
    // Family status
    single: "โสด",
    married: "แต่งงานแล้ว",
    marriedWithChildren: "แต่งงานแล้วมีลูก",
    
    // Health status
    excellent: "ดีเยี่ยม",
    good: "ดี",
    fair: "พอใช้",
    poor: "แย่"
  },
  
  id: {
    // Common UI
    loading: "Memuat...",
    error: "Kesalahan",
    submit: "Kirim",
    cancel: "Batal",
    continue: "Lanjutkan",
    back: "Kembali",
    next: "Selanjutnya",
    
    // Navigation
    home: "Beranda",
    about: "Tentang",
    contact: "Kontak",
    
    // Hero Section
    heroTitle: "Perjalanan Anda ke Malaysia dimulai di sini",
    heroSubtitle: "Asisten relokasi bertenaga AI",
    heroDescription: "Dapatkan rekomendasi visa yang dipersonalisasi, skor kelayakan, dan panduan langkah demi langkah untuk pindah ke Malaysia sebagai profesional teknologi atau nomad digital.",
    getStarted: "Mulai",
    learnMore: "Pelajari lebih lanjut",
    
    // How It Works
    howItWorksTitle: "Cara kerjanya",
    step1Title: "Ceritakan tentang diri Anda",
    step1Description: "Bagikan latar belakang, profesi, dan tujuan relokasi Anda melalui kuesioner cerdas kami.",
    step2Title: "Dapatkan analisis bertenaga AI",
    step2Description: "Algoritme canggih kami menganalisis profil Anda terhadap persyaratan dan kebijakan visa Malaysia.",
    step3Title: "Terima rekomendasi yang dipersonalisasi",
    step3Description: "Dapatkan opsi visa berperingkat dengan skor kelayakan terperinci dan saran perbaikan.",
    step4Title: "Ikuti rencana aksi Anda",
    step4Description: "Terima panduan langkah demi langkah, daftar periksa dokumen, dan jadwal untuk jalur visa pilihan Anda.",
    
    // Visa Types
    visaTypesTitle: "Jenis visa populer",
    visaTypesDescription: "Jelajahi opsi visa paling umum untuk profesional yang pindah ke Malaysia",
    deRantauTitle: "Pass DE Rantau",
    deRantauDescription: "Sempurna untuk nomad digital dan pekerja jarak jauh yang ingin tinggal dan bekerja dari Malaysia",
    mm2hTitle: "Program MM2H",
    mm2hDescription: "Program residensi jangka panjang untuk individu yang ingin tinggal di Malaysia dengan aset substansial",
    employmentPassTitle: "Izin kerja",
    employmentPassDescription: "Untuk profesional dengan tawaran kerja atau mencari peluang kerja di Malaysia",
    
    // Relocation Wizard
    wizardTitle: "Temukan visa Malaysia yang sempurna untuk Anda",
    wizardSubtitle: "Dapatkan rekomendasi yang dipersonalisasi dengan skor kelayakan bertenaga AI",
    locationStep: "Lokasi",
    profileStep: "Profil",
    resultsStep: "Hasil",
    selectContinentTitle: "Langkah 1: Pilih wilayah Anda saat ini",
    selectContinentDescription: "Pilih benua tempat Anda tinggal saat ini",
    selectCountryTitle: "Langkah 2: Pilih negara Anda",
    selectCountryDescription: "Pilih negara tempat tinggal Anda saat ini",
    continueToProfile: "Lanjutkan ke penilaian profil",
    
    // Profile Form
    profileTitle: "Informasi profil Anda",
    profileDescription: "Bantu kami menghitung kelayakan visa Anda dengan memberikan informasi akurat tentang latar belakang Anda",
    basicInformation: "Informasi dasar",
    financialEmployment: "Keuangan & Pekerjaan",
    nationality: "Kebangsaan",
    age: "Umur",
    profession: "Profesi",
    experience: "Tahun pengalaman",
    education: "Tingkat pendidikan",
    annualIncome: "Pendapatan tahunan (USD)",
    liquidAssets: "Aset likuid (USD)",
    familyStatus: "Status keluarga",
    healthStatus: "Status kesehatan",
    hasJobOffer: "Saya memiliki tawaran kerja di Malaysia",
    criminalRecord: "Saya memiliki catatan kriminal",
    languageSkills: "Kemampuan bahasa",
    calculateEligibility: "Hitung kelayakan visa",
    
    // Results
    analysisTitle: "Analisis visa personal Anda",
    analysisDescription: "Berdasarkan profil Anda, berikut adalah opsi visa terbaik Anda yang diurutkan berdasarkan kelayakan",
    matchScore: "Skor kecocokan",
    topStrengths: "Kekuatan utama",
    improvementAreas: "Area perbaikan",
    detailedBreakdown: "Rincian detail",
    viewRequirements: "Lihat persyaratan lengkap",
    
    // Email Capture
    emailTitle: "Dapatkan rencana aksi personal Anda",
    emailDescription: "Terima PDF terperinci dengan hasil analisis Anda, instruksi langkah demi langkah, dan jadwal",
    emailPlaceholder: "Masukkan alamat email Anda",
    getActionPlan: "Dapatkan rencana aksi",
    
    // Common
    totalCost: "Total biaya",
    timeline: "Jadwal",
    livingCost: "Biaya hidup",
    processingTime: "Waktu pemrosesan",
    eligibilityAssessment: "Penilaian kelayakan",
    requirements: "Persyaratan",
    benefits: "Keuntungan",
    
    // Notifications
    analysisComplete: "Analisis selesai!",
    analysisCompleteDesc: "Skor kelayakan visa Anda telah dihitung.",
    emailSuccess: "Berhasil!",
    emailError: "Gagal menangkap email. Silakan coba lagi.",
    invalidEmail: "Harap masukkan alamat email yang valid.",
    
    // Placeholders
    selectContinent: "Pilih benua Anda",
    selectCountry: "Pilih negara Anda",
    selectNationality: "Pilih kebangsaan",
    selectProfession: "Pilih profesi",
    selectEducation: "Pilih pendidikan",
    selectFamilyStatus: "Pilih status",
    selectHealthStatus: "Pilih status kesehatan",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "Masukkan bahasa",
    
    // Suitability levels
    excellentFit: "Sangat cocok",
    goodFit: "Cocok",
    fairFit: "Cukup cocok",
    poorFit: "Kurang cocok",
    
    // Education levels
    highSchool: "SMA",
    bachelors: "Sarjana",
    masters: "Magister",
    phd: "Doktor",
    
    // Family status
    single: "Lajang",
    married: "Menikah",
    marriedWithChildren: "Menikah dengan anak",
    
    // Health status
    excellent: "Sangat baik",
    good: "Baik",
    fair: "Cukup",
    poor: "Buruk"
  },
  
  ja: {
    // Common UI
    loading: "読み込み中...",
    error: "エラー",
    submit: "送信",
    cancel: "キャンセル",
    continue: "続行",
    back: "戻る",
    next: "次へ",
    
    // Navigation
    home: "ホーム",
    about: "About",
    contact: "お問い合わせ",
    
    // Hero Section
    heroTitle: "マレーシアへの旅がここから始まります",
    heroSubtitle: "AI搭載移住アシスタント",
    heroDescription: "テクノロジー専門家やデジタルノマドとしてマレーシアに移住するための個人向けビザ推奨、適格性スコア、ステップバイステップガイダンスを取得。",
    getStarted: "始める",
    learnMore: "詳細を見る",
    
    // How It Works
    howItWorksTitle: "仕組み",
    step1Title: "あなたについて教えてください",
    step1Description: "インテリジェントアンケートを通じて、あなたの経歴、職業、移住目標をお聞かせください。",
    step2Title: "AI搭載分析を受ける",
    step2Description: "当社の高度なアルゴリズムが、マレーシアのビザ要件とポリシーに対してあなたのプロフィールを分析します。",
    step3Title: "個人向け推奨を受ける",
    step3Description: "詳細な適格性スコアと改善提案付きのランク付けされたビザオプションを取得します。",
    step4Title: "アクションプランに従う",
    step4Description: "選択したビザルートのステップバイステップガイダンス、書類チェックリスト、タイムラインを受け取ります。",
    
    // Visa Types
    visaTypesTitle: "人気のビザタイプ",
    visaTypesDescription: "マレーシアに移住する専門家のための最も一般的なビザオプションを探索",
    deRantauTitle: "DE Rantauパス",
    deRantauDescription: "マレーシアから住んで働きたいデジタルノマドやリモートワーカーに最適",
    mm2hTitle: "MM2Hプログラム",
    mm2hDescription: "相当な資産を持ってマレーシアに住むことを求める個人のための長期居住プログラム",
    employmentPassTitle: "就労許可証",
    employmentPassDescription: "求人オファーを持つ専門家やマレーシアでの就職機会を求める人のため",
    
    // Relocation Wizard
    wizardTitle: "完璧なマレーシアビザを見つける",
    wizardSubtitle: "AI搭載適格性スコアによる個人向け推奨を取得",
    locationStep: "場所",
    profileStep: "プロフィール",
    resultsStep: "結果",
    selectContinentTitle: "ステップ1：現在の地域を選択",
    selectContinentDescription: "現在お住まいの大陸を選択してください",
    selectCountryTitle: "ステップ2：国を選択",
    selectCountryDescription: "現在の居住国を選択してください",
    continueToProfile: "プロフィール評価に進む",
    
    // Profile Form
    profileTitle: "あなたのプロフィール情報",
    profileDescription: "あなたの経歴に関する正確な情報を提供して、ビザの適格性を計算するのを手伝ってください",
    basicInformation: "基本情報",
    financialEmployment: "財務と雇用",
    nationality: "国籍",
    age: "年齢",
    profession: "職業",
    experience: "経験年数",
    education: "教育レベル",
    annualIncome: "年収（USD）",
    liquidAssets: "流動資産（USD）",
    familyStatus: "家族状況",
    healthStatus: "健康状態",
    hasJobOffer: "マレーシアで仕事のオファーがあります",
    criminalRecord: "犯罪歴があります",
    languageSkills: "語学スキル",
    calculateEligibility: "ビザ適格性を計算",
    
    // Results
    analysisTitle: "あなたの個人向けビザ分析",
    analysisDescription: "あなたのプロフィールに基づいて、適格性順にランク付けされた最適なビザオプションです",
    matchScore: "マッチスコア",
    topStrengths: "主な強み",
    improvementAreas: "改善領域",
    detailedBreakdown: "詳細な内訳",
    viewRequirements: "完全な要件を表示",
    
    // Email Capture
    emailTitle: "個人向けアクションプランを取得",
    emailDescription: "分析結果、ステップバイステップの指示、タイムライン付きの詳細PDFを受け取る",
    emailPlaceholder: "メールアドレスを入力",
    getActionPlan: "アクションプランを取得",
    
    // Common
    totalCost: "総費用",
    timeline: "タイムライン",
    livingCost: "生活費",
    processingTime: "処理時間",
    eligibilityAssessment: "適格性評価",
    requirements: "要件",
    benefits: "メリット",
    
    // Notifications
    analysisComplete: "分析完了！",
    analysisCompleteDesc: "あなたのビザ適格性スコアが計算されました。",
    emailSuccess: "成功！",
    emailError: "メールキャプチャに失敗しました。もう一度お試しください。",
    invalidEmail: "有効なメールアドレスを入力してください。",
    
    // Placeholders
    selectContinent: "大陸を選択",
    selectCountry: "国を選択",
    selectNationality: "国籍を選択",
    selectProfession: "職業を選択",
    selectEducation: "教育を選択",
    selectFamilyStatus: "状況を選択",
    selectHealthStatus: "健康状態を選択",
    enterAge: "25",
    enterExperience: "3",
    enterIncome: "75000",
    enterAssets: "50000",
    enterLanguage: "言語を入力",
    
    // Suitability levels
    excellentFit: "非常に適している",
    goodFit: "適している",
    fairFit: "まあまあ適している",
    poorFit: "あまり適していない",
    
    // Education levels
    highSchool: "高校",
    bachelors: "学士号",
    masters: "修士号",
    phd: "博士号",
    
    // Family status
    single: "独身",
    married: "既婚",
    marriedWithChildren: "子供のいる既婚",
    
    // Health status
    excellent: "優秀",
    good: "良好",
    fair: "普通",
    poor: "悪い"
  }
};

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' }
];

export function getTranslation(language: string): Translation {
  return translations[language] || translations.en;
}