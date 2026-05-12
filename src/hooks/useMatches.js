import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

export function useMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        // In dev use Vite proxy, in prod use Vercel serverless function
        const url = import.meta.env.DEV
          ? '/api/football/v4/competitions/WC/matches'
          : '/api/matches';
        const headers = import.meta.env.DEV
          ? { 'X-Auth-Token': API_KEY }
          : {};
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  return { matches, loading, error };
}
