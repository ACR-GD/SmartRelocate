import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Eye, Calendar, Sparkles, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import AdminLogin from "@/components/admin-login";

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
  featuredImageUrl: string;
  isPublished: boolean;
  publishedAt: string;
  tags: string[];
  seoKeywords: string[];
  readingTimeMinutes: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface AIGenerationRequest {
  prompt: string;
  title?: string;
  category?: string;
  keywords?: string[];
}

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    titleEn: '',
    titleFr: '',
    titleAr: '',
    contentEn: '',
    contentFr: '',
    contentAr: '',
    excerptEn: '',
    excerptFr: '',
    excerptAr: '',
    featuredImageUrl: '',
    isPublished: false,
    tags: [] as string[],
    seoKeywords: [] as string[],
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTitle, setAiTitle] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_token');
        }
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
      });
    }
  }, []);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/admin/blog/posts'],
    queryFn: async () => {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/blog/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog/posts'] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({ title: "Success", description: "Blog post created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/blog/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to update post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog/posts'] });
      setIsEditDialogOpen(false);
      setSelectedPost(null);
      resetForm();
      toast({ title: "Success", description: "Blog post updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/blog/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to delete post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog/posts'] });
      toast({ title: "Success", description: "Blog post deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const generateWithAIMutation = useMutation({
    mutationFn: async (request: AIGenerationRequest) => {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/blog/generate', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to generate blog post');
      return response.json();
    },
    onSuccess: (data: any) => {
      setFormData({
        titleEn: data.titleEn,
        titleFr: data.titleFr || '',
        titleAr: data.titleAr || '',
        contentEn: data.contentEn,
        contentFr: data.contentFr || '',
        contentAr: data.contentAr || '',
        excerptEn: data.excerptEn,
        excerptFr: data.excerptFr || '',
        excerptAr: data.excerptAr || '',
        featuredImageUrl: '',
        isPublished: false,
        tags: data.tags || [],
        seoKeywords: data.seoKeywords || [],
      });
      setIsGenerating(false);
      setIsAIDialogOpen(false);
      setIsCreateDialogOpen(true);
      toast({ title: "Success", description: "Blog content generated successfully" });
    },
    onError: (error: any) => {
      setIsGenerating(false);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      titleEn: '',
      titleFr: '',
      titleAr: '',
      contentEn: '',
      contentFr: '',
      contentAr: '',
      excerptEn: '',
      excerptFr: '',
      excerptAr: '',
      featuredImageUrl: '',
      isPublished: false,
      tags: [],
      seoKeywords: [],
    });
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      titleEn: post.titleEn,
      titleFr: post.titleFr || '',
      titleAr: post.titleAr || '',
      contentEn: post.contentEn,
      contentFr: post.contentFr || '',
      contentAr: post.contentAr || '',
      excerptEn: post.excerptEn || '',
      excerptFr: post.excerptFr || '',
      excerptAr: post.excerptAr || '',
      featuredImageUrl: post.featuredImageUrl || '',
      isPublished: post.isPublished,
      tags: post.tags || [],
      seoKeywords: post.seoKeywords || [],
    });
    setIsEditDialogOpen(true);
  };

  const handleGenerateWithAI = () => {
    if (!aiPrompt.trim()) {
      toast({ title: "Error", description: "Please enter a prompt", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    const keywords = aiKeywords.split(',').map(k => k.trim()).filter(k => k);
    
    generateWithAIMutation.mutate({
      prompt: aiPrompt,
      title: aiTitle || undefined,
      keywords: keywords.length > 0 ? keywords : undefined,
    });
  };

  const handleSubmit = () => {
    if (!formData.titleEn || !formData.contentEn) {
      toast({ title: "Error", description: "Title and content in English are required", variant: "destructive" });
      return;
    }

    const postData = {
      ...formData,
      slug: formData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    if (selectedPost) {
      updatePostMutation.mutate({ id: selectedPost.id, data: postData });
    } else {
      createPostMutation.mutate(postData);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const addKeyword = (keyword: string) => {
    if (keyword && !formData.seoKeywords.includes(keyword)) {
      setFormData(prev => ({ ...prev, seoKeywords: [...prev.seoKeywords, keyword] }));
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({ 
      ...prev, 
      seoKeywords: prev.seoKeywords.filter(keyword => keyword !== keywordToRemove) 
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-2">Create and manage blog posts with AI-powered content generation</p>
          </div>
          
          <div className="flex gap-3">
            <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Generate Blog Post with AI</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="ai-prompt">Content Prompt *</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="Describe the blog post you want to create (e.g., 'A comprehensive guide to obtaining a DE Rantau visa for digital nomads moving to Malaysia')"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ai-title">Suggested Title (optional)</Label>
                    <Input
                      id="ai-title"
                      placeholder="Leave blank for AI to generate"
                      value={aiTitle}
                      onChange={(e) => setAiTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ai-keywords">Keywords (optional)</Label>
                    <Input
                      id="ai-keywords"
                      placeholder="malaysia visa, digital nomad, relocation (comma separated)"
                      value={aiKeywords}
                      onChange={(e) => setAiKeywords(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleGenerateWithAI} 
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="w-full"
                  >
                    {isGenerating ? "Generating..." : "Generate Content"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                </DialogHeader>
                <BlogPostForm 
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}
                  isLoading={createPostMutation.isPending}
                  addTag={addTag}
                  removeTag={removeTag}
                  addKeyword={addKeyword}
                  removeKeyword={removeKeyword}
                />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Blog Posts Table */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Posts ({posts.length})</h2>
          </div>
          
          {isLoading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-500 mb-6">Create your first blog post to get started</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {post.titleEn}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            /{post.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={post.isPublished ? "default" : "secondary"}>
                          {post.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1 text-gray-400" />
                          {post.viewCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePostMutation.mutate(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
            </DialogHeader>
            <BlogPostForm 
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedPost(null);
                resetForm();
              }}
              isLoading={updatePostMutation.isPending}
              addTag={addTag}
              removeTag={removeTag}
              addKeyword={addKeyword}
              removeKeyword={removeKeyword}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Blog Post Form Component
function BlogPostForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel, 
  isLoading,
  addTag,
  removeTag,
  addKeyword,
  removeKeyword
}: {
  formData: any;
  setFormData: any;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
}) {
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  return (
    <div className="space-y-6 py-4">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO & Tags</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          {/* Titles */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title-en">Title (English) *</Label>
              <Input
                id="title-en"
                value={formData.titleEn}
                onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                placeholder="Enter title in English"
              />
            </div>
            <div>
              <Label htmlFor="title-fr">Title (French)</Label>
              <Input
                id="title-fr"
                value={formData.titleFr}
                onChange={(e) => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                placeholder="Enter title in French"
              />
            </div>
            <div>
              <Label htmlFor="title-ar">Title (Arabic)</Label>
              <Input
                id="title-ar"
                value={formData.titleAr}
                onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                placeholder="Enter title in Arabic"
                dir="rtl"
              />
            </div>
          </div>

          <Separator />

          {/* Content */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="content-en">Content (English) *</Label>
              <Textarea
                id="content-en"
                value={formData.contentEn}
                onChange={(e) => setFormData(prev => ({ ...prev, contentEn: e.target.value }))}
                placeholder="Enter content in English (HTML supported)"
                rows={10}
              />
            </div>
            <div>
              <Label htmlFor="content-fr">Content (French)</Label>
              <Textarea
                id="content-fr"
                value={formData.contentFr}
                onChange={(e) => setFormData(prev => ({ ...prev, contentFr: e.target.value }))}
                placeholder="Enter content in French (HTML supported)"
                rows={10}
              />
            </div>
            <div>
              <Label htmlFor="content-ar">Content (Arabic)</Label>
              <Textarea
                id="content-ar"
                value={formData.contentAr}
                onChange={(e) => setFormData(prev => ({ ...prev, contentAr: e.target.value }))}
                placeholder="Enter content in Arabic (HTML supported)"
                rows={10}
                dir="rtl"
              />
            </div>
          </div>

          <Separator />

          {/* Excerpts */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="excerpt-en">Excerpt (English)</Label>
              <Textarea
                id="excerpt-en"
                value={formData.excerptEn}
                onChange={(e) => setFormData(prev => ({ ...prev, excerptEn: e.target.value }))}
                placeholder="Brief summary in English"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="excerpt-fr">Excerpt (French)</Label>
              <Textarea
                id="excerpt-fr"
                value={formData.excerptFr}
                onChange={(e) => setFormData(prev => ({ ...prev, excerptFr: e.target.value }))}
                placeholder="Brief summary in French"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="excerpt-ar">Excerpt (Arabic)</Label>
              <Textarea
                id="excerpt-ar"
                value={formData.excerptAr}
                onChange={(e) => setFormData(prev => ({ ...prev, excerptAr: e.target.value }))}
                placeholder="Brief summary in Arabic"
                rows={3}
                dir="rtl"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 mt-6">
          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(newTag);
                    setNewTag('');
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={() => {
                  addTag(newTag);
                  setNewTag('');
                }}
                disabled={!newTag.trim()}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-600" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* SEO Keywords */}
          <div>
            <Label>SEO Keywords</Label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add SEO keyword"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addKeyword(newKeyword);
                    setNewKeyword('');
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={() => {
                  addKeyword(newKeyword);
                  setNewKeyword('');
                }}
                disabled={!newKeyword.trim()}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.seoKeywords.map((keyword) => (
                <Badge key={keyword} variant="outline" className="flex items-center gap-1">
                  {keyword}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-600" 
                    onClick={() => removeKeyword(keyword)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          {/* Featured Image */}
          <div>
            <Label htmlFor="featured-image">Featured Image URL</Label>
            <Input
              id="featured-image"
              value={formData.featuredImageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, featuredImageUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Publish Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.isPublished}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublished: checked }))}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Post
            </>
          )}
        </Button>
      </div>
    </div>
  );
}