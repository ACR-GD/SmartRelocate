import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Download, FileText, CheckCircle } from "lucide-react";

export default function FreePdfPage() {
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download-free-pdf');
      
      if (!response.ok) {
        throw new Error('PDF not available');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'free-malaysia-relocation-guide.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setDownloadCompleted(true);
    } catch (error) {
      alert('Free PDF is not available yet. Please check back later or contact support.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <FileText className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.freeGuideAvailable}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.freeGuideDescription}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Malaysia Relocation Starter Guide
              </h3>
              <p className="text-gray-600 mb-6">
                {t.basicRelocationInfo}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Basic visa overview</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Cost estimates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Key considerations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Essential contacts</span>
                </div>
              </div>

              {!downloadCompleted ? (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center"
                >
                  <Download className="w-5 h-5 mr-3" />
                  {isDownloading ? "Downloading..." : t.downloadFreeGuide}
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-green-800 font-medium">Download completed successfully!</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Free Starter Guide
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  PDF format • Instant download
                </p>
                <div className="text-xs text-gray-500">
                  No email required • No registration
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need More Detailed Information?
            </h3>
            <p className="text-gray-600 mb-4">
              Get our comprehensive $19 PDF guide with detailed visa requirements, step-by-step processes, and complete cost breakdowns.
            </p>
            <a
              href="/pdf-guide"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all inline-block"
            >
              View Premium Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}