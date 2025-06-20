import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Eye, Tag, ArrowLeft, Share2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface BlogPost {
  id: number;
  slug: string;
  titleEn: string;
  titleFr: string;
  titleAr: string;
  contentEn: string;
  contentFr: string;
  contentAr: string;
  excerptEn: string;
  excerptFr: string;
  excerptAr: string;
  featuredImageUrl?: string;
  publishedAt: string;
  tags: string[];
  seoKeywords: string[];
  readingTimeMinutes: number;
  viewCount: number;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { language, t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ['/api/blog/posts', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      const response = await fetch(`/api/blog/posts/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    },
    enabled: !!slug
  });

  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts/related', post?.id],
    queryFn: async () => {
      if (!post?.id) throw new Error('No post ID provided');
      const response = await fetch(`/api/blog/posts/related/${post.id}`);
      if (!response.ok) throw new Error('Failed to fetch related posts');
      return response.json();
    },
    enabled: !!post?.id
  });

  const incrementViewsMutation = useMutation({
    mutationFn: async (postId: number) => {
      const response = await fetch(`/api/blog/posts/${postId}/views`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to increment views');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts', slug] });
    }
  });

  useEffect(() => {
    if (post?.id) {
      incrementViewsMutation.mutate(post.id);
    }
  }, [post?.id]);

  const getLocalizedContent = (post: BlogPost) => {
    const title = language === 'fr' ? post.titleFr || post.titleEn : 
                  language === 'ar' ? post.titleAr || post.titleEn : post.titleEn;
    const content = language === 'fr' ? post.contentFr || post.contentEn : 
                   language === 'ar' ? post.contentAr || post.contentEn : post.contentEn;
    return { title, content };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'fr' ? 'fr-FR' : 
                                                  language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: getLocalizedContent(post).title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { title, content } = getLocalizedContent(post);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/blog">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Image */}
          {post.featuredImageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <img 
                src={post.featuredImageUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTimeMinutes} min read
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.viewCount} views
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={sharePost}
              className="ml-auto"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </motion.div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 4).map((relatedPost) => {
                const relatedTitle = language === 'fr' ? relatedPost.titleFr || relatedPost.titleEn : 
                                   language === 'ar' ? relatedPost.titleAr || relatedPost.titleEn : relatedPost.titleEn;
                const relatedExcerpt = language === 'fr' ? relatedPost.excerptFr || relatedPost.excerptEn : 
                                     language === 'ar' ? relatedPost.excerptAr || relatedPost.excerptEn : relatedPost.excerptEn;

                return (
                  <Card key={relatedPost.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        {formatDate(relatedPost.publishedAt)}
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4" />
                        {relatedPost.readingTimeMinutes} min
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedTitle}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedExcerpt}
                      </p>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Malaysia Journey?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get personalized guidance for your relocation with our AI assessment tool or book a consultation with our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#wizard">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Get AI Assessment
              </Button>
            </Link>
            <Link href="/#consultation">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Book Consultation
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}