import FlagIcon from './FlagIcon'

export default function StandingsTable({ groupId, standings }) {
  if (!standings || standings.length === 0) return null

  return (
    <div className="w-full">
      {/* Header row */}
      <div
        className="flex items-center w-full font-display uppercase"
        style={{
          background: '#1B4D2E',
          color: '#F0C84A',
          fontSize: '9px',
          fontFamily: 'Oswald, sans-serif',
          letterSpacing: '0.08em',
          padding: '3px 4px',
        }}
      >
        <span style={{ width: 24, flexShrink: 0 }} />
        <span style={{ flex: 1, minWidth: 0 }}>Team</span>
        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>P</span>
        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>W</span>
        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>D</span>
        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>L</span>
        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>GF</span>
        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>GA</span>
        <span style={{ width: 24, textAlign: 'center', flexShrink: 0 }}>GD</span>
        <span style={{ width: 28, textAlign: 'center', flexShrink: 0, color: '#F0C84A', fontWeight: 700 }}>Pts</span>
      </div>

      {/* Data rows */}
      {standings.map((row, idx) => {
        const isFirst = idx === 0
        const isSecond = idx === 1
        const borderColor = isFirst ? '#C9A227' : isSecond ? '#A8A9AD' : 'transparent'
        const rowBg = idx % 2 === 0 ? '#FFFFFF' : '#F7F7F7'

        return (
          <div
            key={row.team.id}
            className="flex items-center w-full"
            style={{
              background: rowBg,
              fontSize: '10px',
              fontFamily: 'Inter, sans-serif',
              padding: '2px 4px',
              borderLeft: `3px solid ${borderColor}`,
              minHeight: '20px',
            }}
          >
            <span
              style={{ width: 24, flexShrink: 0, display: 'flex', alignItems: 'center' }}
            >
              <FlagIcon code={row.team.flag} name={row.team.name} size="sm" />
            </span>
            <span
              style={{
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: '#1B4D2E',
                fontWeight: isFirst || isSecond ? 600 : 400,
              }}
            >
              {row.team.name}
            </span>
            <span style={{ width: 22, textAlign: 'center', flexShrink: 0, color: '#555' }}>{row.played}</span>
            <span style={{ width: 22, textAlign: 'center', flexShrink: 0, color: '#555' }}>{row.won}</span>
            <span style={{ width: 22, textAlign: 'center', flexShrink: 0, color: '#555' }}>{row.drawn}</span>
            <span style={{ width: 22, textAlign: 'center', flexShrink: 0, color: '#555' }}>{row.lost}</span>
            <span style={{ width: 22, textAlign: 'center', flexShrink: 0, color: '#555' }}>{row.gf}</span>
            <span style={{ width: 22, textAlign: 'center', flexShrink: 0, color: '#555' }}>{row.ga}</span>
            <span
              style={{
                width: 24,
                textAlign: 'center',
                flexShrink: 0,
                color: row.gd > 0 ? '#1B4D2E' : row.gd < 0 ? '#C0392B' : '#555',
              }}
            >
              {row.gd > 0 ? `+${row.gd}` : row.gd}
            </span>
            <span
              style={{
                width: 28,
                textAlign: 'center',
                flexShrink: 0,
                fontWeight: 700,
                color: '#1B4D2E',
                fontFamily: 'Oswald, sans-serif',
              }}
            >
              {row.pts}
            </span>
          </div>
        )
      })}

      {/* Legend */}
      <div
        className="flex items-center gap-3"
        style={{
          padding: '2px 4px',
          fontSize: '8px',
          color: '#666',
          background: '#F5F5F5',
          borderTop: '1px solid #DDDDDD',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 8, height: 8, background: '#C9A227', display: 'inline-block', borderRadius: 1 }} />
          Advance
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 8, height: 8, background: '#A8A9AD', display: 'inline-block', borderRadius: 1 }} />
          Advance
        </span>
      </div>
    </div>
  )
}
