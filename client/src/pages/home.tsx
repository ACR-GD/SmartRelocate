import { useState } from "react";
import { Link } from "wouter";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import VisaTypes from "@/components/visa-types";
import AnimatedWizard from "@/components/animated-wizard";
import ChatSection from "@/components/chat-section";
import EmailCapture from "@/components/email-capture";
import Footer from "@/components/footer";
import LanguageSelector from "@/components/language-selector";
import Pricing from "@/components/pricing";
import PricingTable from "@/components/pricing-table";
import ExportChecklist from "@/components/export-checklist";
import BudgetCalculator from "@/components/budget-calculator";
import EmailExport from "@/components/email-export";
import { useTranslation } from "@/hooks/use-language";
import { useUserPlan } from "@/hooks/use-user-plan";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showEmailExport, setShowEmailExport] = useState(false);
  const t = useTranslation();
  const { userPlan } = useUserPlan();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-blue-800 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">SmartRelocate.ai</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{t.smartRelocateDescription}</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-red-600 transition-colors text-sm lg:text-base">{t.howItWorksTitle}</a>
              <a href="#visa-types" className="text-gray-600 hover:text-red-600 transition-colors text-sm lg:text-base">{t.visaTypesTitle}</a>
              <a href="/city-comparison" className="text-gray-600 hover:text-red-600 transition-colors text-sm lg:text-base">🏙️ <span className="hidden xl:inline">{t.compareMalaysianCities}</span></a>
              <a href="/pdf-guide" className="text-gray-600 hover:text-red-600 transition-colors text-sm lg:text-base">📄 <span className="hidden xl:inline">{t.getPdfGuide}</span></a>
              <button 
                onClick={() => setShowPricing(!showPricing)}
                className="text-gray-600 hover:text-red-600 transition-colors text-sm lg:text-base"
              >
                {t.pricing}
              </button>
              <div className="text-xs lg:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {userPlan}
              </div>
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
              <a href="#how-it-works" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-red-600 transition-colors py-2">{t.howItWorksTitle}</a>
              <a href="#visa-types" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-red-600 transition-colors py-2">{t.visaTypesTitle}</a>
              <a href="/city-comparison" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-red-600 transition-colors py-2">🏙️ {t.compareMalaysianCities}</a>
              <a href="/pdf-guide" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-red-600 transition-colors py-2">📄 {t.getPdfGuide}</a>
              <button 
                onClick={() => { setShowPricing(!showPricing); setShowMobileMenu(false); }}
                className="block w-full text-left text-gray-600 hover:text-red-600 transition-colors py-2"
              >
                {t.pricing}
              </button>
              <div className="py-2">
                <div className="text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded-full inline-block">
                  {t.currentPlan}: {userPlan}
                </div>
              </div>
              <div className="pt-2">
                <LanguageSelector />
              </div>
            </div>
          )}
        </div>
      </header>

      <HeroSection onStartChat={() => setShowWizard(true)} />
      <HowItWorks />
      <VisaTypes />
      
      {showPricing && (
        <>
          <Pricing />
          <div id="pricing-table">
            <PricingTable />
          </div>
        </>
      )}

      {showEmailExport && (
        <section className="py-20 bg-white">
          <EmailExport />
        </section>
      )}
      
      {showWizard && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t.wizardTitle}</h2>
                <button 
                  onClick={() => setShowWizard(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <AnimatedWizard onShowPricing={() => setShowPricing(true)} />
            </div>
          </div>
        </div>
      )}
      

      
      {/* City Comparison Feature Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏙️ {t.compareMalaysianCities}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.cityComparisonDescription}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">{t.costAnalysis}</h3>
              <p className="text-gray-600">{t.costAnalysisDescription}</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">{t.lifestyleMetrics}</h3>
              <p className="text-gray-600">{t.lifestyleMetricsDescription}</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">{t.practicalInfo}</h3>
              <p className="text-gray-600">{t.practicalInfoDescription}</p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/city-comparison"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-blue-800 text-white font-semibold rounded-lg hover:from-red-700 hover:to-blue-900 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">🏙️</span>
              {t.startComparingCities}
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <ChatSection onStartChat={() => setShowWizard(true)} />
      
      {/* Pricing Section - Always Visible */}
      <Pricing />
      <div id="pricing-table">
        <PricingTable />
      </div>
      
      <EmailCapture />
      <Footer />
    </div>
  );
}
