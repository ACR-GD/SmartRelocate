export interface VisaRequirement {
  id: string;
  name: string;
  description: string;
  category: 'document' | 'financial' | 'professional' | 'health' | 'legal';
  required: boolean;
  details?: string;
}

export interface VisaInfo {
  id: string;
  name: string;
  type: string;
  description: string;
  shortDescription: string;
  eligibility: string;
  targetProfessions: string[];
  minIncome?: number; // USD monthly
  minAssets?: number; // USD total
  maxAge?: number;
  minAge?: number;
  familyEligible: boolean;
  processingTime: string;
  cost: string;
  validity: string;
  requirements: VisaRequirement[];
  benefits: string[];
  restrictions: string[];
  renewalOptions: string;
  pathToPermanency: boolean;
  officialUrl: string;
}

export const visaData: Record<string, VisaInfo> = {
  'de-rantau': {
    id: 'de-rantau',
    name: 'DE Rantau Pass',
    type: 'Digital Nomad Visa',
    description: 'The DE Rantau Pass is Malaysia\'s digital nomad visa program designed for remote workers and digital entrepreneurs.',
    shortDescription: 'Digital nomad visa for remote workers and freelancers',
    eligibility: 'Remote workers, digital nomads, and freelancers with consistent income',
    targetProfessions: ['tech', 'consultant', 'freelancer', 'designer', 'marketing'],
    minIncome: 2400, // USD monthly
    familyEligible: false,
    processingTime: '3-4 weeks',
    cost: 'RM 1,000 (~$230 USD)',
    validity: '12 months (renewable)',
    requirements: [
      {
        id: 'de-1',
        name: 'Remote Work Proof',
        description: 'Evidence of remote work capability and employment',
        category: 'professional',
        required: true,
        details: 'Employment letter, freelance contracts, or business registration'
      },
      {
        id: 'de-2',
        name: 'Income Verification',
        description: 'Proof of minimum monthly income of $2,400 USD',
        category: 'financial',
        required: true,
        details: 'Bank statements, payslips, or tax returns for past 3 months'
      },
      {
        id: 'de-3',
        name: 'Clean Criminal Record',
        description: 'Police clearance certificate from home country',
        category: 'legal',
        required: true,
        details: 'Must be issued within 6 months of application'
      },
      {
        id: 'de-4',
        name: 'Health Insurance',
        description: 'Valid health insurance coverage',
        category: 'health',
        required: true,
        details: 'Minimum coverage of $50,000 USD'
      }
    ],
    benefits: [
      'Live and work remotely in Malaysia',
      'Multiple entry visa',
      'Access to digital nomad communities',
      'No local employment restrictions'
    ],
    restrictions: [
      'Cannot work for Malaysian companies',
      'Must maintain remote income source',
      'Single applicant only (no dependents)'
    ],
    renewalOptions: 'Renewable for additional 12-month periods',
    pathToPermanency: false,
    officialUrl: 'https://mdec.my/derantau/'
  },
  
  'mm2h': {
    id: 'mm2h',
    name: 'MM2H Programme',
    type: 'Long-term Residency',
    description: 'Malaysia My Second Home (MM2H) is a long-term visa program for financially independent individuals seeking to live in Malaysia.',
    shortDescription: 'Long-term residency for financially independent individuals',
    eligibility: 'High net worth individuals with substantial liquid assets and income',
    targetProfessions: ['investor', 'retiree', 'business', 'finance'],
    minIncome: 40000, // RM monthly (approx $9,200 USD)
    minAssets: 347000, // RM 1.5M (approx $347,000 USD)
    minAge: 35,
    familyEligible: true,
    processingTime: '6-12 months',
    cost: 'RM 5,000 (~$1,150 USD)',
    validity: '5 years (renewable)',
    requirements: [
      {
        id: 'mm2h-1',
        name: 'Liquid Assets',
        description: 'Minimum RM 1.5 million in liquid assets',
        category: 'financial',
        required: true,
        details: 'Bank statements, investment portfolios, or property valuations'
      },
      {
        id: 'mm2h-2',
        name: 'Monthly Income',
        description: 'Offshore income of RM 40,000 per month',
        category: 'financial',
        required: true,
        details: 'Proof of consistent offshore income for past 6 months'
      },
      {
        id: 'mm2h-3',
        name: 'Health Insurance',
        description: 'Medical insurance coverage for Malaysia',
        category: 'health',
        required: true,
        details: 'Valid for entire family if applicable'
      },
      {
        id: 'mm2h-4',
        name: 'Age Requirement',
        description: 'Minimum age of 35 years',
        category: 'professional',
        required: true
      }
    ],
    benefits: [
      '5-year renewable residency',
      'Bring spouse and unmarried children under 21',
      'Purchase property in Malaysia',
      'Import or purchase vehicles with tax exemption',
      'Open bank accounts and invest in Malaysia'
    ],
    restrictions: [
      'Cannot work in Malaysia (investment activities allowed)',
      'Must spend minimum time in Malaysia annually',
      'Regular renewal requirements'
    ],
    renewalOptions: 'Renewable every 5 years with continued eligibility',
    pathToPermanency: false,
    officialUrl: 'https://www.mm2h.gov.my/'
  },

  'labuan-director': {
    id: 'labuan-director',
    name: 'Labuan Director Visa',
    type: 'Business Visa',
    description: 'Business visa for directors and shareholders of Labuan companies, ideal for entrepreneurs and investors.',
    shortDescription: 'Business visa for company directors and investors',
    eligibility: 'Business owners, directors, and investors in Labuan companies',
    targetProfessions: ['business', 'finance', 'investor', 'entrepreneur'],
    minAssets: 80000, // RM 350k paid-up capital (approx $80,000 USD)
    familyEligible: true,
    processingTime: '4-6 weeks',
    cost: 'RM 2,500 (~$575 USD)',
    validity: '2 years (renewable)',
    requirements: [
      {
        id: 'lab-1',
        name: 'Company Incorporation',
        description: 'Registered Labuan company with business activities',
        category: 'professional',
        required: true,
        details: 'Company must be actively conducting business'
      },
      {
        id: 'lab-2',
        name: 'Paid-up Capital',
        description: 'Minimum RM 350,000 paid-up capital',
        category: 'financial',
        required: true,
        details: 'Capital must be injected into company bank account'
      },
      {
        id: 'lab-3',
        name: 'Business Plan',
        description: 'Comprehensive business plan and financial projections',
        category: 'professional',
        required: true,
        details: '3-year business plan with revenue projections'
      },
      {
        id: 'lab-4',
        name: 'Director Appointment',
        description: 'Official appointment as company director',
        category: 'professional',
        required: true,
        details: 'Board resolution and director appointment letter'
      }
    ],
    benefits: [
      'Multiple entry business visa',
      'Bring spouse and dependents',
      'Conduct business activities in Malaysia',
      'Tax advantages through Labuan jurisdiction',
      'Access to Malaysian banking system'
    ],
    restrictions: [
      'Must maintain business operations',
      'Regular compliance with Labuan regulations',
      'Cannot work for other Malaysian companies'
    ],
    renewalOptions: 'Renewable every 2 years with continued business operations',
    pathToPermanency: false,
    officialUrl: 'https://www.labuanfsa.gov.my/'
  },

  'employment-pass': {
    id: 'employment-pass',
    name: 'Employment Pass',
    type: 'Work Visa',
    description: 'Work visa for skilled professionals with job offers from Malaysian companies.',
    shortDescription: 'Work visa for skilled professionals with job offers',
    eligibility: 'Skilled professionals with relevant qualifications and Malaysian job offers',
    targetProfessions: ['tech', 'finance', 'healthcare', 'education', 'engineering', 'management'],
    minIncome: 1150, // RM 5,000 monthly (approx $1,150 USD)
    familyEligible: true,
    processingTime: '4-6 weeks',
    cost: 'RM 1,225 (~$280 USD)',
    validity: '1-2 years (renewable)',
    requirements: [
      {
        id: 'ep-1',
        name: 'Job Offer',
        description: 'Valid job offer from Malaysian company',
        category: 'professional',
        required: true,
        details: 'Employment contract with minimum RM 5,000 monthly salary'
      },
      {
        id: 'ep-2',
        name: 'Educational Qualifications',
        description: 'Relevant degree or professional qualifications',
        category: 'professional',
        required: true,
        details: 'Bachelor\'s degree or equivalent professional experience'
      },
      {
        id: 'ep-3',
        name: 'Work Experience',
        description: 'Relevant work experience in the field',
        category: 'professional',
        required: true,
        details: 'Minimum 2-3 years relevant experience'
      },
      {
        id: 'ep-4',
        name: 'Medical Examination',
        description: 'Medical fitness certificate',
        category: 'health',
        required: true,
        details: 'FOMEMA medical examination in Malaysia'
      }
    ],
    benefits: [
      'Legal right to work in Malaysia',
      'Bring spouse and unmarried children under 18',
      'Access to Malaysian healthcare system',
      'Can apply for permanent residency after 10 years',
      'Multiple entry visa'
    ],
    restrictions: [
      'Tied to specific employer',
      'Cannot change jobs without new application',
      'Must maintain employment to keep visa'
    ],
    renewalOptions: 'Renewable with continued employment',
    pathToPermanency: true,
    officialUrl: 'https://esd.imi.gov.my/'
  }
};

export const getVisaByProfession = (profession: string): VisaInfo[] => {
  return Object.values(visaData).filter(visa => 
    visa.targetProfessions.includes(profession)
  );
};

export const getVisaByIncome = (monthlyIncome: number): VisaInfo[] => {
  return Object.values(visaData).filter(visa => 
    !visa.minIncome || monthlyIncome >= visa.minIncome
  );
};

export const getVisaByAssets = (totalAssets: number): VisaInfo[] => {
  return Object.values(visaData).filter(visa => 
    !visa.minAssets || totalAssets >= visa.minAssets
  );
};