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

      {/* Standings section */}
      <div style={{ borderBottom: groupMatches.length > 0 ? '1px solid #DDDDDD' : 'none' }}>
        <StandingsTable groupId={group.id} standings={groupStandings} />
      </div>

      {/* Matches section */}
      {groupMatches.length > 0 && (
        <div>
          <div
            style={{
              padding: '2px 4px',
              fontSize: '8px',
              fontFamily: 'Oswald, sans-serif',
              letterSpacing: '0.12em',
              color: '#1B4D2E',
              background: '#F0F0F0',
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
    </div>
  )
}
