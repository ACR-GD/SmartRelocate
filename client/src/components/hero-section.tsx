import { useLanguage } from "@/hooks/use-language";

interface HeroSectionProps {
  onStartChat: () => void;
}

export default function HeroSection({ onStartChat }: HeroSectionProps) {
  const { t } = useLanguage();
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-3 py-2 mb-4 sm:mb-6 text-xs sm:text-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{t.heroTitle}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {t.moveToMalaysia} <span className="text-yellow-400">{t.withConfidence}</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed px-2 sm:px-0">
              {t.personalizedGuidance}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <button 
                onClick={onStartChat}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center w-full sm:w-auto"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                {t.startYourJourney}
              </button>
              <a 
                href="/free-pdf"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center w-full sm:w-auto"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {t.downloadFreeGuide}
              </a>
            </div>
          </div>
          
          {/* Chat Preview */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-800 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">SmartRelocate AI</h3>
                <p className="text-sm text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  {t.online}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 text-gray-800">
                <p className="text-sm">{t.welcomeMessage}</p>
              </div>
              <div className="bg-red-600 rounded-2xl rounded-tr-sm p-4 text-white ml-8">
                <p className="text-sm">{t.userExampleMessage}</p>
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 text-gray-800">
                <p className="text-sm">{t.aiResponseMessage}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="ml-2 text-sm">{t.aiIsTyping}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
