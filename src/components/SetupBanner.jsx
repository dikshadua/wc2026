import { useState } from 'react'

export default function SetupBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      style={{
        background: '#FFF3CD',
        border: '1px solid #FFC165',
        borderLeft: '4px solid #C9A227',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        color: '#5A3E00',
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: '16px', flexShrink: 0 }}>&#9888;</span>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <strong style={{ fontFamily: 'Oswald, sans-serif', fontSize: '13px', letterSpacing: '0.05em' }}>
          Connect live data:
        </strong>{' '}
        Add your free API key from{' '}
        <span
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 600,
            color: '#1B4D2E',
            textDecoration: 'underline',
          }}
        >
          football-data.org
        </span>{' '}
        to your{' '}
        <code
          style={{
            background: 'rgba(0,0,0,0.08)',
            padding: '1px 4px',
            borderRadius: '2px',
            fontSize: '11px',
            fontFamily: 'monospace',
          }}
        >
          .env
        </code>{' '}
        file as{' '}
        <code
          style={{
            background: 'rgba(0,0,0,0.08)',
            padding: '1px 4px',
            borderRadius: '2px',
            fontSize: '11px',
            fontFamily: 'monospace',
          }}
        >
          VITE_FOOTBALL_API_KEY=your_key_here
        </code>{' '}
        to enable live scores and standings. Currently showing static data.
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        style={{
          background: 'transparent',
          border: '1px solid #C9A227',
          borderRadius: '2px',
          cursor: 'pointer',
          color: '#5A3E00',
          fontFamily: 'Oswald, sans-serif',
          fontSize: '11px',
          padding: '3px 8px',
          flexShrink: 0,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Dismiss
      </button>
    </div>
  )
}
