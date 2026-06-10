export default function Header() {
  return (
    <div
      className="relative w-full flex items-center justify-between px-6"
      style={{
        background: '#1B4D2E',
        minHeight: '120px',
        borderBottom: '4px solid #C9A227',
      }}
    >
      {/* Decorative top gold line */}
      <div
        className="absolute top-2 left-4 right-4"
        style={{ height: '1px', background: '#C9A227', opacity: 0.4 }}
      />
      {/* Decorative bottom gold line */}
      <div
        className="absolute bottom-2 left-4 right-4"
        style={{ height: '1px', background: '#C9A227', opacity: 0.4 }}
      />

      {/* Trophy icon */}
      <div className="flex-shrink-0 w-16 flex items-center justify-center">
        <svg
          width="48"
          height="60"
          viewBox="0 0 48 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 2L28 10H38L30 16L33 26L24 20L15 26L18 16L10 10H20L24 2Z"
            fill="#C9A227"
            stroke="#F0C84A"
            strokeWidth="0.5"
          />
          <rect x="20" y="38" width="8" height="10" fill="#C9A227" />
          <rect x="14" y="48" width="20" height="4" rx="1" fill="#C9A227" />
          <path
            d="M16 26Q8 24 6 14H12M32 26Q40 24 42 14H36"
            stroke="#C9A227"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M14 26C14 32 18 38 24 38C30 38 34 32 34 26"
            fill="#C9A227"
            stroke="#F0C84A"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Center title */}
      <div className="flex-1 text-center px-4">
        <div
          className="font-display font-bold uppercase tracking-widest"
          style={{ color: '#C9A227', fontSize: '2.4rem', lineHeight: 1.1, fontFamily: 'Oswald, sans-serif' }}
        >
          FIFA World Cup 2026
        </div>
        <div
          className="font-display uppercase tracking-widest mt-1"
          style={{ color: '#F0C84A', fontSize: '0.85rem', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.25em' }}
        >
          ★ ★ ★ &nbsp; Wall Chart &bull; June 11 &ndash; July 19 &nbsp; ★ ★ ★
        </div>
        <div
          className="font-display uppercase mt-1"
          style={{ color: '#C9A227', fontSize: '0.65rem', fontFamily: 'Oswald, sans-serif', opacity: 0.7, letterSpacing: '0.3em' }}
        >
          USA &bull; Canada &bull; Mexico
        </div>
      </div>

      {/* Soccer ball icon */}
      <div className="flex-shrink-0 w-16 flex items-center justify-center">
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="26" cy="26" r="23" stroke="#C9A227" strokeWidth="2" fill="none" />
          <polygon points="26,8 30,15 23,20 19,13" fill="#C9A227" opacity="0.6" />
          <polygon points="38,16 44,20 42,28 35,26 34,19" fill="#C9A227" opacity="0.4" />
          <polygon points="38,38 34,44 26,44 22,37 27,32 35,34" fill="#C9A227" opacity="0.6" />
          <polygon points="14,38 8,34 9,26 16,24 21,30 18,37" fill="#C9A227" opacity="0.4" />
          <polygon points="12,16 19,13 23,20 18,27 11,26 8,20" fill="#C9A227" opacity="0.6" />
          <circle cx="26" cy="26" r="5" fill="#C9A227" opacity="0.3" />
        </svg>
      </div>
    </div>
  )
}
