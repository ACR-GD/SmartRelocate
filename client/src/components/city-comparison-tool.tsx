import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, DollarSign, Users, Wifi, Car, Home, Utensils, Activity } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-language";

interface CityData {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  population: string;
  overview: string;
  livingCosts: {
    rent1BR: { min: number; max: number; };
    rent3BR: { min: number; max: number; };
    food: { min: number; max: number; };
    transport: { min: number; max: number; };
    utilities: { min: number; max: number; };
    total: { min: number; max: number; };
  };
  lifestyle: {
    nightlife: number;
    culture: number;
    safety: number;
    expat: number;
    nature: number;
    shopping: number;
  };
  practical: {
    internet: string;
    publicTransport: string;
    english: string;
    visa: string;
  };
  highlights: string[];
  considerations: string[];
}

const getCityData = (t: any): CityData[] => [
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    emoji: '🏙️',
    tagline: t.kualaLumpurTagline,
    population: '1.8M',
    overview: t.kualaLumpurOverview,
    livingCosts: {
      rent1BR: { min: 300, max: 800 },
      rent3BR: { min: 600, max: 1500 },
      food: { min: 200, max: 400 },
      transport: { min: 50, max: 100 },
      utilities: { min: 50, max: 100 },
      total: { min: 600, max: 1400 }
    },
    lifestyle: {
      nightlife: 95,
      culture: 90,
      safety: 85,
      expat: 95,
      nature: 70,
      shopping: 100
    },
    practical: {
      internet: `${t.fiberInternet} 📶`,
      publicTransport: `${t.excellentMRT} 🚇`,
      english: `${t.widelySpoken} 🗣️`,
      visa: `${t.allVisaTypes} 📋`
    },
    highlights: [
      `🏢 ${t.majorBusinessHub}`,
      `🍜 ${t.incredibleFoodScene}`,
      `🛍️ ${t.worldClassShopping}`,
      `🚇 ${t.modernTransportSystem}`,
      `🌍 ${t.internationalExpats}`
    ],
    considerations: [
      `🚗 ${t.heavyTrafficCongestion}`,
      `💰 ${t.higherLivingCosts}`,
      `🌧️ ${t.frequentRainfall}`,
      `🏙️ ${t.urbanStressFastPaced}`
    ]
  },
  {
    id: 'penang',
    name: 'Penang',
    emoji: '🏝️',
    tagline: t.penangTagline,
    population: '750K',
    overview: t.penangOverview,
    livingCosts: {
      rent1BR: { min: 250, max: 600 },
      rent3BR: { min: 450, max: 1000 },
      food: { min: 150, max: 300 },
      transport: { min: 30, max: 80 },
      utilities: { min: 40, max: 80 },
      total: { min: 470, max: 1060 }
    },
    lifestyle: {
      nightlife: 75,
      culture: 100,
      safety: 90,
      expat: 85,
      nature: 85,
      shopping: 80
    },
    practical: {
      internet: '50-100 Mbps fiber 📶',
      publicTransport: 'Limited buses 🚌',
      english: 'Widely spoken 🗣️',
      visa: 'Most visa types 📋'
    },
    highlights: [
      `🏛️ ${t.unescoWorldHeritage}`,
      `🍲 ${t.legendaryStreetFood}`,
      `🏖️ ${t.beautifulBeaches}`,
      `🎨 ${t.excellentFoodCulture}`,
      `😌 ${t.relaxedPace}`
    ],
    considerations: [
      `🚗 ${t.limitedPublicTransport}`,
      `🏝️ ${t.touristCrowds}`,
      `💼 ${t.limitedJobOpportunities}`,
      `🌊 ${t.hotHumidClimate}`
    ]
  },
  {
    id: 'johor-bahru',
    name: 'Johor Bahru',
    emoji: '🌉',
    tagline: t.johorBahruTagline,
    population: '500K',
    overview: t.johorBahruOverview,
    livingCosts: {
      rent1BR: { min: 200, max: 500 },
      rent3BR: { min: 350, max: 800 },
      food: { min: 150, max: 300 },
      transport: { min: 40, max: 70 },
      utilities: { min: 40, max: 70 },
      total: { min: 430, max: 940 }
    },
    lifestyle: {
      nightlife: 60,
      culture: 70,
      safety: 75,
      expat: 70,
      nature: 65,
      shopping: 85
    },
    practical: {
      internet: '50-100 Mbps 📶',
      publicTransport: 'Buses and new MRT 🚌',
      english: 'Commonly used 🗣️',
      visa: 'Most visa types 📋'
    },
    highlights: [
      `🇸🇬 ${t.easyCommuteToSingapore}`,
      `💰 ${t.veryAffordableLiving}`,
      `🏬 ${t.greatShoppingMalls}`,
      `🍜 ${t.excellentLocalFood}`,
      `🏠 ${t.goodValueProperty}`
    ],
    considerations: [
      `🚗 ${t.heavyBorderTraffic}`,
      `🏙️ ${t.lessCulturalAttractions}`,
      `🌧️ ${t.limitedEntertainment}`,
      `💼 ${t.dependenceOnSingapore}`
    ]
  },
  {
    id: 'kota-kinabalu',
    name: 'Kota Kinabalu',
    emoji: '🏔️',
    tagline: t.kotaKinabaluTagline,
    population: '500K',
    overview: t.kotaKinabaluOverview,
    livingCosts: {
      rent1BR: { min: 250, max: 550 },
      rent3BR: { min: 400, max: 900 },
      food: { min: 180, max: 350 },
      transport: { min: 50, max: 90 },
      utilities: { min: 60, max: 120 },
      total: { min: 540, max: 1110 }
    },
    lifestyle: {
      nightlife: 50,
      culture: 80,
      safety: 85,
      expat: 60,
      nature: 100,
      shopping: 60
    },
    practical: {
      internet: '30-50 Mbps 📶',
      publicTransport: 'Limited buses 🚌',
      english: 'Commonly spoken 🗣️',
      visa: 'Most visa types 📋'
    },
    highlights: [
      `🏔️ ${t.accessToMountKinabalu}`,
      `🏝️ ${t.beautifulIslandsDiving}`,
      `🐒 ${t.amazingWildlifeNature}`,
      `🌅 ${t.stunningBeaches}`,
      `👥 ${t.friendlyLocalCommunities}`
    ],
    considerations: [
      `✈️ ${t.expensiveFlights}`,
      `🛍️ ${t.limitedShopping}`,
      `📶 ${t.slowerInternet}`,
      `💼 ${t.fewerCareerOpportunities}`
    ]
  },
  {
    id: 'melaka',
    name: 'Melaka',
    emoji: '🏛️',
    tagline: t.melakaTagline,
    population: '500K',
    overview: t.melakaOverview,
    livingCosts: {
      rent1BR: { min: 200, max: 450 },
      rent3BR: { min: 350, max: 750 },
      food: { min: 150, max: 280 },
      transport: { min: 30, max: 60 },
      utilities: { min: 40, max: 70 },
      total: { min: 420, max: 860 }
    },
    lifestyle: {
      nightlife: 40,
      culture: 95,
      safety: 90,
      expat: 50,
      nature: 60,
      shopping: 65
    },
    practical: {
      internet: '50-100 Mbps 📶',
      publicTransport: 'Limited options 🚌',
      english: 'Moderately spoken 🗣️',
      visa: 'Most visa types 📋'
    },
    highlights: [
      `🏛️ ${t.richHistoricalArchitecture}`,
      `🚤 ${t.scenicMelakaRiver}`,
      `🍜 ${t.authenticPeranakanCuisine}`,
      `💰 ${t.veryAffordableLiving}`,
      `🎭 ${t.culturalFestivals}`
    ],
    considerations: [
      `🌃 ${t.limitedNightlife}`,
      `💼 ${t.fewerCareerOpportunities}`,
      `🚗 ${t.carNeededConvenience}`,
      `👥 ${t.smallerExpatCommunity}`
    ]
  },
  {
    id: 'langkawi',
    name: 'Langkawi',
    emoji: '🏖️',
    tagline: t.langkawiTagline,
    population: '100K',
    overview: t.langkawiOverview,
    livingCosts: {
      rent1BR: { min: 300, max: 700 },
      rent3BR: { min: 500, max: 1200 },
      food: { min: 200, max: 400 },
      transport: { min: 60, max: 100 },
      utilities: { min: 50, max: 90 },
      total: { min: 610, max: 1290 }
    },
    lifestyle: {
      nightlife: 45,
      culture: 60,
      safety: 95,
      expat: 70,
      nature: 95,
      shopping: 70
    },
    practical: {
      internet: '20-50 Mbps 📶',
      publicTransport: 'Very limited 🚗',
      english: 'Tourism English 🗣️',
      visa: 'Tourist focused 📋'
    },
    highlights: [
      `🏖️ ${t.pristineBeaches}`,
      `🛍️ ${t.dutyFreeShopping}`,
      `🌴 ${t.tropicalIslandLifestyle}`,
      `⛵ ${t.waterSportsActivities}`,
      `🦅 ${t.cableCarNatureTours}`
    ],
    considerations: [
      `🏝️ ${t.islandIsolation}`,
      `💼 ${t.veryLimitedJobMarket}`,
      `🚗 ${t.carEssentialTransport}`,
      `📶 ${t.slowerInternetConnectivity}`
    ]
  }
];

export default function CityComparisonTool() {
  const { t } = useLanguage();
  const [selectedCities, setSelectedCities] = useState<string[]>(['kuala-lumpur', 'penang']);
  const [activeTab, setActiveTab] = useState('overview');
  
  const cityData = getCityData(t);

  const toggleCity = (cityId: string) => {
    if (selectedCities.includes(cityId)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter(id => id !== cityId));
      }
    } else if (selectedCities.length < 3) {
      setSelectedCities([...selectedCities, cityId]);
    }
  };

  const getSelectedCityData = () => {
    return cityData.filter(city => selectedCities.includes(city.id));
  };

  const formatCurrency = (amount: number) => `$${amount}`;

  const getLifestyleColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🏙️ {t.malaysiaCityComparisonTool}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t.compareLivingCostsLifestyle}
        </p>
      </div>

      {/* City Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t.selectCitiesToCompare}</CardTitle>
          <CardDescription>
            {t.chooseMalaysianCities}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cityData.map((city) => (
              <Button
                key={city.id}
                variant={selectedCities.includes(city.id) ? "default" : "outline"}
                onClick={() => toggleCity(city.id)}
                disabled={!selectedCities.includes(city.id) && selectedCities.length >= 3}
                className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[120px]"
              >
                <span className="text-2xl">{city.emoji}</span>
                <span className="text-sm font-medium text-center">{city.name}</span>
                <span className="text-xs text-center text-gray-500 dark:text-gray-400 leading-tight px-1">
                  {city.tagline}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">🏘️ {t.overview}</TabsTrigger>
          <TabsTrigger value="costs" className="text-xs sm:text-sm">💰 {t.livingCosts}</TabsTrigger>
          <TabsTrigger value="lifestyle" className="text-xs sm:text-sm">🎯 {t.lifestyle}</TabsTrigger>
          <TabsTrigger value="practical" className="text-xs sm:text-sm">⚙️ {t.practical}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {getSelectedCityData().map((city) => (
              <Card key={city.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl flex-shrink-0">{city.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <span className="truncate">{city.name}</span>
                        <Badge variant="secondary" className="text-xs w-fit">{city.population}</Badge>
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {city.tagline}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {city.overview}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✨ {t.highlights}</h4>
                    <ul className="space-y-1">
                      {city.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                        <li key={idx} className="text-sm">{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">⚠️ {t.considerations}</h4>
                    <ul className="space-y-1">
                      {city.considerations.slice(0, 2).map((consideration: string, idx: number) => (
                        <li key={idx} className="text-sm">{consideration}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="costs">
          <div className="space-y-6">
            {/* Cost Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {getSelectedCityData().map((city) => (
                <Card key={city.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span>{city.emoji}</span>
                      <span className="truncate">{city.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(city.livingCosts.total.min)} - {formatCurrency(city.livingCosts.total.max)}
                      </div>
                      <div className="text-sm text-gray-500">{t.totalMonthly}</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">🏠 {t.rent1BR}</span>
                        <span className="font-medium">
                          {formatCurrency(city.livingCosts.rent1BR.min)}-{formatCurrency(city.livingCosts.rent1BR.max)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">🍜 {t.food}</span>
                        <span className="font-medium text-xs sm:text-sm">
                          {formatCurrency(city.livingCosts.food.min)}-{formatCurrency(city.livingCosts.food.max)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">🚗 {t.transport}</span>
                        <span className="font-medium text-xs sm:text-sm">
                          {formatCurrency(city.livingCosts.transport.min)}-{formatCurrency(city.livingCosts.transport.max)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">⚡ {t.utilities}</span>
                        <span className="font-medium text-xs sm:text-sm">
                          {formatCurrency(city.livingCosts.utilities.min)}-{formatCurrency(city.livingCosts.utilities.max)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lifestyle">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getSelectedCityData().map((city) => (
              <Card key={city.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{city.emoji}</span>
                    {city.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(city.lifestyle).map(([key, value]) => {
                    const labels = {
                      nightlife: '🌙 Nightlife',
                      culture: '🎨 Culture',
                      safety: '🛡️ Safety',
                      expat: '👥 Expat Community',
                      nature: '🌿 Nature Access',
                      shopping: '🛍️ Shopping'
                    };
                    
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{labels[key as keyof typeof labels]}</span>
                          <span className="text-sm font-bold">{value}%</span>
                        </div>
                        <Progress 
                          value={value} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practical">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {getSelectedCityData().map((city) => (
              <Card key={city.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span>{city.emoji}</span>
                    <span className="truncate">{city.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium flex-shrink-0">{t.internetSpeeds}</span>
                      <span className="text-sm text-right ml-2">{city.practical.internet}</span>
                    </div>
                    <div className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium flex-shrink-0">{t.transportOptions}</span>
                      <span className="text-sm text-right ml-2">{city.practical.publicTransport}</span>
                    </div>
                    <div className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium flex-shrink-0">{t.englishUsage}</span>
                      <span className="text-sm text-right ml-2">{city.practical.english}</span>
                    </div>
                    <div className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium flex-shrink-0">{t.visaRequirements}</span>
                      <span className="text-sm text-right ml-2">{city.practical.visa}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}