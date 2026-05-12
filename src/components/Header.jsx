import { useEffect, useRef, useState } from 'react';

const HOST_FLAGS = [
  { code: 'USA', label: 'USA' },
  { code: 'CAN', label: 'Canada' },
  { code: 'MEX', label: 'Mexico' },
];

const FLAG_BASE = 'https://play.fifa.com/media/image/bracket_predictor/flags/world_cup_2026';

export default function Header({ country, matchCount, onSettingsClick }) {
  const heroRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCollapsed(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero (scrolls away) ── */}
      <div ref={heroRef} style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 20px 32px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0d0a00 0%, #000 100%)',
      }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 200,
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Trophy icon */}
        <div style={{ fontSize: 40, marginBottom: 12, lineHeight: 1 }}>🏆</div>

        {/* Title */}
        <h1 style={{
          margin: 0,
          fontSize: 'clamp(38px, 8vw, 64px)',
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 0.95,
          background: 'linear-gradient(135deg, #F0D060 0%, #D4AF37 40%, #A07820 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          MUNDIAL
        </h1>
        <div style={{
          fontSize: 'clamp(38px, 8vw, 64px)',
          fontWeight: 200,
          letterSpacing: 8,
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1,
          marginTop: 2,
        }}>
          2026
        </div>

        {/* Host countries */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 16, marginTop: 20,
        }}>
          {HOST_FLAGS.map(({ code, label }, i) => (
            <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <img
                src={`${FLAG_BASE}/${code}.svg`}
                alt={label}
                style={{ width: 28, height: 19, objectFit: 'contain', borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
              />
              <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 }}>
                {label}
              </span>
              {i < HOST_FLAGS.length - 1 && (
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', marginLeft: 4 }}>·</span>
              )}
            </div>
          ))}
        </div>

        {/* Stats strip */}
        {matchCount > 0 && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            marginTop: 20, padding: '8px 20px',
            borderRadius: 40,
            background: 'rgba(255,255,255,0.05)',
            border: '0.5px solid rgba(255,255,255,0.1)',
          }}>
            <Stat value={matchCount} label="Partidos" />
            <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />
            <Stat value={48} label="Grupos" suffix="×" prefix />
            <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />
            <Stat value={16} label="Eliminatoria" />
          </div>
        )}

        {/* Settings button in hero */}
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <SettingsBtn onClick={onSettingsClick} country={country} />
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 32,
          background: 'linear-gradient(transparent, #000)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Sticky mini-nav ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'saturate(180%) blur(24px)',
        WebkitBackdropFilter: 'saturate(180%) blur(24px)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        transition: 'opacity 0.2s, transform 0.2s',
        opacity: collapsed ? 1 : 0,
        transform: collapsed ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: collapsed ? 'auto' : 'none',
      }}>
        <div style={{
          maxWidth: 720, margin: '0 auto', padding: '0 16px',
          height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>🏆</span>
            <span style={{
              fontSize: 15, fontWeight: 700, letterSpacing: -0.5,
              background: 'linear-gradient(135deg, #F0D060, #D4AF37)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Mundial 2026
            </span>
          </div>
          <SettingsBtn onClick={onSettingsClick} country={country} compact />
        </div>
      </div>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)', lineHeight: 1, letterSpacing: -0.5 }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: 0.3, textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

function SettingsBtn({ onClick, country, compact }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {country && !compact && (
        <div style={{
          fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
          background: 'rgba(212,175,55,0.12)', border: '0.5px solid rgba(212,175,55,0.35)',
          color: 'var(--gold)', letterSpacing: 0.2,
        }}>
          {country}
        </div>
      )}
      <button
        onClick={onClick}
        style={{
          width: 34, height: 34, borderRadius: 17,
          background: 'rgba(255,255,255,0.08)',
          border: '0.5px solid rgba(255,255,255,0.1)',
          cursor: 'pointer', color: 'rgba(255,255,255,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}
