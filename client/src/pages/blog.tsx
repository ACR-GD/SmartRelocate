import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Eye, Search, Tag } from "lucide-react";
import { useTranslation } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface BlogPost {
  id: number;
  slug: string;
  titleEn: string;
  titleFr: string;
  titleAr: string;
  excerptEn: string;
  excerptFr: string;
  excerptAr: string;
  featuredImageUrl?: string;
  publishedAt: string;
  tags: string[];
  readingTimeMinutes: number;
  viewCount: number;
}

interface BlogCategory {
  id: number;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  slug: string;
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const { language } = useTranslation();

  const { data: posts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
  });

  const { data: categories = [] } = useQuery<BlogCategory[]>({
    queryKey: ['/api/blog/categories'],
  });

  // Get all unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const title = language === 'fr' ? post.titleFr || post.titleEn : 
                  language === 'ar' ? post.titleAr || post.titleEn : post.titleEn;
    const excerpt = language === 'fr' ? post.excerptFr || post.excerptEn : 
                   language === 'ar' ? post.excerptAr || post.excerptEn : post.excerptEn;
    
    const matchesSearch = searchTerm === "" || 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || true; // TODO: Implement category filtering
    const matchesTag = selectedTag === "all" || (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const getLocalizedTitle = (post: BlogPost) => {
    return language === 'fr' ? post.titleFr || post.titleEn : 
           language === 'ar' ? post.titleAr || post.titleEn : post.titleEn;
  };

  const getLocalizedExcerpt = (post: BlogPost) => {
    return language === 'fr' ? post.excerptFr || post.excerptEn : 
           language === 'ar' ? post.excerptAr || post.excerptEn : post.excerptEn;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'fr' ? 'fr-FR' : 
                                                  language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (postsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Malaysia Relocation Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, guides, and tips for successfully relocating to Malaysia as a tech professional or digital nomad.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {language === 'fr' ? category.nameFr || category.nameEn : 
                     language === 'ar' ? category.nameAr || category.nameEn : category.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="All Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedTag("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later for new content.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  {post.featuredImageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featuredImageUrl} 
                        alt={getLocalizedTitle(post)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishedAt)}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4" />
                      {post.readingTimeMinutes} min read
                      <span className="mx-2">•</span>
                      <Eye className="w-4 h-4" />
                      {post.viewCount}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {getLocalizedTitle(post)}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {getLocalizedExcerpt(post)}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full" variant="outline">
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest Malaysia relocation insights, visa updates, and expert tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              className="bg-white text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}