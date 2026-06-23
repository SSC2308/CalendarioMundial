import { useState, useEffect } from 'react';

// Trae los goleadores de un partido (vía /api/events). Solo busca cuando `enabled`.
export function useScorers(match, enabled) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !match) return;
    const date = match.utcDate?.slice(0, 10);
    const home = match.homeTeam?.name;
    const away = match.awayTeam?.name;
    if (!date || !home || !away) return;

    let alive = true;
    setLoading(true);
    fetch(`/api/events?date=${date}&home=${encodeURIComponent(home)}&away=${encodeURIComponent(away)}`)
      .then((r) => r.json())
      .then((d) => { if (alive) setData(d); })
      .catch(() => { if (alive) setData(null); })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [enabled, match]);

  return { data, loading };
}
