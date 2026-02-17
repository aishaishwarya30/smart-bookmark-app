'use client';
import { supabase } from '../../lib/supabaseClient';

export default function BookmarkItem({ bookmark }) {
  const deleteBookmark = async () => {
    await supabase.from('bookmarks').delete().eq('id', bookmark.id);
  };

  return (
    <div className="bg-white shadow p-3 rounded flex justify-between items-center">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {bookmark.title}
      </a>
      <button
        onClick={deleteBookmark}
        className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  );
}
