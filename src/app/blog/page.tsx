'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags: string;
  published: boolean;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Blog</h1>
          <p className="text-lg text-neutral-600">
            Latest updates, product news, and helpful guides
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">No blog posts yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <time>{formatDate(post.created_at)}</time>
                    {post.tags && (
                      <span className="flex gap-2">
                        {post.tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-neutral-100 rounded text-neutral-700"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
