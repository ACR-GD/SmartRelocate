export interface VisaOption {
  name: string;
  type: string;
  requirements: string[];
  processingTime: string;
  cost: string;
  eligibility: string;
  benefits: string[];
}

export interface CountryInfo {
  name: string;
  continent: string;
  visas: VisaOption[];
  costEstimate: string;
  duration: string;
  livingCost: string;
  description: string;
}

export const continents = {
  "North America": ["United States", "Canada", "Mexico"],
  "Europe": ["Germany", "United Kingdom", "France", "Netherlands", "Spain"],
  "Asia": ["Singapore", "Japan", "South Korea", "Thailand", "Philippines"],
  "Africa": ["Algeria", "Morocco", "Tunisia", "Egypt", "South Africa", "Nigeria", "Kenya", "Ghana", "Ethiopia", "Tanzania", "Uganda", "Rwanda", "Botswana", "Mauritius", "Senegal"],
  "Oceania": ["Australia", "New Zealand"],
  "South America": ["Brazil", "Argentina", "Chile"]
};

export const relocationData: Record<string, CountryInfo> = {
  "united-states": {
    name: "United States",
    continent: "North America",
    description: "Popular destination for tech workers with high salaries but complex visa process",
    costEstimate: "USD 15,000–50,000",
    duration: "6 months to 2 years",
    livingCost: "USD 3,000–8,000/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "US passport or eligible nationality",
          "Minimum USD 24,000 annual income",
          "Remote work contract",
          "Clean criminal record"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (90%+) for tech workers",
        benefits: ["12-month renewable", "Work remotely", "Tax advantages"]
      },
      {
        name: "MM2H Programme",
        type: "Long-term Residence",
        requirements: [
          "Proof of USD 350,000+ liquid assets",
          "Monthly offshore income USD 10,000+",
          "Medical examination",
          "Background check"
        ],
        processingTime: "6-12 months",
        cost: "USD 5,000-15,000 total",
        eligibility: "Medium (60%) for high earners",
        benefits: ["10-year renewable", "Family inclusion", "Property purchase rights"]
      }
    ]
  },
  "canada": {
    name: "Canada",
    continent: "North America",
    description: "Tech-friendly with excellent quality of life and clear immigration pathways",
    costEstimate: "USD 8,000–25,000",
    duration: "3-12 months",
    livingCost: "USD 2,500–5,000/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Canadian passport",
          "Minimum USD 24,000 annual income",
          "Remote employment proof",
          "Health insurance"
        ],
        processingTime: "2-3 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "Very High (95%+) for tech workers",
        benefits: ["12-month renewable", "Fast processing", "Family friendly"]
      },
      {
        name: "Employment Pass",
        type: "Work Visa",
        requirements: [
          "Job offer from Malaysian company",
          "Bachelor's degree minimum",
          "3+ years experience",
          "Salary minimum RM 5,000"
        ],
        processingTime: "4-8 weeks",
        cost: "USD 2,000-4,000",
        eligibility: "High (80%) with job offer",
        benefits: ["Up to 5 years", "Path to permanent residence", "Family visa eligible"]
      }
    ]
  },
  "germany": {
    name: "Germany",
    continent: "Europe",
    description: "Strong tech economy with excellent work-life balance and EU access",
    costEstimate: "USD 10,000–30,000",
    duration: "4-16 weeks",
    livingCost: "USD 2,800–4,500/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "EU passport or visa-exempt nationality",
          "Minimum USD 24,000 annual income",
          "Remote work documentation",
          "Health insurance coverage"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (85%) for EU citizens",
        benefits: ["12-month renewable", "EU travel freedom", "Tax efficiency"]
      },
      {
        name: "MM2H Programme",
        type: "Long-term Residence",
        requirements: [
          "Proof of significant assets",
          "Monthly income verification",
          "Medical clearance",
          "Character references"
        ],
        processingTime: "8-14 months",
        cost: "USD 8,000-20,000",
        eligibility: "Medium (50%) for high earners",
        benefits: ["10-year renewable", "Investment opportunities", "Education benefits"]
      }
    ]
  },
  "singapore": {
    name: "Singapore",
    continent: "Asia",
    description: "Tech hub with excellent infrastructure and proximity to Malaysia",
    costEstimate: "USD 5,000–15,000",
    duration: "2-8 weeks",
    livingCost: "USD 3,500–6,000/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Singapore passport or PR",
          "Minimum USD 24,000 annual income",
          "Remote employment contract",
          "Clean background check"
        ],
        processingTime: "1-2 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "Very High (98%) for Singaporeans",
        benefits: ["12-month renewable", "Fastest processing", "Regional hub access"]
      },
      {
        name: "Employment Pass",
        type: "Work Visa",
        requirements: [
          "Malaysian company job offer",
          "University degree",
          "Relevant work experience",
          "Competitive salary offer"
        ],
        processingTime: "3-6 weeks",
        cost: "USD 1,500-3,000",
        eligibility: "Very High (90%) with offer",
        benefits: ["Up to 5 years", "Fast processing", "Family benefits"]
      }
    ]
  },
  "australia": {
    name: "Australia",
    continent: "Oceania",
    description: "High quality of life with strong tech sector and Asia-Pacific access",
    costEstimate: "USD 12,000–35,000",
    duration: "3-18 months",
    livingCost: "USD 3,000–5,500/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Australian passport",
          "Minimum USD 24,000 annual income",
          "Remote work verification",
          "Health and character checks"
        ],
        processingTime: "2-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "Very High (95%) for Australians",
        benefits: ["12-month renewable", "Commonwealth privileges", "Regional opportunities"]
      },
      {
        name: "MM2H Programme",
        type: "Long-term Residence",
        requirements: [
          "Significant financial assets",
          "Offshore income proof",
          "Medical examination",
          "Police clearance"
        ],
        processingTime: "10-18 months",
        cost: "USD 10,000-25,000",
        eligibility: "Medium (55%) for qualified applicants",
        benefits: ["10-year renewable", "Investment benefits", "Retirement planning"]
      }
    ]
  },

  "france": {
    name: "France",
    continent: "Europe",
    description: "Popular European destination with strong tech sector and quality of life",
    costEstimate: "USD 12,000–35,000",
    duration: "4-8 months",
    livingCost: "USD 2,500–5,000/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "EU passport or eligible nationality",
          "Minimum USD 24,000 annual income",
          "Remote work contract",
          "Health insurance coverage"
        ],
        processingTime: "4-6 weeks",
        cost: "USD 800 application fee",
        eligibility: "High (85%) for tech professionals",
        benefits: ["12-month renewable", "EU work privileges", "Quality healthcare"]
      },
      {
        name: "Employment Pass",
        type: "Work Visa",
        requirements: [
          "University degree",
          "Job offer from French company",
          "French language proficiency",
          "Clean background check"
        ],
        processingTime: "6-12 weeks",
        cost: "USD 1,200 application fee",
        eligibility: "Medium (70%) with job offer",
        benefits: ["Path to residency", "EU mobility", "Social benefits"]
      }
    ]
  },

  "netherlands": {
    name: "Netherlands",
    continent: "Europe",
    description: "Tech-friendly country with excellent English proficiency and startup ecosystem",
    costEstimate: "USD 14,000–40,000",
    duration: "3-6 months",
    livingCost: "USD 2,800–5,500/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "EU passport or eligible nationality",
          "Minimum USD 28,000 annual income",
          "Remote work arrangement",
          "Health insurance"
        ],
        processingTime: "3-5 weeks",
        cost: "USD 900 application fee",
        eligibility: "Very High (90%) for tech workers",
        benefits: ["12-month renewable", "EU access", "English-friendly environment"]
      },
      {
        name: "Highly Skilled Migrant Visa",
        type: "Work Visa",
        requirements: [
          "University degree",
          "Job offer with recognized sponsor",
          "Minimum salary threshold",
          "Health insurance"
        ],
        processingTime: "4-8 weeks",
        cost: "USD 1,400 application fee",
        eligibility: "High (80%) for qualified professionals",
        benefits: ["30% tax ruling", "Path to permanent residency", "Family inclusion"]
      }
    ]
  },

  "spain": {
    name: "Spain",
    continent: "Europe",
    description: "Growing tech hub with excellent climate and affordable living costs",
    costEstimate: "USD 10,000–28,000",
    duration: "4-8 months",
    livingCost: "USD 2,000–4,000/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "EU passport or eligible nationality",
          "Minimum USD 22,000 annual income",
          "Remote work contract",
          "Health coverage"
        ],
        processingTime: "4-6 weeks",
        cost: "USD 700 application fee",
        eligibility: "High (85%) for digital nomads",
        benefits: ["12-month renewable", "EU benefits", "Mediterranean lifestyle"]
      },
      {
        name: "Work Visa",
        type: "Employment",
        requirements: [
          "Job offer from Spanish company",
          "University degree",
          "Basic Spanish language skills",
          "Medical certificate"
        ],
        processingTime: "8-12 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "Medium (65%) with sponsorship",
        benefits: ["Residency pathway", "EU mobility", "Social security access"]
      }
    ]
  },

  "mexico": {
    name: "Mexico",
    continent: "North America",
    description: "Growing tech sector with proximity to US market and lower costs",
    costEstimate: "USD 8,000–20,000",
    duration: "2-4 months",
    livingCost: "USD 1,500–3,000/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Valid passport",
          "Minimum USD 18,000 annual income",
          "Remote work proof",
          "Health insurance"
        ],
        processingTime: "2-4 weeks",
        cost: "USD 500 application fee",
        eligibility: "Very High (95%) for remote workers",
        benefits: ["12-month renewable", "NAFTA proximity", "Cultural richness"]
      },
      {
        name: "Temporary Resident Visa",
        type: "Work Visa",
        requirements: [
          "Job offer or investment",
          "Financial solvency proof",
          "Clean criminal record",
          "Medical examination"
        ],
        processingTime: "4-8 weeks",
        cost: "USD 800 application fee",
        eligibility: "High (80%) for professionals",
        benefits: ["4-year renewable", "Path to permanent residency", "Work authorization"]
      }
    ]
  },

  "japan": {
    name: "Japan",
    continent: "Asia",
    description: "Technology innovation leader with unique culture and growing startup scene",
    costEstimate: "USD 15,000–45,000",
    duration: "4-8 months",
    livingCost: "USD 3,000–6,000/month",
    visas: [
      {
        name: "Startup Visa",
        type: "Entrepreneur",
        requirements: [
          "Business plan approval",
          "Minimum investment capital",
          "Local partnership or incubation",
          "Basic Japanese language skills"
        ],
        processingTime: "8-12 weeks",
        cost: "USD 1,800 application fee",
        eligibility: "Medium (50%) for tech entrepreneurs",
        benefits: ["1-year renewable", "Path to permanent residency", "Business support"]
      },
      {
        name: "Skilled Worker Visa",
        type: "Employment",
        requirements: [
          "University degree",
          "Job offer from Japanese company",
          "Relevant work experience",
          "Certificate of eligibility"
        ],
        processingTime: "6-10 weeks",
        cost: "USD 1,200 application fee",
        eligibility: "High (75%) for tech professionals",
        benefits: ["5-year renewable", "Family inclusion", "Permanent residency pathway"]
      }
    ]
  },

  "south-korea": {
    name: "South Korea",
    continent: "Asia",
    description: "Advanced tech economy with strong gaming and AI sectors",
    costEstimate: "USD 12,000–35,000",
    duration: "4-8 months",
    livingCost: "USD 2,500–4,500/month",
    visas: [
      {
        name: "D-8 Corporate Investment Visa",
        type: "Investment",
        requirements: [
          "Minimum USD 100,000 investment",
          "Business registration",
          "Feasible business plan",
          "Korean language proficiency (optional)"
        ],
        processingTime: "6-10 weeks",
        cost: "USD 1,500 application fee",
        eligibility: "Medium (55%) for tech investors",
        benefits: ["2-year renewable", "Business operation rights", "Family inclusion"]
      },
      {
        name: "E-7 Work Visa",
        type: "Employment",
        requirements: [
          "Bachelor's degree or equivalent experience",
          "Job offer from Korean company",
          "Work experience in field",
          "Health examination"
        ],
        processingTime: "4-8 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (70%) for tech workers",
        benefits: ["2-year renewable", "Career development", "Residency pathway"]
      }
    ]
  },

  "philippines": {
    name: "Philippines",
    continent: "Asia",
    description: "Growing BPO and tech outsourcing hub with English proficiency",
    costEstimate: "USD 5,000–15,000",
    duration: "2-4 months",
    livingCost: "USD 1,000–2,500/month",
    visas: [
      {
        name: "Special Resident Retiree's Visa",
        type: "Long-term Residence",
        requirements: [
          "Minimum age 50 years",
          "USD 20,000 deposit",
          "Health insurance",
          "Clean criminal record"
        ],
        processingTime: "4-8 weeks",
        cost: "USD 2,500 initial fee",
        eligibility: "High (80%) for qualified retirees",
        benefits: ["Permanent status", "Multiple entry", "Investment options"]
      },
      {
        name: "9G Work Visa",
        type: "Employment",
        requirements: [
          "Job offer from Filipino company",
          "University degree",
          "Work experience",
          "Medical clearance"
        ],
        processingTime: "6-10 weeks",
        cost: "USD 800 application fee",
        eligibility: "Medium (65%) with sponsorship",
        benefits: ["1-year renewable", "Family inclusion", "Work authorization"]
      }
    ]
  },

  "brazil": {
    name: "Brazil",
    continent: "South America",
    description: "Largest South American economy with growing fintech and startup ecosystem",
    costEstimate: "USD 8,000–25,000",
    duration: "3-6 months",
    livingCost: "USD 1,500–3,500/month",
    visas: [
      {
        name: "Digital Nomad Visa",
        type: "Remote Work",
        requirements: [
          "Minimum USD 18,000 annual income",
          "Remote work contract",
          "Health insurance",
          "Clean criminal record"
        ],
        processingTime: "4-8 weeks",
        cost: "USD 600 application fee",
        eligibility: "High (80%) for digital nomads",
        benefits: ["1-year renewable", "Tax benefits", "Cultural immersion"]
      },
      {
        name: "Work Visa",
        type: "Employment",
        requirements: [
          "Job offer from Brazilian company",
          "University degree",
          "Portuguese language skills (basic)",
          "Medical examination"
        ],
        processingTime: "8-12 weeks",
        cost: "USD 1,200 application fee",
        eligibility: "Medium (60%) with sponsorship",
        benefits: ["2-year renewable", "Permanent residency pathway", "South American access"]
      }
    ]
  },

  "argentina": {
    name: "Argentina",
    continent: "South America",
    description: "Tech outsourcing hub with European culture and affordable living",
    costEstimate: "USD 6,000–18,000",
    duration: "3-5 months",
    livingCost: "USD 1,200–2,800/month",
    visas: [
      {
        name: "Temporary Residence Visa",
        type: "Investment",
        requirements: [
          "Minimum investment or pension income",
          "Clean criminal record",
          "Health certificate",
          "Financial solvency proof"
        ],
        processingTime: "6-10 weeks",
        cost: "USD 800 application fee",
        eligibility: "High (75%) for investors",
        benefits: ["1-year renewable", "Work authorization", "Permanent residency path"]
      },
      {
        name: "Work Visa",
        type: "Employment",
        requirements: [
          "Job offer from Argentine company",
          "Professional qualifications",
          "Basic Spanish skills",
          "Apostilled documents"
        ],
        processingTime: "8-12 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "Medium (65%) with sponsorship",
        benefits: ["2-year renewable", "Family inclusion", "Regional travel"]
      }
    ]
  },

  "chile": {
    name: "Chile",
    continent: "South America",
    description: "Stable economy with strong startup ecosystem and business-friendly policies",
    costEstimate: "USD 10,000–28,000",
    duration: "3-6 months",
    livingCost: "USD 2,000–4,000/month",
    visas: [
      {
        name: "Start-Up Chile Visa",
        type: "Entrepreneur",
        requirements: [
          "Innovative startup idea",
          "Acceleration program acceptance",
          "Minimum viable product",
          "Team formation"
        ],
        processingTime: "4-8 weeks",
        cost: "USD 500 application fee",
        eligibility: "Medium (45%) - competitive selection",
        benefits: ["1-year validity", "USD 40,000 equity-free grant", "Mentorship access"]
      },
      {
        name: "Work Visa",
        type: "Employment",
        requirements: [
          "University degree",
          "Job offer with minimum salary",
          "Work experience",
          "Clean background check"
        ],
        processingTime: "6-10 weeks",
        cost: "USD 1,200 application fee",
        eligibility: "High (70%) for professionals",
        benefits: ["2-year renewable", "Permanent residency pathway", "Quality of life"]
      }
    ]
  },

  // African Countries
  "algeria": {
    name: "Algeria",
    continent: "Africa",
    description: "North African country with oil-based economy and French/Arabic business culture",
    costEstimate: "USD 8,000–20,000",
    duration: "4-8 months",
    livingCost: "USD 1,500–3,000/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Algerian passport",
          "Minimum USD 24,000 annual income",
          "Remote work contract",
          "Clean criminal record"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (85%) for tech professionals",
        benefits: ["12-month renewable", "Work remotely", "Tax advantages"]
      },
      {
        name: "Employment Pass",
        type: "Employment",
        requirements: [
          "University degree",
          "Job offer from Malaysian company",
          "5+ years experience",
          "Professional references"
        ],
        processingTime: "6-8 weeks",
        cost: "USD 2,000 application fee",
        eligibility: "High (75%) for skilled workers",
        benefits: ["2-year renewable", "Family inclusion", "Career advancement"]
      }
    ]
  },

  "morocco": {
    name: "Morocco",
    continent: "Africa",
    description: "Strategic North African location with growing tech sector and multilingual workforce",
    costEstimate: "USD 7,000–18,000",
    duration: "3-6 months",
    livingCost: "USD 1,200–2,800/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Moroccan passport",
          "Minimum USD 24,000 annual income",
          "Remote work documentation",
          "Health insurance coverage"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (90%) for qualified applicants",
        benefits: ["12-month renewable", "Tax benefits", "Regional mobility"]
      },
      {
        name: "Employment Pass",
        type: "Employment",
        requirements: [
          "Bachelor's degree or higher",
          "Malaysian job offer",
          "Relevant work experience",
          "Language proficiency"
        ],
        processingTime: "5-7 weeks",
        cost: "USD 1,800 application fee",
        eligibility: "High (80%) for professionals",
        benefits: ["Employment authorization", "Family sponsorship", "Residency pathway"]
      }
    ]
  },

  "tunisia": {
    name: "Tunisia",
    continent: "Africa",
    description: "Progressive North African nation with educated workforce and growing IT outsourcing industry",
    costEstimate: "USD 6,000–16,000",
    duration: "3-5 months",
    livingCost: "USD 1,000–2,500/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Tunisian passport",
          "Proof of USD 24,000+ annual income",
          "Remote employment contract",
          "Medical certificate"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (85%) for tech workers",
        benefits: ["12-month validity", "Work flexibility", "Tax advantages"]
      },
      {
        name: "Professional Visit Pass",
        type: "Business",
        requirements: [
          "Business invitation letter",
          "Company registration documents",
          "Financial statements",
          "Travel insurance"
        ],
        processingTime: "2-3 weeks",
        cost: "USD 500 application fee",
        eligibility: "Medium (70%) for business purposes",
        benefits: ["Multiple entries", "Business networking", "Market exploration"]
      }
    ]
  },

  "egypt": {
    name: "Egypt",
    continent: "Africa",
    description: "Ancient civilization with modern tech hubs in Cairo and Alexandria, strategic Middle East location",
    costEstimate: "USD 8,000–22,000",
    duration: "4-7 months",
    livingCost: "USD 1,300–3,200/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Egyptian passport",
          "Minimum USD 24,000 annual income",
          "Remote work contract",
          "Health insurance"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (80%) for digital professionals",
        benefits: ["12-month renewable", "Work remotely", "Regional access"]
      },
      {
        name: "Employment Pass",
        type: "Employment",
        requirements: [
          "University degree",
          "Job offer with Malaysian company",
          "Professional experience",
          "Security clearance"
        ],
        processingTime: "6-10 weeks",
        cost: "USD 2,200 application fee",
        eligibility: "Medium (65%) due to documentation requirements",
        benefits: ["Work authorization", "Family inclusion", "Skill development"]
      }
    ]
  },

  "south-africa": {
    name: "South Africa",
    continent: "Africa",
    description: "Most developed African economy with strong financial and tech sectors, English-speaking",
    costEstimate: "USD 10,000–25,000",
    duration: "4-8 months",
    livingCost: "USD 1,800–3,500/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "South African passport",
          "Proof of USD 24,000+ annual income",
          "Remote employment verification",
          "Clean criminal record"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "Very High (95%) for qualified professionals",
        benefits: ["12-month renewable", "Tax advantages", "High approval rate"]
      },
      {
        name: "Employment Pass",
        type: "Employment",
        requirements: [
          "Tertiary qualification",
          "Malaysian job offer",
          "5+ years experience",
          "Professional registration"
        ],
        processingTime: "5-8 weeks",
        cost: "USD 2,000 application fee",
        eligibility: "High (85%) for skilled professionals",
        benefits: ["2-year validity", "Family sponsorship", "Career growth"]
      }
    ]
  },

  "nigeria": {
    name: "Nigeria",
    continent: "Africa",
    description: "Africa's largest economy with booming fintech and tech startup ecosystem, English-speaking",
    costEstimate: "USD 9,000–23,000",
    duration: "4-7 months",
    livingCost: "USD 1,500–3,200/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Nigerian passport",
          "Minimum USD 24,000 annual income",
          "Remote work contract",
          "Health insurance"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (85%) for tech professionals",
        benefits: ["12-month renewable", "Work flexibility", "Tax benefits"]
      },
      {
        name: "Employment Pass",
        type: "Employment",
        requirements: [
          "University degree",
          "Job offer from Malaysian employer",
          "Relevant experience",
          "Character references"
        ],
        processingTime: "6-9 weeks",
        cost: "USD 2,100 application fee",
        eligibility: "High (75%) for qualified candidates",
        benefits: ["Employment rights", "Family inclusion", "Skill transfer"]
      }
    ]
  },

  "kenya": {
    name: "Kenya",
    continent: "Africa",
    description: "East African tech hub with Silicon Savannah reputation, strong mobile money and fintech sector",
    costEstimate: "USD 8,000–20,000",
    duration: "3-6 months",
    livingCost: "USD 1,400–2,900/month",
    visas: [
      {
        name: "DE Rantau Pass",
        type: "Digital Nomad",
        requirements: [
          "Kenyan passport",
          "Proof of USD 24,000+ income",
          "Remote employment letter",
          "Medical clearance"
        ],
        processingTime: "3-4 weeks",
        cost: "USD 1,000 application fee",
        eligibility: "High (88%) for tech workers",
        benefits: ["12-month validity", "Tax advantages", "Regional mobility"]
      },
      {
        name: "Professional Visit Pass",
        type: "Business",
        requirements: [
          "Business invitation",
          "Company credentials",
          "Financial documentation",
          "Return ticket"
        ],
        processingTime: "2-4 weeks",
        cost: "USD 600 application fee",
        eligibility: "High (80%) for business visits",
        benefits: ["Multiple entries", "Business development", "Network building"]
      }
    ]
  }
};

export const getCountriesByContinent = (continent: string): string[] => {
  return continents[continent as keyof typeof continents] || [];
};

export const getRelocationInfo = (countrySlug: string): CountryInfo | null => {
  return relocationData[countrySlug] || null;
};

export const createCountrySlug = (countryName: string): string => {
  return countryName.toLowerCase().replace(/\s+/g, '-');
};