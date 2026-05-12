import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE = '/api/football/v4';

export function useMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(`${BASE}/competitions/WC/matches`, {
          headers: { 'X-Auth-Token': API_KEY },
        });
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
