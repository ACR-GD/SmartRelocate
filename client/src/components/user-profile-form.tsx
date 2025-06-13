import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-language";
import { UserProfile } from "@shared/eligibilityScoring";

interface UserProfileFormProps {
  onProfileSubmit: (profile: UserProfile) => void;
  initialProfile?: Partial<UserProfile>;
}

export default function UserProfileForm({ onProfileSubmit, initialProfile = {} }: UserProfileFormProps) {
  const t = useTranslation();
  const [profile, setProfile] = useState<UserProfile>({
    nationality: initialProfile.nationality || "",
    age: initialProfile.age || 25,
    profession: initialProfile.profession || "",
    experience: initialProfile.experience || 0,
    income: initialProfile.income || 0,
    familyStatus: initialProfile.familyStatus || "single",
    education: initialProfile.education || "bachelor",
    languageSkills: initialProfile.languageSkills || ["english"],
    assets: initialProfile.assets || 0,
    hasJobOffer: initialProfile.hasJobOffer || false,
    criminalRecord: initialProfile.criminalRecord || false,
    healthStatus: initialProfile.healthStatus || "good",
  });

  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");

  const professions = [
    "Software Engineer",
    "Data Scientist", 
    "Product Manager",
    "UX/UI Designer",
    "Marketing Specialist",
    "Consultant",
    "Finance Specialist",
    "Sales Manager",
    "Content Creator",
    "Project Manager",
    "Business Analyst",
    "DevOps Engineer",
    "Entrepreneur",
    "Freelancer",
    "Student",
    "Other"
  ];

  const ageRanges = [
    { label: "18-24 years", value: 21 },
    { label: "25-29 years", value: 27 },
    { label: "30-34 years", value: 32 },
    { label: "35-39 years", value: 37 },
    { label: "40-44 years", value: 42 },
    { label: "45-49 years", value: 47 },
    { label: "50-54 years", value: 52 },
    { label: "55+ years", value: 57 }
  ];

  const experienceRanges = [
    { label: "0-1 years", value: 0.5 },
    { label: "2-3 years", value: 2.5 },
    { label: "4-5 years", value: 4.5 },
    { label: "6-8 years", value: 7 },
    { label: "9-12 years", value: 10.5 },
    { label: "13-15 years", value: 14 },
    { label: "16+ years", value: 18 }
  ];

  const incomeRanges = [
    { label: "$15,000 - $25,000", value: 20000 },
    { label: "$25,000 - $35,000", value: 30000 },
    { label: "$35,000 - $50,000", value: 42500 },
    { label: "$50,000 - $75,000", value: 62500 },
    { label: "$75,000 - $100,000", value: 87500 },
    { label: "$100,000 - $150,000", value: 125000 },
    { label: "$150,000 - $200,000", value: 175000 },
    { label: "$200,000 - $300,000", value: 250000 },
    { label: "$300,000+", value: 350000 }
  ];

  const assetRanges = [
    { label: "$0 - $5,000", value: 2500 },
    { label: "$5,000 - $15,000", value: 10000 },
    { label: "$15,000 - $30,000", value: 22500 },
    { label: "$30,000 - $50,000", value: 40000 },
    { label: "$50,000 - $100,000", value: 75000 },
    { label: "$100,000 - $250,000", value: 175000 },
    { label: "$250,000 - $500,000", value: 375000 },
    { label: "$500,000+", value: 750000 }
  ];

  const familySizes = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Married with children", value: "married_with_children" }
  ];

  const educationLevels = [
    { label: "High School", value: "high_school" },
    { label: "Bachelor's Degree", value: "bachelor" },
    { label: "Master's Degree", value: "master" },
    { label: "PhD/Doctorate", value: "phd" }
  ];

  const healthStatuses = [
    { label: "Excellent", value: "excellent" },
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ];

  const nationalities = [
    "United States", "Canada", "United Kingdom", "Germany", "France", 
    "Netherlands", "Spain", "Italy", "Australia", "New Zealand",
    "Singapore", "Japan", "South Korea", "China", "India", 
    "Brazil", "Argentina", "Mexico", "Thailand", "Philippines",
    "Indonesia", "Vietnam", "Other"
  ];

  const languages = [
    "English",
    "Mandarin",
    "Malay",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi"
  ];

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLanguage = (language: string) => {
    const langLower = language.toLowerCase();
    if (!profile.languageSkills.includes(langLower)) {
      handleInputChange("languageSkills", [...profile.languageSkills, langLower]);
    }
  };

  const removeLanguage = (language: string) => {
    handleInputChange("languageSkills", profile.languageSkills.filter(lang => lang !== language));
  };

  const handleAddCustomLanguage = () => {
    if (newLanguage.trim()) {
      addLanguage(newLanguage.trim());
      setNewLanguage("");
      setShowLanguageInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileSubmit(profile);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t.profileTitle}</CardTitle>
        <CardDescription>
          {t.profileDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t.basicInformation}</h3>
              
              <div>
                <Label htmlFor="nationality">{t.nationality}</Label>
                <Select value={profile.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectNationality} />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map(nationality => (
                      <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="age">{t.age}</Label>
                <Select value={profile.age.toString()} onValueChange={(value) => handleInputChange("age", parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.enterAge} />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map(range => (
                      <SelectItem key={range.value} value={range.value.toString()}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="profession">Profession</Label>
                <Select value={profile.profession} onValueChange={(value) => handleInputChange("profession", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {professions.map(prof => (
                      <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience">{t.experience}</Label>
                <Select value={profile.experience.toString()} onValueChange={(value) => handleInputChange("experience", parseFloat(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.enterExperience} />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceRanges.map(range => (
                      <SelectItem key={range.value} value={range.value.toString()}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="education">{t.education}</Label>
                <Select value={profile.education} onValueChange={(value) => handleInputChange("education", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectEducation} />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Financial & Employment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Financial & Employment</h3>
              
              <div>
                <Label htmlFor="income">{t.annualIncome}</Label>
                <Select value={profile.income.toString()} onValueChange={(value) => handleInputChange("income", parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.enterIncome} />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeRanges.map(range => (
                      <SelectItem key={range.value} value={range.value.toString()}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assets">{t.liquidAssets}</Label>
                <Select value={profile.assets.toString()} onValueChange={(value) => handleInputChange("assets", parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.enterAssets} />
                  </SelectTrigger>
                  <SelectContent>
                    {assetRanges.map(range => (
                      <SelectItem key={range.value} value={range.value.toString()}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="familyStatus">{t.familyStatus}</Label>
                <Select value={profile.familyStatus} onValueChange={(value) => handleInputChange("familyStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectFamilyStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    {familySizes.map(status => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="healthStatus">{t.healthStatus}</Label>
                <Select value={profile.healthStatus} onValueChange={(value) => handleInputChange("healthStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectHealthStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    {healthStatuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="jobOffer"
                    checked={profile.hasJobOffer}
                    onCheckedChange={(checked) => handleInputChange("hasJobOffer", checked)}
                  />
                  <Label htmlFor="jobOffer">I have a job offer in Malaysia</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="criminalRecord"
                    checked={profile.criminalRecord}
                    onCheckedChange={(checked) => handleInputChange("criminalRecord", checked)}
                  />
                  <Label htmlFor="criminalRecord">I have a criminal record</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Language Skills</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {profile.languageSkills.map(lang => (
                  <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang)}
                      className="ml-1 text-xs hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {languages
                  .filter(lang => !profile.languageSkills.includes(lang.toLowerCase()))
                  .map(lang => (
                    <Button
                      key={lang}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLanguage(lang)}
                    >
                      + {lang}
                    </Button>
                  ))}
              </div>

              {!showLanguageInput ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLanguageInput(true)}
                >
                  + Add other language
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter language"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomLanguage()}
                  />
                  <Button type="button" onClick={handleAddCustomLanguage}>Add</Button>
                  <Button type="button" variant="ghost" onClick={() => setShowLanguageInput(false)}>Cancel</Button>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Calculate Visa Eligibility
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}