import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const OPTIONS = [
  { label: '15 min antes', value: 15 },
  { label: '30 min antes', value: 30 },
  { label: '1 hora antes', value: 60 },
  { label: 'Al comenzar',  value: 0  },
];

export default function ReminderDropdown({ anchorRef, onSelect, onClose, blocked }) {
  const menuRef = useRef(null);
  const [style, setStyle] = useState({ position: 'fixed', opacity: 0 });

  // Position relative to anchor button
  useEffect(() => {
    if (!anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    const menuH = blocked ? 130 : 180;
    const spaceAbove = r.top;
    const openUp = spaceAbove >= menuH;

    setStyle({
      position: 'fixed',
      right: window.innerWidth - r.right,
      ...(openUp ? { bottom: window.innerHeight - r.top + 6 } : { top: r.bottom + 6 }),
      zIndex: 9999,
      opacity: 1,
    });
  }, [anchorRef, blocked]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          anchorRef.current && !anchorRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, anchorRef]);

  return createPortal(
    <div
      ref={menuRef}
      style={{
        ...style,
        background: '#1c1c1e',
        border: '0.5px solid rgba(255,255,255,0.12)',
        borderRadius: 14,
        overflow: 'hidden',
        minWidth: 170,
        boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
        transition: 'opacity 0.1s',
      }}
    >
      {blocked && (
        <div style={{ padding: '10px 14px', fontSize: 11, color: 'rgba(255,100,100,0.8)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
          Notificaciones bloqueadas en el browser
        </div>
      )}
      {OPTIONS.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '12px 16px', background: 'transparent', border: 'none',
            borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
            color: 'rgba(255,255,255,0.85)', fontSize: 14, cursor: 'pointer',
            transition: 'background 0.1s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          {opt.label}
        </button>
      ))}
    </div>,
    document.body
  );
}
