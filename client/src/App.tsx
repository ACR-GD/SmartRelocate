import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { UserPlanProvider } from "@/hooks/use-user-plan";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AdminPage from "@/pages/admin";
import PdfGuidePage from "@/pages/pdf-guide";
import FreePdfPage from "@/pages/free-pdf";
import PdfSuccessPage from "@/pages/pdf-success";
import CityComparisonPage from "@/pages/city-comparison";
import StressReliefPage from "@/pages/stress-relief";
import VisaDetailPage from "@/pages/visa-detail";
import VisaOverviewPage from "@/pages/visa-overview";
import BlogPage from "@/pages/blog";
import BlogDetailPage from "@/pages/blog-detail";
import AdminBlogPage from "@/pages/admin-blog";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/pdf-guide" component={PdfGuidePage}/>
      <Route path="/free-pdf" component={FreePdfPage}/>
      <Route path="/pdf-guide/success" component={PdfSuccessPage}/>
      <Route path="/city-comparison" component={CityComparisonPage}/>
      <Route path="/stress-relief" component={StressReliefPage}/>
      <Route path="/admin" component={AdminPage}/>
      <Route path="/admin/blog" component={AdminBlogPage}/>
      <Route path="/blog" component={BlogPage}/>
      <Route path="/blog/:slug" component={BlogDetailPage}/>
      <Route path="/visa" component={VisaOverviewPage}/>
      <Route path="/visa/:slug" component={VisaDetailPage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserPlanProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </UserPlanProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
