import CityComparisonTool from "@/components/city-comparison-tool";

export default function CityComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <CityComparisonTool />
      </div>
    </div>
  );
}