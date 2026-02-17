"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("id", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const addBookmark = async () => {
    if (!url) return alert("Enter a URL");

    setLoading(true);
    await supabase.from("bookmarks").insert([{ title, url }]);
    setTitle("");
    setUrl("");
    await fetchBookmarks();
    setLoading(false);
  };

  const deleteBookmark = async (id: number) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  return (
    <main
      className={`min-h-screen flex items-center justify-center p-6 transition ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
      }`}
    >
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 bg-white/90 text-black backdrop-blur px-4 py-2 rounded-full shadow hover:scale-105 transition"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-black">
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
          🚀 Smart Bookmark
          <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
            Beta
          </span>
        </h1>

        <p className="text-gray-600 mb-6">
          Save and manage your favorite links
        </p>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full mb-3 p-3 rounded-xl border border-gray-300 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full mb-4 p-3 rounded-xl border border-gray-300 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

        <button
          onClick={addBookmark}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition active:scale-95"
        >
          {loading ? "Saving..." : "Add Bookmark"}
        </button>

        <div className="mt-6 space-y-3">
          {bookmarks.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              <p className="text-lg font-medium">No bookmarks yet 👀</p>
              <p className="text-sm">Start by adding your first link</p>
            </div>
          )}

          {bookmarks.map((b) => (
            <a
              key={b.id}
              href={b.url}
              target="_blank"
              className="flex items-center gap-3 p-4 rounded-xl bg-white border shadow hover:shadow-xl transition group"
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=64`}
                className="w-8 h-8 rounded"
                alt=""
              />

              <div className="flex-1">
                <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                  {b.title || "Untitled"}
                </p>
                <p className="text-sm text-gray-500 truncate">{b.url}</p>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteBookmark(b.id);
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                🗑️
              </button>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
