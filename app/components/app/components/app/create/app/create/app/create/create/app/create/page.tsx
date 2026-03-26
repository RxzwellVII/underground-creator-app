'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [type, setType] = useState<'text' | 'audio' | 'video' | 'livestream'>('text');
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !mediaUrl) {
      toast.error("Please add some content or a media link");
      return;
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        type,
        title: title || null,
        content: content || null,
        media_url: mediaUrl || null,
      });

    if (error) {
      toast.error("Error creating post: " + error.message);
    } else {
      toast.success("Post created successfully!");
      router.push('/');
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Post Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as any)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 text-white"
          >
            <option value="text">Text / Lyrics / Update</option>
            <option value="audio">Audio (SoundCloud)</option>
            <option value="video">Video (YouTube)</option>
            <option value="livestream">Livestream (YouTube Live / Twitch)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Track name, show title, etc."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Content / Lyrics / Description</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Write your lyrics, poetry, announcement..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl p-4 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Media Embed URL (YouTube, SoundCloud, Twitch)</label>
          <input
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/VIDEO_ID  or  https://soundcloud.com/..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
          />
          <p className="text-xs text-zinc-500 mt-2">
            Paste the full embed URL (e.g. https://www.youtube.com/embed/dQw4w9wgxcq)
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 py-4 rounded-2xl font-semibold text-lg"
        >
          {loading ? "Posting..." : "Publish to Underground"}
        </button>
      </form>
    </div>
  );
}
