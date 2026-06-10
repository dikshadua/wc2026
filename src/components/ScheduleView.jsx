import { useState, useMemo } from 'react'
import { format, parseISO, isToday, isTomorrow, addDays, startOfDay } from 'date-fns'
import FlagIcon from './FlagIcon'
import { GROUPS } from '../data/worldcup2026'

function buildGoogleCalendarLink(match) {
  const title = encodeURIComponent(
    `FIFA WC 2026: ${match.homeTeam?.name || 'TBD'} vs ${match.awayTeam?.name || 'TBD'}`
  )
  const details = encodeURIComponent(
    `Group ${match.groupId || match.stage} match at FIFA World Cup 2026`
  )

  let startDate = '20260611T150000Z'
  let endDate = '20260611T170000Z'

  if (match.date) {
    try {
      const d = parseISO(match.date)
      startDate = format(d, "yyyyMMdd'T'HHmmss'Z'")
      const end = new Date(d.getTime() + 2 * 60 * 60 * 1000)
      endDate = format(end, "yyyyMMdd'T'HHmmss'Z'")
    } catch {
      // use defaults
    }
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`
}

function buildIcsContent(match) {
  const homeTeam = match.homeTeam?.name || 'TBD'
  const awayTeam = match.awayTeam?.name || 'TBD'
  const title = `FIFA WC 2026: ${homeTeam} vs ${awayTeam}`

  let startDate = '20260611T150000Z'
  let endDate = '20260611T170000Z'

  if (match.date) {
    try {
      const d = parseISO(match.date)
      startDate = format(d, "yyyyMMdd'T'HHmmss'Z'")
      const end = new Date(d.getTime() + 2 * 60 * 60 * 1000)
      endDate = format(end, "yyyyMMdd'T'HHmmss'Z'")
    } catch {
      // use defaults
    }
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FIFA Wall Chart 2026//EN',
    'BEGIN:VEVENT',
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:Group ${match.groupId || match.stage} match at FIFA World Cup 2026`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadIcs(match) {
  const content = buildIcsContent(match)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `wc2026-match-${match.id}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

function MatchCard({ match }) {
  const { homeTeam, awayTeam, homeScore, awayScore, status, date, groupId, stage } = match

  const renderStatus = () => {
    if (status === 'IN_PLAY' || status === 'PAUSED') {
      return (
        <span className="flex items-center gap-1">
          <span
            className="live-dot"
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#E74C3C', display: 'inline-block' }}
          />
          <span style={{ color: '#E74C3C', fontWeight: 700, fontFamily: 'Oswald, sans-serif', fontSize: '12px' }}>
            LIVE {homeScore !== null ? `${homeScore} - ${awayScore}` : ''}
          </span>
        </span>
      )
    }
    if (status === 'FINISHED') {
      return (
        <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1B4D2E' }}>
          {homeScore} - {awayScore}
        </span>
      )
    }
    if (date) {
      try {
        return (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
            {format(parseISO(date), 'HH:mm')}
          </span>
        )
      } catch {
        return <span style={{ color: '#999', fontSize: '12px' }}>TBD</span>
      }
    }
    return <span style={{ color: '#999', fontSize: '12px' }}>TBD</span>
  }

  const roundLabel = groupId ? `Group ${groupId}` : stage || 'Knockout'

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #D4C5A0',
        borderRadius: '4px',
        padding: '8px 12px',
        marginBottom: '6px',
      }}
    >
      {/* Round label */}
      <div
        style={{
          fontSize: '9px',
          fontFamily: 'Oswald, sans-serif',
          color: '#C9A227',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}
      >
        {roundLabel}
        {date && (
          <span style={{ color: '#999', marginLeft: 8 }}>
            {format(parseISO(date), 'MMM d, yyyy')}
          </span>
        )}
      </div>

      {/* Match row */}
      <div className="flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex items-center gap-2" style={{ flex: 1, justifyContent: 'flex-end' }}>
          <span
            style={{
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              color: '#1B4D2E',
              fontWeight: status === 'FINISHED' && homeScore > awayScore ? 700 : 400,
              textAlign: 'right',
            }}
          >
            {homeTeam?.name || 'TBD'}
          </span>
          <FlagIcon code={homeTeam?.flag} name={homeTeam?.name} size="md" />
        </div>

        {/* Score/Time */}
        <div
          style={{
            flexShrink: 0,
            minWidth: 70,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderStatus()}
        </div>

        {/* Away team */}
        <div className="flex items-center gap-2" style={{ flex: 1, justifyContent: 'flex-start' }}>
          <FlagIcon code={awayTeam?.flag} name={awayTeam?.name} size="md" />
          <span
            style={{
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              color: '#1B4D2E',
              fontWeight: status === 'FINISHED' && awayScore > homeScore ? 700 : 400,
            }}
          >
            {awayTeam?.name || 'TBD'}
          </span>
        </div>
      </div>

      {/* Calendar buttons */}
      <div className="flex items-center gap-2" style={{ marginTop: 6 }}>
        <a
          href={buildGoogleCalendarLink(match)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '9px',
            fontFamily: 'Oswald, sans-serif',
            color: '#1B4D2E',
            background: '#F5EDD6',
            border: '1px solid #D4C5A0',
            padding: '2px 6px',
            borderRadius: '2px',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
        >
          + Google Calendar
        </a>
        <button
          onClick={() => downloadIcs(match)}
          style={{
            fontSize: '9px',
            fontFamily: 'Oswald, sans-serif',
            color: '#1B4D2E',
            background: '#F5EDD6',
            border: '1px solid #D4C5A0',
            padding: '2px 6px',
            borderRadius: '2px',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          + Download .ics
        </button>
      </div>
    </div>
  )
}

export default function ScheduleView({ matches }) {
  const [tab, setTab] = useState('today')
  const [groupFilter, setGroupFilter] = useState('ALL')

  const groupOptions = ['ALL', ...GROUPS.map((g) => g.id), 'KNOCKOUT']

  const filteredMatches = useMemo(() => {
    let result = matches || []

    if (groupFilter !== 'ALL') {
      if (groupFilter === 'KNOCKOUT') {
        result = result.filter((m) => !m.groupId)
      } else {
        result = result.filter((m) => m.groupId === groupFilter)
      }
    }

    if (tab === 'today') {
      result = result.filter((m) => {
        if (!m.date) return false
        try {
          const d = parseISO(m.date)
          return isToday(d) || m.status === 'IN_PLAY' || m.status === 'PAUSED'
        } catch {
          return false
        }
      })
    }

    return result
  }, [matches, groupFilter, tab])

  // Group by date
  const matchesByDate = useMemo(() => {
    const groups = {}
    const noDate = []

    filteredMatches.forEach((m) => {
      if (m.date) {
        try {
          const dateKey = format(parseISO(m.date), 'yyyy-MM-dd')
          if (!groups[dateKey]) groups[dateKey] = []
          groups[dateKey].push(m)
        } catch {
          noDate.push(m)
        }
      } else {
        noDate.push(m)
      }
    })

    const sorted = Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
    if (noDate.length > 0) sorted.push(['TBD', noDate])
    return sorted
  }, [filteredMatches])

  const tabStyle = (active) => ({
    fontFamily: 'Oswald, sans-serif',
    fontWeight: active ? 700 : 400,
    fontSize: '13px',
    padding: '6px 16px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: active ? '3px solid #C9A227' : '3px solid transparent',
    background: 'transparent',
    color: active ? '#1B4D2E' : '#666',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  })

  return (
    <div style={{ padding: '16px', maxWidth: 800, margin: '0 auto' }}>
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid #D4C5A0',
          marginBottom: '12px',
        }}
      >
        <button style={tabStyle(tab === 'today')} onClick={() => setTab('today')}>
          Today
        </button>
        <button style={tabStyle(tab === 'all')} onClick={() => setTab('all')}>
          All Matches
        </button>
      </div>

      {/* Group filter */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          flexWrap: 'wrap',
          marginBottom: '12px',
        }}
      >
        {groupOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setGroupFilter(opt)}
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '10px',
              padding: '3px 8px',
              cursor: 'pointer',
              borderRadius: '2px',
              border: '1px solid #1B4D2E',
              background: groupFilter === opt ? '#1B4D2E' : 'transparent',
              color: groupFilter === opt ? '#F0C84A' : '#1B4D2E',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {opt === 'ALL' ? 'All Groups' : opt === 'KNOCKOUT' ? 'Knockout' : `Group ${opt}`}
          </button>
        ))}
      </div>

      {/* Match list */}
      {matchesByDate.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#999',
            fontFamily: 'Oswald, sans-serif',
            fontSize: '14px',
            letterSpacing: '0.1em',
          }}
        >
          {tab === 'today' ? 'No matches today' : 'No matches found'}
        </div>
      ) : (
        matchesByDate.map(([dateKey, dayMatches]) => (
          <div key={dateKey} style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                color: '#1B4D2E',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '4px 8px',
                background: '#EDE4CA',
                borderRadius: '2px',
                marginBottom: '6px',
                borderLeft: '3px solid #C9A227',
              }}
            >
              {dateKey === 'TBD'
                ? 'Date TBD'
                : (() => {
                    try {
                      const d = parseISO(dateKey)
                      if (isToday(d)) return `Today, ${format(d, 'MMMM d, yyyy')}`
                      if (isTomorrow(d)) return `Tomorrow, ${format(d, 'MMMM d, yyyy')}`
                      return format(d, 'EEEE, MMMM d, yyyy')
                    } catch {
                      return dateKey
                    }
                  })()}
            </div>
            {dayMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ))
      )}
    </div>
  )
}
