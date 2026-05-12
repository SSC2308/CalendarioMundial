import { useState, useEffect } from 'react';
import { useMatches } from './hooks/useMatches';
import { useReminders, rehydrateReminders } from './hooks/useReminders';
import Calendar from './components/Calendar';
import SettingsPanel from './components/SettingsPanel';
import Header from './components/Header';

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  const set = (v) => { setValue(v); localStorage.setItem(key, JSON.stringify(v)); };
  return [value, set];
}

const browserTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Read ?match=ID from URL on load
function getAutoExpandId() {
  const id = new URLSearchParams(window.location.search).get('match');
  return id ? Number(id) : null;
}

export default function App() {
  const { matches, loading, error } = useMatches();
  const reminders = useReminders();
  const [showSettings, setShowSettings] = useState(false);
  const [timezone, setTimezone] = useLocalStorage('tz', browserTZ);
  const [country, setCountry] = useLocalStorage('country', '');
  const [autoExpandId] = useState(getAutoExpandId);

  // Register service worker + rehydrate scheduled reminders
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js')
      .then(() => rehydrateReminders())
      .catch((e) => console.warn('SW registration failed:', e));
  }, []);

  // Clean up ?match param from URL without full reload
  useEffect(() => {
    if (autoExpandId) {
      const url = new URL(window.location.href);
      url.searchParams.delete('match');
      window.history.replaceState({}, '', url);
    }
  }, [autoExpandId]);

  return (
    <div style={{ minHeight: '100svh', background: '#000' }}>
      <Header
        country={country}
        matchCount={matches.length}
        onSettingsClick={() => setShowSettings(true)}
      />

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px 40px' }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '96px 0', gap: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '3px solid rgba(212,175,55,0.2)',
              borderTopColor: 'var(--gold)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', margin: 0 }}>Cargando fixture...</p>
          </div>
        )}

        {error && (
          <div style={{ borderRadius: 16, padding: 20, textAlign: 'center', background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.2)' }}>
            <p style={{ color: '#ff6b6b', fontWeight: 600, margin: '0 0 4px' }}>Error al cargar los partidos</p>
            <p style={{ fontSize: 13, color: 'rgba(255,107,107,0.6)', margin: '0 0 12px' }}>{error}</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              Verificá <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>.env</code> → <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>VITE_API_KEY</code>
            </p>
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <div style={{ textAlign: 'center', padding: '96px 0', color: 'rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
            <p style={{ margin: 0, fontSize: 15 }}>El fixture del Mundial 2026 no está disponible todavía en la API.</p>
          </div>
        )}

        {!loading && !error && matches.length > 0 && (
          <Calendar
            matches={matches}
            timezone={timezone}
            selectedCountry={country}
            autoExpandId={autoExpandId}
            reminders={reminders}
          />
        )}
      </main>

      {showSettings && (
        <SettingsPanel
          timezone={timezone} setTimezone={setTimezone}
          country={country} setCountry={setCountry}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
