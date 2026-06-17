import FlagIcon from './FlagIcon'

const GREEN = '#1B4D2E'
const GOLD = '#C9A227'
const WHITE = '#FFFFFF'

function NumberBadge({ n }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: GREEN,
        color: WHITE,
        fontSize: '7px',
        fontFamily: 'Oswald, sans-serif',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {n}
    </span>
  )
}

function BracketSlot({ label, team, score, isWinner, number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${isWinner ? GOLD : '#CCCCCC'}`,
        borderRadius: '2px',
        background: isWinner ? '#FFFBEE' : WHITE,
        height: '22px',
        padding: '0 4px',
        gap: 3,
        minWidth: 0,
        width: '100%',
      }}
    >
      {number !== undefined && <NumberBadge n={number} />}
      {team ? (
        <>
          <FlagIcon code={team.flag} name={team.name} size="sm" />
          <span
            style={{
              flex: 1,
              fontSize: '8px',
              fontFamily: 'Inter, sans-serif',
              color: GREEN,
              fontWeight: isWinner ? 700 : 400,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {team.name}
          </span>
          {score !== null && score !== undefined && (
            <span style={{ fontSize: '10px', fontFamily: 'Oswald, sans-serif', color: GREEN, fontWeight: 700, flexShrink: 0 }}>
              {score}
            </span>
          )}
        </>
      ) : (
        <span
          style={{
            fontSize: '8px',
            fontFamily: 'Oswald, sans-serif',
            color: '#999999',
            letterSpacing: '0.04em',
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

function MatchSlot({ match, numberStart }) {
  const homeWon = match.status === 'FINISHED' && match.homeScore !== null && match.homeScore > match.awayScore
  const awayWon = match.status === 'FINISHED' && match.awayScore !== null && match.awayScore > match.homeScore

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
      <BracketSlot
        label={match.slot1Label}
        team={match.homeTeam}
        score={match.homeScore}
        isWinner={homeWon}
        number={numberStart}
      />
      <BracketSlot
        label={match.slot2Label}
        team={match.awayTeam}
        score={match.awayScore}
        isWinner={awayWon}
      />
      {(match.status === 'IN_PLAY' || match.status === 'PAUSED') && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#E74C3C',
            color: WHITE,
            fontSize: '6px',
            fontFamily: 'Oswald, sans-serif',
            padding: '1px 4px',
            borderRadius: '2px',
            letterSpacing: '0.1em',
            zIndex: 1,
          }}
        >
          LIVE
        </div>
      )}
    </div>
  )
}

function RoundHeader({ label }) {
  return (
    <div
      style={{
        background: GREEN,
        color: WHITE,
        textAlign: 'center',
        padding: '4px 6px',
        fontFamily: 'Oswald, sans-serif',
        fontWeight: 700,
        fontSize: '9px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        marginBottom: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }}
    >
      <span style={{ color: GOLD, fontSize: '8px' }}>★</span>
      {label}
      <span style={{ color: GOLD, fontSize: '8px' }}>★</span>
    </div>
  )
}

function RoundColumn({ matches, roundLabel, slotWidth = 120, startNumber = 1 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: slotWidth }}>
      <RoundHeader label={roundLabel} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
        {matches.map((match, i) => (
          <MatchSlot key={match.id} match={match} numberStart={startNumber + i} />
        ))}
      </div>
    </div>
  )
}

export default function KnockoutBracket({ knockoutMatches }) {
  const { ro32, ro16, qf, sf, final, thirdPlace } = knockoutMatches

  const ro32Left  = ro32.slice(0, 8)
  const ro32Right = ro32.slice(8, 16)
  const ro16Left  = ro16.slice(0, 4)
  const ro16Right = ro16.slice(4, 8)
  const qfLeft    = qf.slice(0, 2)
  const qfRight   = qf.slice(2, 4)
  const sfLeft    = [sf[0]]
  const sfRight   = [sf[1]]

  return (
    <div
      style={{
        background: WHITE,
        border: `2px solid ${GREEN}`,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      {/* Knockout Stage banner */}
      <div
        style={{
          background: GREEN,
          borderBottom: `3px solid ${GOLD}`,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <span style={{ color: GOLD, fontSize: '16px' }}>★</span>
        <span
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: WHITE,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          Knockout Stage
        </span>
        <span style={{ color: GOLD, fontSize: '16px' }}>★</span>
      </div>

      {/* Bracket body */}
      <div style={{ padding: '8px 6px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>

          {/* LEFT: RO32 → RO16 → QF → SF */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
            <RoundColumn matches={ro32Left}  roundLabel="Round of 32" slotWidth={110} startNumber={1} />
            <RoundColumn matches={ro16Left}  roundLabel="Round of 16" slotWidth={110} startNumber={1} />
            <RoundColumn matches={qfLeft}    roundLabel="Quarter Finals" slotWidth={110} startNumber={1} />
            <RoundColumn matches={sfLeft}    roundLabel="Semi Finals"  slotWidth={110} startNumber={1} />
          </div>

          {/* CENTER: Final + Champion + 3rd Place */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              width: 124,
            }}
          >
            <div style={{ width: '100%' }}>
              <RoundHeader label="World Final" />
              <MatchSlot match={final} />
            </div>

            {/* Champion box */}
            <div
              style={{
                width: '100%',
                background: GOLD,
                border: `2px solid #A07800`,
                borderRadius: '3px',
                padding: '6px 4px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 700,
                  fontSize: '9px',
                  color: GREEN,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '3px',
                }}
              >
                ★ World Champion ★
              </div>
              {final.winner ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <FlagIcon code={final.winner.flag} name={final.winner.name} size="sm" />
                  <span style={{ fontSize: '10px', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: GREEN }}>
                    {final.winner.name}
                  </span>
                </div>
              ) : (
                <div style={{ fontSize: '9px', fontFamily: 'Oswald, sans-serif', color: '#5A3E00', opacity: 0.7 }}>TBD</div>
              )}
            </div>

            <div style={{ width: '100%' }}>
              <RoundHeader label="3rd Place" />
              <MatchSlot match={thirdPlace} />
            </div>
          </div>

          {/* RIGHT: SF → QF → RO16 → RO32 */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
            <RoundColumn matches={sfRight}   roundLabel="Semi Finals"  slotWidth={110} startNumber={2} />
            <RoundColumn matches={qfRight}   roundLabel="Quarter Finals" slotWidth={110} startNumber={3} />
            <RoundColumn matches={ro16Right} roundLabel="Round of 16" slotWidth={110} startNumber={5} />
            <RoundColumn matches={ro32Right} roundLabel="Round of 32" slotWidth={110} startNumber={9} />
          </div>
        </div>
      </div>

      {/* Footer legend */}
      <div
        style={{
          background: '#F0F0F0',
          borderTop: `1px solid #DDDDDD`,
          padding: '4px 8px',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '8px',
          fontFamily: 'Oswald, sans-serif',
          color: '#666',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        W = Winner &bull; R/U = Runner-Up &bull; L = Loser
      </div>
    </div>
  )
}
