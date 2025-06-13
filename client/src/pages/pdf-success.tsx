import { useEffect, useState } from 'react';
import { useTranslation } from "@/hooks/use-language";
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function PDFSuccess() {
  const t = useTranslation();
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
      
      // Simulate PDF generation and download
      setTimeout(() => {
        setDownloadUrl('/api/download-pdf/' + sessionIdParam);
        setIsLoading(false);
      }, 2000);
    } else {
      setError('Invalid session');
      setIsLoading(false);
    }
  }, []);

  const handleDownload = () => {
    if (downloadUrl) {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'malaysia-relocation-guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.error}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Link href="/pdf-guide">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              {t.back}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t.purchaseSuccessful}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.downloadLinkSentToEmail}
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Preparing your download...</span>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center mb-4"
          >
            <Download className="w-4 h-4 mr-2" />
            {t.downloadReport}
          </button>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            {t.whatsIncluded}:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 text-left">
            <li>• {t.completeVisaComparisonChart}</li>
            <li>• {t.costBreakdownByVisaType}</li>
            <li>• {t.stepByStepApplicationProcess}</li>
            <li>• {t.livingCostsByCity}</li>
            <li>• {t.frequentlyAskedQuestions}</li>
          </ul>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link href="/">
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              {t.home}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}