import { useTranslation } from "@/hooks/use-language";

export default function VisaTypes() {
  const t = useTranslation();
  
  const visaTypes = [
    {
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
        </svg>
      ),
      title: t.deRantauTitle,
      category: t.digitalNomads,
      description: t.deRantauDescription,
      features: [
        t.deRantauFeature1,
        t.deRantauFeature2,
        t.deRantauFeature3
      ],
      buttonColor: "bg-green-50 hover:bg-green-100 text-green-700",
      categoryColor: "text-green-600"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      title: t.mm2hTitle,
      category: t.longTermResidence,
      description: t.mm2hDescription,
      features: [
        t.mm2hFeature1,
        t.mm2hFeature2,
        t.mm2hFeature3
      ],
      buttonColor: "bg-blue-50 hover:bg-blue-100 text-blue-700",
      categoryColor: "text-blue-600"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: t.employmentPassTitle,
      category: t.workVisa,
      description: t.employmentPassDescription,
      features: [
        t.employmentPassFeature1,
        t.employmentPassFeature2,
        t.employmentPassFeature3
      ],
      buttonColor: "bg-purple-50 hover:bg-purple-100 text-purple-700",
      categoryColor: "text-purple-600"
    }
  ];

  return (
    <section id="visa-types" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{t.visaTypesTitle}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0">{t.visaTypesDescription}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visaTypes.map((visa, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gray-100 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {visa.icon}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{visa.title}</h3>
                  <p className={`text-xs sm:text-sm font-medium ${visa.categoryColor}`}>{visa.category}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{visa.description}</p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {visa.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-xs sm:text-sm text-gray-600">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full font-semibold py-3 rounded-xl transition-colors ${visa.buttonColor}`}>
                {t.learnMore}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
