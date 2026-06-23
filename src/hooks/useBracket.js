import { useState, useEffect } from 'react';

// La BBC reutiliza el contenedor "2022" para el Mundial 2026.
// Devuelve CORS abierto (access-control-allow-origin: *), así que se consume directo.
const BBC_URL = 'https://web-cdn.api.bbci.co.uk/wc-poll-data/container/football-world-cup-2022?tournament=world-cup';

export function useBracket() {
  const [knockout, setKnockout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch(BBC_URL);
        if (!res.ok) throw new Error(`BBC ${res.status}`);
        const data = await res.json();
        if (alive) setKnockout(data.knockoutStage ?? null);
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  return { knockout, loading, error };
}
