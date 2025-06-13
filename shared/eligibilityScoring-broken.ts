export interface UserProfile {
  nationality: string;
  age: number;
  profession: string;
  experience: number; // years
  income: number; // USD annually
  familyStatus: 'single' | 'married' | 'married_with_children';
  education: 'high_school' | 'bachelor' | 'master' | 'phd';
  languageSkills: string[]; // ['english', 'malay', etc.]
  assets: number; // USD liquid assets
  hasJobOffer: boolean;
  criminalRecord: boolean;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface VisaEligibilityResult {
  visa: string;
  score: number;
  suitability: 'excellent' | 'good' | 'fair' | 'poor';
  breakdown: { [criterion: string]: { score: number; maxScore: number; reason: string } };
  recommendations: string[];
  primaryReasons: string[];
}

export class EligibilityScorer {
  static getSmartVisaRecommendations(profile: UserProfile): {
    recommendations: VisaEligibilityResult[];
    bestMatch: VisaEligibilityResult | null;
  } {
    const recommendations: VisaEligibilityResult[] = [];

    // DE Rantau Pass - Digital nomads and remote tech professionals
    // Requirements: Minimum USD 24,000 annual income, non-Malaysian company employment
    const deRantauScore = this.calculateDeRantauScore(profile);
    if (deRantauScore.score > 30) {
      recommendations.push({
        visa: 'DE Rantau Pass',
        score: deRantauScore.score,
        suitability: deRantauScore.score >= 80 ? 'excellent' : deRantauScore.score >= 60 ? 'good' : 'fair',
        breakdown: deRantauScore.breakdown,
        recommendations: deRantauScore.recommendations,
        primaryReasons: deRantauScore.primaryReasons
      });
    }

    // MM2H Programme - High net worth individuals and retirees
    // Requirements: RM 1.5M liquid assets, RM 40K monthly income, RM 1M fixed deposit
    const mm2hScore = this.calculateMM2HScore(profile);
    if (mm2hScore.score > 20) {
      recommendations.push({
        visa: 'MM2H Programme',
        score: mm2hScore.score,
        suitability: mm2hScore.score >= 80 ? 'excellent' : mm2hScore.score >= 60 ? 'good' : 'fair',
        breakdown: mm2hScore.breakdown,
        recommendations: mm2hScore.recommendations,
        primaryReasons: mm2hScore.primaryReasons
      });
    }

    // Labuan Director Visa - Entrepreneurs and business owners
    // Requirements: Labuan company setup, director position, RM 10K monthly salary
    const labuanScore = this.calculateLabuanDirectorScore(profile);
    if (labuanScore.score > 25) {
      recommendations.push({
        visa: 'Labuan Director Visa',
        score: labuanScore.score,
        suitability: labuanScore.score >= 80 ? 'excellent' : labuanScore.score >= 60 ? 'good' : 'fair',
        breakdown: labuanScore.breakdown,
        recommendations: labuanScore.recommendations,
        primaryReasons: labuanScore.primaryReasons
      });
    }

    // Sort by score
    recommendations.sort((a, b) => b.score - a.score);

    return {
      recommendations,
      bestMatch: recommendations.length > 0 ? recommendations[0] : null
    };
  }

  private static calculateDeRantauScore(profile: UserProfile) {
    let score = 0;
    const breakdown: any = {};
    const recommendations: string[] = [];
    const primaryReasons: string[] = [];

    // Income requirement: USD 24,000 minimum
    const incomeScore = profile.income >= 24000 ? 30 : Math.max(0, (profile.income / 24000) * 30);
    breakdown.income = {
      score: Math.round(incomeScore),
      maxScore: 30,
      reason: profile.income >= 24000 
        ? `Income meets DE Rantau requirement ($${(profile.income || 0).toLocaleString()} USD ≥ $24,000)`
        : `Income below requirement ($${(profile.income || 0).toLocaleString()} USD < $24,000 required)`
    };
    score += incomeScore;

    if ((profile.income || 0) < 24000) {
      recommendations.push(`Increase annual income to at least $24,000 USD to qualify for DE Rantau Pass`);
    } else {
      primaryReasons.push(`Income of $${(profile.income || 0).toLocaleString()} meets DE Rantau minimum requirement`);
    }

    // Profession suitability for digital nomads
    const techProfessions = ['consultant', 'developer', 'engineer', 'designer', 'manager', 'analyst', 'freelancer'];
    const isProfessionSuitable = techProfessions.some(prof => 
      profile.profession.toLowerCase().includes(prof)
    );
    const professionScore = isProfessionSuitable ? 25 : 10;
    breakdown.profession = {
      score: professionScore,
      maxScore: 25,
      reason: isProfessionSuitable 
        ? `${profile.profession} is ideal for remote work and digital nomad lifestyle`
        : `${profile.profession} may require additional documentation for remote work eligibility`
    };
    score += professionScore;

    if (isProfessionSuitable) {
      primaryReasons.push(`${profile.profession} is well-suited for DE Rantau Pass`);
    }

    // Experience and education
    const experienceScore = Math.min(20, profile.experience * 2.5);
    breakdown.experience = {
      score: Math.round(experienceScore),
      maxScore: 20,
      reason: `${profile.experience} years of professional experience`
    };
    score += experienceScore;

    const educationScore = profile.education === 'master' || profile.education === 'phd' ? 15 : 
                          profile.education === 'bachelor' ? 12 : 8;
    breakdown.education = {
      score: educationScore,
      maxScore: 15,
      reason: `${profile.education.replace('_', ' ')} level education`
    };
    score += educationScore;

    // Language skills (English important for remote work)
    const hasEnglish = profile.languageSkills.includes('english');
    const languageScore = hasEnglish ? 10 : 5;
    breakdown.language = {
      score: languageScore,
      maxScore: 10,
      reason: hasEnglish ? 'English proficiency supports remote work' : 'English skills recommended for international remote work'
    };
    score += languageScore;

    if (!hasEnglish) {
      recommendations.push('Improve English language skills for better remote work opportunities');
    }

    return {
      score: Math.round(score),
      breakdown,
      recommendations,
      primaryReasons
    };
  }

  private static calculateMM2HScore(profile: UserProfile) {
    let score = 0;
    const breakdown: any = {};
    const recommendations: string[] = [];
    const primaryReasons: string[] = [];

    // Convert USD to MYR (approximate rate: 1 USD = 4.7 MYR)
    const usdToMyr = 4.7;
    const assetsInMyr = profile.assets * usdToMyr;
    const incomeInMyr = (profile.income / 12) * usdToMyr; // Monthly income

    // Liquid assets requirement: RM 1.5M
    const requiredAssets = 1500000; // RM
    const assetScore = assetsInMyr >= requiredAssets ? 40 : Math.max(0, (assetsInMyr / requiredAssets) * 40);
    breakdown.assets = {
      score: Math.round(assetScore),
      maxScore: 40,
      reason: assetsInMyr >= requiredAssets
        ? `Liquid assets meet MM2H requirement (RM ${Math.round(assetsInMyr).toLocaleString()} ≥ RM 1.5M)`
        : `Liquid assets below requirement (RM ${Math.round(assetsInMyr).toLocaleString()} < RM 1.5M required)`
    };
    score += assetScore;

    if (assetsInMyr < requiredAssets) {
      const shortfall = requiredAssets - assetsInMyr;
      recommendations.push(`Increase liquid assets by RM ${Math.round(shortfall).toLocaleString()} to meet MM2H requirement`);
    } else {
      primaryReasons.push(`Liquid assets of RM ${Math.round(assetsInMyr).toLocaleString()} exceed MM2H requirement`);
    }

    // Monthly income requirement: RM 40,000
    const requiredMonthlyIncome = 40000; // RM
    const incomeScore = incomeInMyr >= requiredMonthlyIncome ? 30 : Math.max(0, (incomeInMyr / requiredMonthlyIncome) * 30);
    breakdown.income = {
      score: Math.round(incomeScore),
      maxScore: 30,
      reason: incomeInMyr >= requiredMonthlyIncome
        ? `Monthly income meets MM2H requirement (RM ${Math.round(incomeInMyr).toLocaleString()}/month ≥ RM 40K)`
        : `Monthly income below requirement (RM ${Math.round(incomeInMyr).toLocaleString()}/month < RM 40K required)`
    };
    score += incomeScore;

    if (incomeInMyr < requiredMonthlyIncome) {
      recommendations.push(`Increase monthly income to at least RM 40,000 for MM2H eligibility`);
    } else {
      primaryReasons.push(`Monthly income of RM ${Math.round(incomeInMyr).toLocaleString()} meets MM2H requirement`);
    }

    // Age factor (MM2H popular with retirees)
    const ageScore = profile.age >= 50 ? 20 : profile.age >= 35 ? 15 : 10;
    breakdown.age = {
      score: ageScore,
      maxScore: 20,
      reason: profile.age >= 50 ? 'Age ideal for MM2H retirement program' : 
              profile.age >= 35 ? 'Age suitable for MM2H program' : 'Young age may require stronger financial profile'
    };
    score += ageScore;

    // Health status
    const healthScore = profile.healthStatus === 'excellent' ? 10 : 
                       profile.healthStatus === 'good' ? 8 : 5;
    breakdown.health = {
      score: healthScore,
      maxScore: 10,
      reason: `Health status: ${profile.healthStatus} (medical examination required for MM2H)`
    };
    score += healthScore;

    return {
      score: Math.round(score),
      breakdown,
      recommendations,
      primaryReasons
    };
  }

  private static calculateLabuanDirectorScore(profile: UserProfile) {
    let score = 0;
    const breakdown: any = {};
    const recommendations: string[] = [];
    const primaryReasons: string[] = [];

    // Business/entrepreneurial background
    const entrepreneurialProfessions = ['entrepreneur', 'founder', 'ceo', 'director', 'consultant', 'freelancer'];
    const isEntrepreneurial = entrepreneurialProfessions.some(prof => 
      profile.profession.toLowerCase().includes(prof)
    );
    const professionScore = isEntrepreneurial ? 30 : 15;
    breakdown.profession = {
      score: professionScore,
      maxScore: 30,
      reason: isEntrepreneurial 
        ? `${profile.profession} background ideal for Labuan director role`
        : `${profile.profession} can transition to director role with business setup`
    };
    score += professionScore;

    if (isEntrepreneurial) {
      primaryReasons.push(`${profile.profession} background perfect for Labuan Director Visa`);
    }

    // Financial capacity for business setup and operations
    // Need funds for: company setup ($1.5-3K USD), office setup, director salary (RM 10K/month)
    const businessCapitalNeeded = 50000; // USD estimated for first year
    const capitalScore = profile.assets >= businessCapitalNeeded ? 25 : 
                        Math.max(0, (profile.assets / businessCapitalNeeded) * 25);
    breakdown.capital = {
      score: Math.round(capitalScore),
      maxScore: 25,
      reason: profile.assets >= businessCapitalNeeded
        ? `Sufficient capital for Labuan business setup and operations ($${profile.assets.toLocaleString()})`
        : `Additional capital needed for business setup ($${profile.assets.toLocaleString()} < $${businessCapitalNeeded.toLocaleString()} recommended)`
    };
    score += capitalScore;

    if (profile.assets < businessCapitalNeeded) {
      recommendations.push(`Build capital to at least $${businessCapitalNeeded.toLocaleString()} for smooth Labuan business operations`);
    } else {
      primaryReasons.push(`Strong financial position for Labuan business setup`);
    }

    // Business experience
    const experienceScore = Math.min(20, profile.experience * 2);
    breakdown.experience = {
      score: Math.round(experienceScore),
      maxScore: 20,
      reason: `${profile.experience} years experience valuable for business management`
    };
    score += experienceScore;

    // Education (business knowledge helpful)
    const educationScore = profile.education === 'master' || profile.education === 'phd' ? 15 : 
                          profile.education === 'bachelor' ? 12 : 8;
    breakdown.education = {
      score: educationScore,
      maxScore: 15,
      reason: `${profile.education.replace('_', ' ')} level supports business leadership`
    };
    score += educationScore;

    // Age factor (maturity for business leadership)
    const ageScore = profile.age >= 30 ? 10 : profile.age >= 25 ? 8 : 5;
    breakdown.age = {
      score: ageScore,
      maxScore: 10,
      reason: profile.age >= 30 ? 'Age demonstrates business maturity' : 'Young entrepreneur with growth potential'
    };
    score += ageScore;

    if (!isEntrepreneurial) {
      recommendations.push('Consider business development or partnership experience before Labuan director role');
    }

    if (profile.experience < 3) {
      recommendations.push('Gain more professional experience to strengthen director credentials');
    }

    return {
      score: Math.round(score),
      breakdown,
      recommendations,
      primaryReasons
    };
  }

  static calculateVisaScore(profile: UserProfile, visaType: string): VisaEligibilityResult {
    const result = this.getSmartVisaRecommendations(profile);
    const match = result.recommendations.find(r => r.visa === visaType);
    
    if (match) {
      return match;
    }

    // Default fallback
    return {
      visa: visaType,
      score: 50,
      suitability: 'fair',
      breakdown: {
        overall: { score: 50, maxScore: 100, reason: 'Basic eligibility assessment' }
      },
      recommendations: ['Contact immigration consultant for detailed assessment'],
      primaryReasons: ['Profile requires detailed review']
    };
  }
}