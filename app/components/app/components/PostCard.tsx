'use client';

import { Heart, MessageCircle, Share2, Gift } from 'lucide-react';

export default function PostCard({ post }: { post: any }) {
  const embedUrl = post.media_url;

  return (
    <div className="post-card bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-700 rounded-full overflow-hidden">
          {post.profiles?.avatar_url ? (
            <img src={post.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">🎤</div>
          )}
        </div>
        <div>
          <p className="font-semibold">@{post.profiles?.username || 'creator'}</p>
          <p className="text-xs text-zinc-500">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4">
        {post.title && <h3 className="font-bold text-xl mb-2">{post.title}</h3>}
        {post.content && <p className="text-zinc-300 mb-4 whitespace-pre-wrap">{post.content}</p>}

        {embedUrl && (
          <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-4">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800 px-4 py-3 flex items-center justify-between text-zinc-400">
        <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" /> <span className="text-sm">{post.likes_count || 0}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <a 
          href={`/tip/${post.user_id}`} 
          className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Gift className="w-5 h-5" /> Tip
        </a>
      </div>
    </div>
  );
}
