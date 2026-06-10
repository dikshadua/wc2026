import FlagIcon from './FlagIcon'

function BracketSlot({ label, team, score, isWinner }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #1B4D2E',
        borderRadius: '2px',
        background: team ? (isWinner ? '#E8F5E9' : '#FFFFFF') : '#F5EDD6',
        height: '22px',
        padding: '0 4px',
        gap: 3,
        minWidth: 0,
        width: '100%',
      }}
    >
      {team ? (
        <>
          <FlagIcon code={team.flag} name={team.name} size="sm" />
          <span
            style={{
              flex: 1,
              fontSize: '9px',
              fontFamily: 'Inter, sans-serif',
              color: '#1B4D2E',
              fontWeight: isWinner ? 700 : 400,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {team.name}
          </span>
          {score !== null && score !== undefined && (
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'Oswald, sans-serif',
                color: '#1B4D2E',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {score}
            </span>
          )}
        </>
      ) : (
        <span
          style={{
            fontSize: '8px',
            fontFamily: 'Oswald, sans-serif',
            color: '#9A8C6E',
            letterSpacing: '0.05em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

function MatchSlot({ match, showConnector, side }) {
  const homeWon =
    match.status === 'FINISHED' &&
    match.homeScore !== null &&
    match.homeScore > match.awayScore
  const awayWon =
    match.status === 'FINISHED' &&
    match.awayScore !== null &&
    match.awayScore > match.homeScore

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        width: '100%',
      }}
    >
      <BracketSlot
        label={match.slot1Label}
        team={match.homeTeam}
        score={match.homeScore}
        isWinner={homeWon}
      />
      <BracketSlot
        label={match.slot2Label}
        team={match.awayTeam}
        score={match.awayScore}
        isWinner={awayWon}
      />

      {/* Status badge */}
      {match.status === 'IN_PLAY' || match.status === 'PAUSED' ? (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#E74C3C',
            color: 'white',
            fontSize: '6px',
            fontFamily: 'Oswald, sans-serif',
            padding: '1px 3px',
            borderRadius: '2px',
            letterSpacing: '0.1em',
            zIndex: 1,
          }}
        >
          LIVE
        </div>
      ) : null}
    </div>
  )
}

function RoundLabel({ label }) {
  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'Oswald, sans-serif',
        fontWeight: 700,
        fontSize: '9px',
        color: '#F5EDD6',
        background: '#1B4D2E',
        padding: '2px 6px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        marginBottom: '6px',
        border: '1px solid #C9A227',
      }}
    >
      {label}
    </div>
  )
}

// A column of match slots for one round
function RoundColumn({ matches, roundLabel, slotWidth = 130 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: slotWidth }}>
      <RoundLabel label={roundLabel} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {matches.map((match) => (
          <MatchSlot key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}

export default function KnockoutBracket({ knockoutMatches }) {
  const { ro32, ro16, qf, sf, final, thirdPlace } = knockoutMatches

  // Split into left half (matches 1-8) and right half (matches 9-16) for RO32
  const ro32Left = ro32.slice(0, 8)
  const ro32Right = ro32.slice(8, 16)

  const ro16Left = ro16.slice(0, 4)
  const ro16Right = ro16.slice(4, 8)

  const qfLeft = qf.slice(0, 2)
  const qfRight = qf.slice(2, 4)

  const sfLeft = [sf[0]]
  const sfRight = [sf[1]]

  return (
    <div
      style={{
        background: '#1B4D2E',
        borderRadius: '4px',
        padding: '10px 6px',
        border: '3px solid #C9A227',
        width: '100%',
      }}
    >
      {/* Bracket title */}
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          color: '#C9A227',
          letterSpacing: '0.2em',
          marginBottom: '10px',
          textTransform: 'uppercase',
          borderBottom: '1px solid #C9A227',
          paddingBottom: '6px',
        }}
      >
        Knockout Stage
      </div>

      {/* Main bracket layout */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', overflowX: 'auto' }}>
        {/* LEFT SIDE: RO32 -> RO16 -> QF -> SF */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
          {/* RO32 left */}
          <RoundColumn matches={ro32Left} roundLabel="RO32" slotWidth={120} />
          {/* RO16 left */}
          <RoundColumn matches={ro16Left} roundLabel="RO16" slotWidth={120} />
          {/* QF left */}
          <RoundColumn matches={qfLeft} roundLabel="QF" slotWidth={120} />
          {/* SF left */}
          <RoundColumn matches={sfLeft} roundLabel="SF" slotWidth={120} />
        </div>

        {/* CENTER: Final + Champion + Third Place */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            width: 130,
          }}
        >
          {/* Final */}
          <div style={{ width: '100%' }}>
            <RoundLabel label="Final" />
            <MatchSlot match={final} />
          </div>

          {/* Champion */}
          <div
            style={{
              width: '100%',
              background: '#C9A227',
              border: '2px solid #F0C84A',
              borderRadius: '4px',
              padding: '6px 4px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 700,
                fontSize: '9px',
                color: '#1B4D2E',
                letterSpacing: '0.15em',
                marginBottom: '3px',
              }}
            >
              ★ CHAMPION ★
            </div>
            {final.winner ? (
              <div className="flex items-center justify-center gap-1">
                <FlagIcon code={final.winner.flag} name={final.winner.name} size="sm" />
                <span style={{ fontSize: '10px', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#1B4D2E' }}>
                  {final.winner.name}
                </span>
              </div>
            ) : (
              <div style={{ fontSize: '9px', fontFamily: 'Oswald, sans-serif', color: '#5A3E00', opacity: 0.7 }}>
                TBD
              </div>
            )}
          </div>

          {/* Third Place */}
          <div style={{ width: '100%' }}>
            <RoundLabel label="3rd Place" />
            <MatchSlot match={thirdPlace} />
          </div>
        </div>

        {/* RIGHT SIDE: SF -> QF -> RO16 -> RO32 */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
          {/* SF right */}
          <RoundColumn matches={sfRight} roundLabel="SF" slotWidth={120} />
          {/* QF right */}
          <RoundColumn matches={qfRight} roundLabel="QF" slotWidth={120} />
          {/* RO16 right */}
          <RoundColumn matches={ro16Right} roundLabel="RO16" slotWidth={120} />
          {/* RO32 right */}
          <RoundColumn matches={ro32Right} roundLabel="RO32" slotWidth={120} />
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: '8px',
          borderTop: '1px solid rgba(201,162,39,0.3)',
          paddingTop: '6px',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '8px',
          fontFamily: 'Oswald, sans-serif',
          color: '#C9A227',
          letterSpacing: '0.1em',
        }}
      >
        <span>W = Winner &bull; R/U = Runner-Up &bull; L = Loser</span>
      </div>
    </div>
  )
}
