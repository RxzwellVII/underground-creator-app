'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import PostCard from '@/components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!inner(*)
        `)
        .order('created_at', { ascending: false });
      setPosts(data || []);
    }

    fetchPosts();

    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 py-4 z-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">🔥 Underground</h1>
        <a href="/create" className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-2xl font-medium flex items-center gap-2">
          Create Post
        </a>
      </div>

      <div className="mt-6 space-y-6">
        {posts.length === 0 && (
          <div className="text-center py-20 text-zinc-400">
            No posts yet. Be the first to create something!
          </div>
        )}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
