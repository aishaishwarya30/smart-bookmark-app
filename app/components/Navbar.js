'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user session
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user));

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Smart Bookmark</h1>
      {user ? (
        <div className="flex items-center gap-2">
          <span>{user.email}</span>
          <button onClick={signOut} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={signIn} className="bg-blue-500 text-white px-3 py-1 rounded">
          Sign in with Google
        </button>
      )}
    </nav>
  );
}
