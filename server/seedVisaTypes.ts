import { db } from "./db";
import { visaTypes } from "@shared/schema";
import { eq } from "drizzle-orm";

const visaTypesData = [
  {
    name: "DE Rantau Nomad Pass",
    slug: "de-rantau-nomad-pass",
    duration: "3 to 12 months (renewable once)",
    eligibility: "Remote tech/non-tech workers with contracts & income proof",
    minimumIncome: "USD 24,000 (tech) / USD 60,000 (non-tech)",
    applicationFee: "RM 1,000 (main) / RM 500 (dependent)",
    description: "Perfect for digital nomads and remote workers looking to experience Malaysia while working for international companies.",
    requirements: [
      "Valid passport with at least 6 months validity",
      "Employment contract or freelance agreements",
      "Proof of income (bank statements, tax documents)",
      "Clean criminal record check",
      "Health insurance coverage",
      "University degree or equivalent professional certification"
    ],
    benefits: [
      "Work remotely for international companies",
      "Multiple entry visa for easy travel",
      "Fast-track immigration lanes at airports",
      "Tax incentives for eligible participants",
      "Access to co-working spaces and digital nomad community",
      "Spouse and children can accompany (dependent pass)"
    ],
    applicationProcess: [
      "Submit online application through Malaysia Digital Economy Corporation (MDEC)",
      "Upload required documents and pay application fee",
      "Wait for initial review and approval (typically 2-3 weeks)",
      "Receive approval letter and visa sticker instructions",
      "Visit Malaysian embassy/consulate for visa sticker placement",
      "Enter Malaysia and complete immigration procedures"
    ],
    requiredDocuments: [
      "Completed application form",
      "Passport-sized photographs",
      "Copy of passport bio page",
      "Employment contract or client agreements",
      "Bank statements (last 3 months)",
      "University degree or professional certificates",
      "Criminal background check (apostilled)",
      "Medical examination report",
      "Health insurance policy",
      "Proof of accommodation in Malaysia"
    ],
    processingTime: "2-4 weeks",
    renewability: "Renewable once for the same duration",
    familyInclusion: true,
    workRights: true,
    isPremium: false
  },
  {
    name: "Tech Entrepreneur (New)",
    slug: "tech-entrepreneur-new",
    duration: "1 year (renewable upon achievement)",
    eligibility: "Tech founder with no prior track record",
    minimumIncome: "RM 50,000 bank savings",
    applicationFee: "RM 2,700",
    description: "Designed for aspiring tech entrepreneurs starting their first venture in Malaysia's thriving startup ecosystem.",
    requirements: [
      "Tech-related business proposal",
      "Minimum RM 50,000 in personal savings",
      "Business plan with clear milestones",
      "Letter of recommendation from industry professional",
      "Proof of technical skills or relevant education"
    ],
    benefits: [
      "Access to Malaysia's startup ecosystem",
      "Networking opportunities with investors",
      "Government support programs",
      "Tax incentives for new businesses",
      "Work authorization for your own company",
      "Path to permanent residency"
    ],
    applicationProcess: [
      "Prepare comprehensive business plan",
      "Submit application to Malaysia Digital Economy Corporation (MDEC)",
      "Attend virtual or in-person interview",
      "Receive conditional approval",
      "Establish business entity in Malaysia",
      "Complete final documentation and receive visa"
    ],
    requiredDocuments: [
      "Detailed business plan (minimum 20 pages)",
      "Financial statements and bank certificates",
      "Academic qualifications and certifications",
      "Professional references and recommendations",
      "Prototype or proof of concept documentation",
      "Market research and competitor analysis",
      "Personal statement and motivation letter"
    ],
    processingTime: "4-8 weeks",
    renewability: "Renewable based on business performance and milestones achieved",
    familyInclusion: false,
    workRights: true,
    isPremium: true
  },
  {
    name: "Tech Entrepreneur (Experienced)",
    slug: "tech-entrepreneur-experienced",
    duration: "5 years",
    eligibility: "Tech founder with >2 years track record",
    minimumIncome: "RM 180,000/year",
    applicationFee: "RM 5,400",
    description: "For established tech entrepreneurs with proven track records looking to expand their operations to Malaysia.",
    requirements: [
      "Minimum 2 years entrepreneurial experience",
      "Annual income of RM 180,000 or equivalent",
      "Proven business track record",
      "Investment commitment in Malaysia",
      "Clear business expansion plan"
    ],
    benefits: [
      "5-year visa validity",
      "Multiple entry privileges",
      "Fast-track business registration",
      "Access to government incentives",
      "Mentorship from successful entrepreneurs",
      "Family inclusion possible",
      "Path to permanent residency"
    ],
    applicationProcess: [
      "Submit comprehensive application with business history",
      "Provide detailed expansion plan for Malaysia",
      "Undergo due diligence and background checks",
      "Present business case to evaluation committee",
      "Receive approval and complete business setup",
      "Obtain visa and begin operations"
    ],
    requiredDocuments: [
      "Business registration certificates from previous ventures",
      "Audited financial statements (last 2 years)",
      "Tax returns and income documentation",
      "Bank statements and asset declarations",
      "Business portfolio and success stories",
      "Malaysia expansion business plan",
      "Professional references from industry leaders",
      "Investment commitment documentation"
    ],
    processingTime: "6-12 weeks",
    renewability: "Renewable for additional 5-year periods",
    familyInclusion: true,
    workRights: true,
    isPremium: true
  },
  {
    name: "Employment Pass",
    slug: "employment-pass",
    duration: "1 to 5 years (based on contract)",
    eligibility: "Offer of employment from Malaysian company",
    minimumIncome: "Varies by job/sector",
    applicationFee: "Varies",
    description: "Standard work visa for skilled professionals with job offers from Malaysian companies.",
    requirements: [
      "Job offer from Malaysian company",
      "University degree or professional qualifications",
      "Relevant work experience",
      "Medical examination",
      "Security clearance"
    ],
    benefits: [
      "Legal authorization to work in Malaysia",
      "Multiple entry visa",
      "Ability to open bank accounts",
      "Access to healthcare",
      "Family dependent visa options",
      "Path to permanent residency"
    ],
    applicationProcess: [
      "Malaysian employer submits application to Immigration Department",
      "Approval letter issued to employer",
      "Employee applies for visa at Malaysian embassy/consulate",
      "Complete medical examination",
      "Submit passport for visa sticker",
      "Enter Malaysia and complete registration"
    ],
    requiredDocuments: [
      "Passport with minimum 18 months validity",
      "Employment contract",
      "Academic certificates (verified)",
      "Professional qualification certificates",
      "Resume and work experience letters",
      "Medical examination report",
      "Police clearance certificate",
      "Passport-sized photographs"
    ],
    processingTime: "4-6 weeks",
    renewability: "Renewable based on continued employment",
    familyInclusion: true,
    workRights: true,
    isPremium: false
  },
  {
    name: "Student Visa",
    slug: "student-visa",
    duration: "1 to 5 years",
    eligibility: "Enrollment in recognized Malaysian institutions",
    minimumIncome: "Proof of funds for tuition/living",
    applicationFee: "Varies",
    description: "For international students pursuing education at recognized Malaysian institutions.",
    requirements: [
      "Acceptance letter from recognized institution",
      "Proof of financial capability",
      "Academic transcripts",
      "Medical examination",
      "Good conduct certificate"
    ],
    benefits: [
      "Study at top Malaysian universities",
      "Part-time work privileges (limited hours)",
      "Multicultural learning environment",
      "Affordable quality education",
      "Gateway to employment opportunities",
      "Cultural immersion experience"
    ],
    applicationProcess: [
      "Apply and receive acceptance from Malaysian institution",
      "Institution submits visa application on student's behalf",
      "Receive approval letter",
      "Apply for entry visa at Malaysian embassy",
      "Enter Malaysia and complete student pass formalities",
      "Register with institution and immigration"
    ],
    requiredDocuments: [
      "Letter of acceptance from institution",
      "Academic transcripts and certificates",
      "Financial guarantee or bank statements",
      "Medical examination report",
      "Good conduct certificate",
      "Passport with sufficient validity",
      "Passport-sized photographs",
      "Scholarship letters (if applicable)"
    ],
    processingTime: "2-6 weeks",
    renewability: "Renewable throughout study duration",
    familyInclusion: false,
    workRights: false,
    isPremium: false
  }
];

export async function seedVisaTypes() {
  try {
    console.log("Seeding visa types...");
    
    for (const visaTypeData of visaTypesData) {
      const [existingVisa] = await db
        .select()
        .from(visaTypes)
        .where(eq(visaTypes.slug, visaTypeData.slug));
      
      if (!existingVisa) {
        await db.insert(visaTypes).values(visaTypeData);
        console.log(`Created visa type: ${visaTypeData.name}`);
      } else {
        console.log(`Visa type already exists: ${visaTypeData.name}`);
      }
    }
    
    console.log("Visa types seeding completed");
  } catch (error) {
    console.error("Error seeding visa types:", error);
    throw error;
  }
}