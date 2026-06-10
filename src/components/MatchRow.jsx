import FlagIcon from './FlagIcon'
import { format, parseISO } from 'date-fns'

export default function MatchRow({ match }) {
  const { homeTeam, awayTeam, homeScore, awayScore, status, date } = match

  const renderScore = () => {
    if (status === 'IN_PLAY' || status === 'PAUSED') {
      return (
        <span className="flex items-center gap-1" style={{ minWidth: 52, justifyContent: 'center' }}>
          <span
            className="live-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#E74C3C',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '8px',
              fontFamily: 'Oswald, sans-serif',
              color: '#E74C3C',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            LIVE {homeScore !== null ? `${homeScore}-${awayScore}` : ''}
          </span>
        </span>
      )
    }

    if (status === 'FINISHED' && homeScore !== null && awayScore !== null) {
      return (
        <span
          style={{
            minWidth: 52,
            textAlign: 'center',
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            color: '#1B4D2E',
          }}
        >
          {homeScore} - {awayScore}
        </span>
      )
    }

    if (date) {
      try {
        const parsed = parseISO(date)
        const dateStr = format(parsed, 'MMM d')
        const timeStr = format(parsed, 'HH:mm')
        return (
          <span
            style={{
              minWidth: 52,
              textAlign: 'center',
              fontSize: '8px',
              color: '#666',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span style={{ display: 'block', fontWeight: 600 }}>{dateStr}</span>
            <span style={{ display: 'block' }}>{timeStr}</span>
          </span>
        )
      } catch {
        return (
          <span style={{ minWidth: 52, textAlign: 'center', fontSize: '9px', color: '#999' }}>TBD</span>
        )
      }
    }

    return (
      <span
        style={{
          minWidth: 52,
          textAlign: 'center',
          fontSize: '9px',
          color: '#999',
          fontFamily: 'Oswald, sans-serif',
        }}
      >
        vs
      </span>
    )
  }

  return (
    <div
      className="flex items-center w-full"
      style={{
        minHeight: 18,
        padding: '1px 4px',
        fontSize: '10px',
        fontFamily: 'Inter, sans-serif',
        borderBottom: '1px solid #EDE4CA',
      }}
    >
      {/* Home team */}
      <div
        className="flex items-center gap-1"
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#1B4D2E',
            fontWeight: status === 'FINISHED' && homeScore > awayScore ? 600 : 400,
          }}
        >
          {homeTeam?.name || 'TBD'}
        </span>
        <FlagIcon code={homeTeam?.flag} name={homeTeam?.name} size="sm" />
      </div>

      {/* Score / Status */}
      <div className="flex items-center justify-center" style={{ flexShrink: 0, padding: '0 4px' }}>
        {renderScore()}
      </div>

      {/* Away team */}
      <div
        className="flex items-center gap-1"
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <FlagIcon code={awayTeam?.flag} name={awayTeam?.name} size="sm" />
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#1B4D2E',
            fontWeight: status === 'FINISHED' && awayScore > homeScore ? 600 : 400,
          }}
        >
          {awayTeam?.name || 'TBD'}
        </span>
      </div>
    </div>
  )
}
