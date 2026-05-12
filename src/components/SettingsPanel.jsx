import { SPANISH_COUNTRIES, ENGLISH_COUNTRIES } from '../data/broadcasts';

const TIMEZONES = [
  { label: 'Nueva York (ET)', value: 'America/New_York' },
  { label: 'Chicago (CT)', value: 'America/Chicago' },
  { label: 'Denver (MT)', value: 'America/Denver' },
  { label: 'Los Angeles (PT)', value: 'America/Los_Angeles' },
  { label: 'Ciudad de México', value: 'America/Mexico_City' },
  { label: 'Bogotá / Lima / Quito', value: 'America/Bogota' },
  { label: 'Caracas', value: 'America/Caracas' },
  { label: 'Santiago', value: 'America/Santiago' },
  { label: 'Buenos Aires', value: 'America/Argentina/Buenos_Aires' },
  { label: 'São Paulo', value: 'America/Sao_Paulo' },
  { label: 'Madrid / París (CET)', value: 'Europe/Madrid' },
  { label: 'Londres (GMT/BST)', value: 'Europe/London' },
  { label: 'Sídney', value: 'Australia/Sydney' },
];

export default function SettingsPanel({ timezone, setTimezone, country, setCountry, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* iOS bottom sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          background: 'rgba(28,28,30,0.98)',
          backdropFilter: 'saturate(180%) blur(40px)',
          WebkitBackdropFilter: 'saturate(180%) blur(40px)',
          borderRadius: '22px 22px 0 0',
          padding: '12px 20px 40px',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderBottom: 'none',
          display: 'flex', flexDirection: 'column', gap: 24,
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: -0.4 }}>
            Configuración
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 30, height: 30, borderRadius: 15,
              background: 'rgba(255,255,255,0.1)', border: 'none',
              cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
              fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Settings rows — iOS grouped style */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 14,
          overflow: 'hidden',
          border: '0.5px solid rgba(255,255,255,0.08)',
        }}>
          <SettingRow label="Zona horaria" icon="🕐">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              style={selectStyle}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </SettingRow>

          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.07)', margin: '0 14px' }} />

          <SettingRow label="País" icon="📺">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={selectStyle}
            >
              <option value="">— Sin filtrar —</option>
              <optgroup label="Español">
                {SPANISH_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </optgroup>
              <optgroup label="English">
                {ENGLISH_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </optgroup>
            </select>
          </SettingRow>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '14px 0',
            borderRadius: 14, border: 'none',
            background: 'var(--gold)', color: '#000',
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            letterSpacing: -0.3,
          }}
        >
          Listo
        </button>
      </div>
    </div>
  );
}

function SettingRow({ label, icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
      <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{icon}</span>
      <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', flex: '0 0 auto' }}>{label}</span>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>{children}</div>
    </div>
  );
}

const selectStyle = {
  background: 'transparent',
  color: 'var(--gold)',
  border: 'none',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  outline: 'none',
  textAlign: 'right',
  maxWidth: 180,
};
