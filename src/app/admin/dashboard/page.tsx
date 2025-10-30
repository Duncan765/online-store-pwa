'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, LogOut } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  in_stock: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags: string;
  published: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchBlogPosts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchBlogPosts = async () => {
    const response = await fetch('/api/blog?all=true');
    const data = await response.json();
    setBlogPosts(data);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      image_url: formData.get('image_url'),
      in_stock: formData.get('in_stock') === 'true',
    };

    const method = editingProduct ? 'PUT' : 'POST';
    const body = editingProduct
      ? { ...productData, id: editingProduct.id }
      : productData;

    await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setProductDialogOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const blogData = {
      title: formData.get('title'),
      content: formData.get('content'),
      tags: formData.get('tags'),
      published: formData.get('published') === 'true',
    };

    const method = editingBlog ? 'PUT' : 'POST';
    const body = editingBlog
      ? { ...blogData, id: editingBlog.id }
      : blogData;

    await fetch('/api/blog', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setBlogDialogOpen(false);
    setEditingBlog(null);
    fetchBlogPosts();
  };

  const deleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const deleteBlogPost = async (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      fetchBlogPosts();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Products</h2>
              <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingProduct(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingProduct?.name}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingProduct?.description}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (KSh)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={editingProduct?.price}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        name="image_url"
                        type="url"
                        defaultValue={editingProduct?.image_url}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="in_stock">Stock Status</Label>
                      <select
                        id="in_stock"
                        name="in_stock"
                        defaultValue={editingProduct?.in_stock ? 'true' : 'false'}
                        className="w-full h-10 px-3 rounded-md border border-neutral-200"
                      >
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">KSh {product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.in_stock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingProduct(product);
                            setProductDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
              <Dialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingBlog(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Blog Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={editingBlog?.title}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        rows={8}
                        defaultValue={editingBlog?.content}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        name="tags"
                        defaultValue={editingBlog?.tags}
                        placeholder="e.g. news, products, updates"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="published">Status</Label>
                      <select
                        id="published"
                        name="published"
                        defaultValue={editingBlog?.published ? 'true' : 'false'}
                        className="w-full h-10 px-3 rounded-md border border-neutral-200"
                      >
                        <option value="true">Published</option>
                        <option value="false">Draft</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingBlog ? 'Update Post' : 'Add Post'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Tags</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {blogPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4">{post.title}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{post.tags}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingBlog(post);
                            setBlogDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBlogPost(post.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
