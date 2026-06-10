import FlagIcon from './FlagIcon'
import MatchRow from './MatchRow'
import StandingsTable from './StandingsTable'

export default function GroupBlock({ group, matches, standings }) {
  const groupMatches = (matches || []).filter((m) => m.groupId === group.id)
  const groupStandings = standings?.[group.id] || group.teams.map((team) => ({
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    pts: 0,
  }))

  return (
    <div
      className="w-full"
      style={{
        border: '2px solid #1B4D2E',
        borderRadius: '3px',
        overflow: 'hidden',
        background: '#FFFFFF',
        marginBottom: '8px',
      }}
    >
      {/* Group header */}
      <div
        className="font-display uppercase text-white flex items-center px-2"
        style={{
          background: '#1B4D2E',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.15em',
          height: '28px',
          borderBottom: '2px solid #C9A227',
        }}
      >
        <span style={{ color: '#C9A227', marginRight: 6 }}>&#9670;</span>
        {group.name.toUpperCase()}
        <span style={{ color: '#C9A227', marginLeft: 6 }}>&#9670;</span>
      </div>

      {/* Teams list (summary — just flags + names before standings) */}
      <div style={{ padding: '4px 0', borderBottom: '1px solid #D4C5A0', background: '#F5EDD6' }}>
        {group.teams.map((team, idx) => (
          <div
            key={team.id}
            className="flex items-center gap-2"
            style={{
              padding: '2px 6px',
              fontSize: '10px',
              fontFamily: 'Inter, sans-serif',
              color: '#1B4D2E',
              background: idx % 2 === 0 ? '#F5EDD6' : '#EDE4CA',
            }}
          >
            <span
              style={{
                width: 14,
                textAlign: 'center',
                fontFamily: 'Oswald, sans-serif',
                fontSize: '9px',
                color: '#999',
                flexShrink: 0,
              }}
            >
              {idx + 1}
            </span>
            <FlagIcon code={team.flag} name={team.name} size="sm" />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {team.name}
            </span>
            <span
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '9px',
                color: '#999',
                flexShrink: 0,
              }}
            >
              {team.code}
            </span>
          </div>
        ))}
      </div>

      {/* Matches section */}
      {groupMatches.length > 0 && (
        <div style={{ borderBottom: '1px solid #D4C5A0' }}>
          <div
            style={{
              padding: '2px 4px',
              fontSize: '8px',
              fontFamily: 'Oswald, sans-serif',
              letterSpacing: '0.12em',
              color: '#1B4D2E',
              background: '#EDE4CA',
              textTransform: 'uppercase',
            }}
          >
            Matches
          </div>
          {groupMatches.map((match) => (
            <MatchRow key={match.id} match={match} />
          ))}
        </div>
      )}

      {/* Standings section */}
      <div>
        <div
          style={{
            padding: '2px 4px',
            fontSize: '8px',
            fontFamily: 'Oswald, sans-serif',
            letterSpacing: '0.12em',
            color: '#1B4D2E',
            background: '#EDE4CA',
            textTransform: 'uppercase',
          }}
        >
          Standings
        </div>
        <StandingsTable groupId={group.id} standings={groupStandings} />
      </div>
    </div>
  )
}
