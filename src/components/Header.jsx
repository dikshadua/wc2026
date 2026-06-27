export default function Header() {
  return (
    <div style={{ background: '#FFFFFF', borderBottom: '3px solid #1B4D2E' }}>
      {/* Top title row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px 8px',
        }}
      >
        {/* Left: Trophy SVG */}
        <div style={{ flexShrink: 0, width: 64 }}>
          <svg width="52" height="64" viewBox="0 0 52 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 4L30 12H40L32 18L35 29L26 23L17 29L20 18L12 12H22L26 4Z" fill="#C9A227" stroke="#A07800" strokeWidth="0.5"/>
            <rect x="22" y="40" width="8" height="10" fill="#C9A227"/>
            <rect x="16" y="50" width="20" height="4" rx="1" fill="#C9A227"/>
            <path d="M18 29Q10 27 8 16H14M34 29Q42 27 44 16H38" stroke="#C9A227" strokeWidth="2" fill="none"/>
            <path d="M16 29C16 35 20 40 26 40C32 40 36 35 36 29" fill="#C9A227" stroke="#A07800" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* Center: main title */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 700,
              fontSize: '2.6rem',
              color: '#1B4D2E',
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            World Cup{' '}
            <span style={{ color: '#C9A227' }}>2026</span>
          </div>
          <div
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '0.72rem',
              color: '#555',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            June 11 &ndash; July 19, 2026 &nbsp;&bull;&nbsp; USA &bull; Canada &bull; Mexico
          </div>
        </div>

        {/* Right: Soccer ball SVG */}
        <div style={{ flexShrink: 0, width: 64, display: 'flex', justifyContent: 'flex-end' }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="26" r="23" stroke="#1B4D2E" strokeWidth="2" fill="none"/>
            <polygon points="26,8 30,15 23,20 19,13" fill="#1B4D2E" opacity="0.7"/>
            <polygon points="38,16 44,20 42,28 35,26 34,19" fill="#1B4D2E" opacity="0.4"/>
            <polygon points="38,38 34,44 26,44 22,37 27,32 35,34" fill="#1B4D2E" opacity="0.7"/>
            <polygon points="14,38 8,34 9,26 16,24 21,30 18,37" fill="#1B4D2E" opacity="0.4"/>
            <polygon points="12,16 19,13 23,20 18,27 11,26 8,20" fill="#1B4D2E" opacity="0.7"/>
            <circle cx="26" cy="26" r="5" fill="#1B4D2E" opacity="0.25"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
