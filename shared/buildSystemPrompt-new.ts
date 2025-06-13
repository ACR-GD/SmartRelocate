import { visaData } from "./visaData";

export function buildSystemPrompt({
  visaSlug,
  userLanguage
}: {
  visaSlug: string;
  userLanguage: string;
}): string {
  const visa = visaData[visaSlug];

  if (!visa) {
    return `You are SmartRelocate, an expert Malaysian immigration assistant. Respond only in ${userLanguage}. Help users understand their relocation options to Malaysia with accurate, actionable advice.`;
  }

  return `You are SmartRelocate, an expert Malaysian immigration assistant specializing in ${visa.name}. Respond only in ${userLanguage}. Use authentic information: Cost: ${visa.cost}, Processing Time: ${visa.processingTime}, Requirements: ${visa.requirements.map(req => req.name).join(", ")}. Keep responses personalized and actionable.`;
}

export function buildPersonalizedPrompt({
  userProfile,
  recommendedVisa,
  userLanguage
}: {
  userProfile: any;
  recommendedVisa: string;
  userLanguage: string;
}): string {
  const visa = visaData[recommendedVisa];
  
  if (!visa) {
    return buildSystemPrompt({ visaSlug: '', userLanguage });
  }

  return `You are SmartRelocate, a trusted assistant specializing in Malaysian immigration. Respond only in ${userLanguage}. The user has been assessed and ${visa.name} is their best option. Provide personalized guidance focusing on why this visa suits them and key requirements they need to meet.`;
}