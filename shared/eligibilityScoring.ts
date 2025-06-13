export interface UserProfile {
  nationality: string;
  age: number;
  profession: string;
  experience: number;
  income: number;
  familyStatus: 'single' | 'married' | 'married_with_children';
  education: 'high_school' | 'bachelor' | 'master' | 'phd';
  languageSkills: string[];
  assets: number;
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

    // Use actual profile data with minimal defaults only for truly missing values
    const safeProfile = {
      nationality: profile.nationality,
      age: profile.age,
      profession: profile.profession,
      experience: profile.experience,
      income: profile.income,
      familyStatus: profile.familyStatus,
      education: profile.education,
      languageSkills: profile.languageSkills,
      assets: profile.assets,
      hasJobOffer: profile.hasJobOffer,
      criminalRecord: profile.criminalRecord,
      healthStatus: profile.healthStatus
    };

    // Always provide all visa assessments for comprehensive comparison
    const deRantauScore = this.assessDeRantauPass(safeProfile);
    recommendations.push(deRantauScore);

    const mm2hScore = this.assessMM2H(safeProfile);
    recommendations.push(mm2hScore);

    const labuanScore = this.assessLabuanDirector(safeProfile);
    recommendations.push(labuanScore);

    const employmentScore = this.assessEmploymentPass(safeProfile);
    recommendations.push(employmentScore);

    recommendations.sort((a, b) => b.score - a.score);
    
    return {
      recommendations,
      bestMatch: recommendations.length > 0 ? recommendations[0] : null
    };
  }

  private static assessDeRantauPass(profile: UserProfile): VisaEligibilityResult {
    let totalScore = 0;
    const breakdown: any = {};
    const recommendations: string[] = [];
    const primaryReasons: string[] = [];

    // Simple Income Rule: $24,000+ = 40 points
    if (profile.income >= 24000) {
      breakdown.income = { score: 40, maxScore: 40, reason: `Income of $${profile.income.toLocaleString()} meets DE Rantau minimum` };
      totalScore += 40;
      primaryReasons.push(`Sufficient income for DE Rantau Pass`);
    } else {
      breakdown.income = { score: 0, maxScore: 40, reason: `Income too low ($${profile.income.toLocaleString()} < $24,000)` };
      recommendations.push('Increase income to $24,000+ for DE Rantau eligibility');
    }

    // Simple Profession Rule: Consultant = 30 points
    if (profile.profession.toLowerCase().includes('consultant')) {
      breakdown.profession = { score: 30, maxScore: 30, reason: 'Consultant profession ideal for DE Rantau' };
      totalScore += 30;
      primaryReasons.push('Consultant profession perfect for digital nomad visa');
    } else {
      breakdown.profession = { score: 15, maxScore: 30, reason: `${profile.profession} may qualify with documentation` };
      totalScore += 15;
    }

    // Simple Experience Rule: 5+ years = 20 points
    if (profile.experience >= 5) {
      breakdown.experience = { score: 20, maxScore: 20, reason: `${profile.experience} years experience qualifies` };
      totalScore += 20;
    } else {
      breakdown.experience = { score: 10, maxScore: 20, reason: `${profile.experience} years experience (5+ recommended)` };
      totalScore += 10;
    }

    // Simple Education Rule: Master's = 10 points
    if (profile.education === 'master' || profile.education === 'phd') {
      breakdown.education = { score: 10, maxScore: 10, reason: 'Advanced degree preferred' };
      totalScore += 10;
      primaryReasons.push('Advanced education qualification');
    } else {
      breakdown.education = { score: 5, maxScore: 10, reason: 'Bachelor\'s degree acceptable' };
      totalScore += 5;
    }

    const suitability = totalScore >= 80 ? 'excellent' : totalScore >= 60 ? 'good' : totalScore >= 40 ? 'fair' : 'poor';

    return {
      visa: 'DE Rantau Pass',
      score: totalScore,
      suitability,
      breakdown,
      recommendations,
      primaryReasons
    };
  }

  private static assessMM2H(profile: UserProfile): VisaEligibilityResult {
    let totalScore = 0;
    const breakdown: any = {};
    const recommendations: string[] = [];
    const primaryReasons: string[] = [];

    // Simple Assets Rule: $300,000+ = MM2H qualified
    if (profile.assets >= 300000) {
      breakdown.assets = { score: 60, maxScore: 60, reason: `Assets of $${profile.assets.toLocaleString()} qualify for MM2H` };
      totalScore += 60;
      primaryReasons.push('Sufficient assets for MM2H Programme');
    } else {
      breakdown.assets = { score: 0, maxScore: 60, reason: `Assets too low ($${profile.assets.toLocaleString()} < $300,000)` };
      recommendations.push('Build assets to $300,000+ for MM2H qualification');
    }

    // Simple Income Rule: $120,000+ annual = 30 points
    if (profile.income >= 120000) {
      breakdown.income = { score: 30, maxScore: 30, reason: `High income of $${profile.income.toLocaleString()} supports MM2H` };
      totalScore += 30;
      primaryReasons.push('High income meets MM2H requirements');
    } else {
      breakdown.income = { score: 5, maxScore: 30, reason: `Income of $${profile.income.toLocaleString()} below optimal for MM2H` };
      totalScore += 5;
    }

    // Simple Age Rule: 35+ = 10 points
    if (profile.age >= 35) {
      breakdown.age = { score: 10, maxScore: 10, reason: 'Suitable age for MM2H programme' };
      totalScore += 10;
    } else {
      breakdown.age = { score: 5, maxScore: 10, reason: 'Young for MM2H but possible' };
      totalScore += 5;
    }

    const suitability = totalScore >= 80 ? 'excellent' : totalScore >= 50 ? 'good' : totalScore >= 30 ? 'fair' : 'poor';

    return {
      visa: 'MM2H Programme',
      score: totalScore,
      suitability,
      breakdown,
      recommendations,
      primaryReasons
    };
  }

  private static assessLabuanDirector(profile: UserProfile): VisaEligibilityResult {
    let totalScore = 0;
    const breakdown: any = {};
    const recommendations: string[] = [];
    const primaryReasons: string[] = [];

    // Simple Assets Rule: $10,000+ = Labuan qualified
    if (profile.assets >= 10000) {
      breakdown.assets = { score: 50, maxScore: 50, reason: `Assets of $${profile.assets.toLocaleString()} sufficient for Labuan setup` };
      totalScore += 50;
      primaryReasons.push('Sufficient capital for Labuan Director Visa');
    } else {
      breakdown.assets = { score: 10, maxScore: 50, reason: `Assets of $${profile.assets.toLocaleString()} below recommended $10,000` };
      totalScore += 10;
      recommendations.push('Build assets to $10,000+ for easier Labuan business setup');
    }

    // Simple Business Experience Rule: Consultant or 5+ years = 30 points
    if (profile.profession.toLowerCase().includes('consultant') || profile.experience >= 5) {
      breakdown.business = { score: 30, maxScore: 30, reason: 'Business background suitable for director role' };
      totalScore += 30;
      primaryReasons.push('Business experience qualifies for director position');
    } else {
      breakdown.business = { score: 15, maxScore: 30, reason: 'Limited business experience for director role' };
      totalScore += 15;
    }

    // Simple Education Rule: Bachelor's+ = 20 points
    if (profile.education === 'bachelor' || profile.education === 'master' || profile.education === 'phd') {
      breakdown.education = { score: 20, maxScore: 20, reason: 'University education supports director role' };
      totalScore += 20;
    } else {
      breakdown.education = { score: 10, maxScore: 20, reason: 'High school education acceptable' };
      totalScore += 10;
    }

    const suitability = totalScore >= 80 ? 'excellent' : totalScore >= 60 ? 'good' : totalScore >= 40 ? 'fair' : 'poor';

    return {
      visa: 'Labuan Director Visa',
      score: totalScore,
      suitability,
      breakdown,
      recommendations,
      primaryReasons
    };
  }

  private static assessEmploymentPass(profile: UserProfile): VisaEligibilityResult {
    let totalScore = 0;
    const breakdown: any = {};
    const recommendations: string[] = [];
    const primaryReasons: string[] = [];

    // Simple Job Offer Rule: Has job offer = 60 points
    if (profile.hasJobOffer) {
      breakdown.jobOffer = { score: 60, maxScore: 60, reason: 'Job offer in Malaysia qualifies for Employment Pass' };
      totalScore += 60;
      primaryReasons.push('Malaysian job offer ensures Employment Pass eligibility');
    } else {
      breakdown.jobOffer = { score: 0, maxScore: 60, reason: 'No job offer - Employment Pass requires Malaysian employer' };
      recommendations.push('Secure job offer from Malaysian company for Employment Pass');
    }

    // Simple Education Rule: Bachelor's+ = 25 points
    if (profile.education === 'bachelor' || profile.education === 'master' || profile.education === 'phd') {
      breakdown.education = { score: 25, maxScore: 25, reason: 'University degree meets Employment Pass requirement' };
      totalScore += 25;
      primaryReasons.push('University education qualifies for Employment Pass');
    } else {
      breakdown.education = { score: 5, maxScore: 25, reason: 'University degree typically required for Employment Pass' };
      totalScore += 5;
      recommendations.push('University degree strongly recommended for Employment Pass');
    }

    // Simple Experience Rule: 3+ years = 15 points
    if (profile.experience >= 3) {
      breakdown.experience = { score: 15, maxScore: 15, reason: `${profile.experience} years experience supports application` };
      totalScore += 15;
    } else {
      breakdown.experience = { score: 5, maxScore: 15, reason: `${profile.experience} years experience (3+ preferred)` };
      totalScore += 5;
    }

    const suitability = totalScore >= 80 ? 'excellent' : totalScore >= 60 ? 'good' : totalScore >= 30 ? 'fair' : 'poor';

    return {
      visa: 'Employment Pass',
      score: totalScore,
      suitability,
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

    // Fallback assessment
    return {
      visa: visaType,
      score: 45,
      suitability: 'fair',
      breakdown: {
        general: { score: 45, maxScore: 100, reason: 'Basic eligibility assessment completed' }
      },
      recommendations: ['Schedule consultation with immigration specialist for detailed review'],
      primaryReasons: ['Profile requires detailed professional assessment']
    };
  }
}