import FlagIcon from './FlagIcon'

const GREEN  = '#1B4D2E'
const GOLD   = '#C9A227'
const WHITE  = '#FFFFFF'

// Layout constants
const MATCH_H  = 48   // height of one match (2 team slots + 2px gap)
const UNIT     = 62   // vertical unit — one RO32 slot height
const TOTAL_H  = 8 * UNIT   // 496px — full bracket height
const COL_W    = 102  // round column width
const CONN_W   = 20   // connector SVG width
const CTR_W    = 140  // center section width

// Y-position formulas (verified: midpoints align perfectly across rounds)
function matchTop(round, idx) {
  const span = Math.pow(2, round) * UNIT
  return idx * span + (span - MATCH_H) / 2
}
function matchMidY(round, idx) {
  return matchTop(round, idx) + MATCH_H / 2
}

// ─── primitives ───────────────────────────────────────────────────────────────

function TeamSlot({ label, team, score, isWinner }) {
  return (
    <div
      style={{
        height: 22,
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        gap: 3,
        border: `1px solid ${isWinner ? GOLD : '#CCCCCC'}`,
        background: isWinner ? '#FFFBEE' : WHITE,
        minWidth: 0,
      }}
    >
      {team ? (
        <>
          <FlagIcon code={team.flag} name={team.name} size="sm" />
          <span
            style={{
              flex: 1,
              fontSize: 8,
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
            <span
              style={{
                fontSize: 9,
                fontFamily: 'Oswald, sans-serif',
                color: GREEN,
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
            fontSize: 8,
            fontFamily: 'Oswald, sans-serif',
            color: '#BBBBBB',
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

function MatchPair({ match, top, width }) {
  const homeWon = match.status === 'FINISHED' && match.homeScore > match.awayScore
  const awayWon = match.status === 'FINISHED' && match.awayScore > match.homeScore
  const isLive  = match.status === 'IN_PLAY' || match.status === 'PAUSED'

  return (
    <div style={{ position: 'absolute', top, left: 0, width, height: MATCH_H }}>
      {isLive && (
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#E74C3C',
            color: WHITE,
            fontSize: 6,
            fontFamily: 'Oswald, sans-serif',
            padding: '1px 4px',
            borderRadius: 2,
            letterSpacing: '0.1em',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          LIVE
        </div>
      )}
      <TeamSlot label={match.slot1Label} team={match.homeTeam} score={match.homeScore} isWinner={homeWon} />
      <div style={{ height: 2 }} />
      <TeamSlot label={match.slot2Label} team={match.awayTeam} score={match.awayScore} isWinner={awayWon} />
    </div>
  )
}

// ─── round column (absolutely positioned matches) ─────────────────────────────

function RoundColumn({ matches, round, label }) {
  return (
    <div style={{ flexShrink: 0, width: COL_W }}>
      {/* Round label */}
      <div
        style={{
          background: GREEN,
          color: WHITE,
          textAlign: 'center',
          padding: '3px 4px',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 700,
          fontSize: 8,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          marginBottom: 4,
        }}
      >
        <span style={{ color: GOLD, fontSize: 7 }}>★</span>
        {label}
        <span style={{ color: GOLD, fontSize: 7 }}>★</span>
      </div>

      {/* Absolute positioned match area */}
      <div style={{ position: 'relative', width: COL_W, height: TOTAL_H }}>
        {matches.map((match, i) => (
          <MatchPair key={match.id} match={match} top={matchTop(round, i)} width={COL_W} />
        ))}
      </div>
    </div>
  )
}

// ─── bracket connector (SVG lines showing which match feeds which) ─────────────

function Connector({ pairRound, side }) {
  // pairRound = round of the outer matches that form pairs
  // side = 'left'  → pairs on left (x=0),     single exits right (x=CONN_W)
  //        'right' → pairs on right (x=CONN_W), single exits left (x=0)
  const pairCount = 4 / Math.pow(2, pairRound)  // 4, 2, 1 for rounds 0, 1, 2
  const lines = []

  for (let i = 0; i < pairCount; i++) {
    const y1   = matchMidY(pairRound,     i * 2)
    const y2   = matchMidY(pairRound,     i * 2 + 1)
    const yMid = matchMidY(pairRound + 1, i)

    const pairX  = side === 'left' ? 0      : CONN_W
    const jointX = side === 'left' ? CONN_W - 3 : 3
    const exitX  = side === 'left' ? CONN_W : 0

    lines.push(
      <line key={`a${i}`} x1={pairX}  y1={y1}   x2={jointX} y2={y1}   />,
      <line key={`b${i}`} x1={pairX}  y1={y2}   x2={jointX} y2={y2}   />,
      <line key={`v${i}`} x1={jointX} y1={y1}   x2={jointX} y2={y2}   />,
      <line key={`d${i}`} x1={jointX} y1={yMid} x2={exitX}  y2={yMid} />,
    )
  }

  return (
    <svg
      width={CONN_W}
      height={TOTAL_H + 20}  // +20 for the label row above
      style={{ flexShrink: 0, display: 'block', marginTop: 20 }}
    >
      <g stroke={GREEN} strokeWidth={1.5} fill="none" strokeLinecap="square">
        {lines}
      </g>
    </svg>
  )
}

// Simple horizontal line connector between SF and Final
function SFConnector() {
  const y = matchMidY(3, 0)
  return (
    <svg
      width={CONN_W}
      height={TOTAL_H + 20}
      style={{ flexShrink: 0, display: 'block', marginTop: 20 }}
    >
      <line x1={0} y1={y} x2={CONN_W} y2={y} stroke={GREEN} strokeWidth={1.5} />
    </svg>
  )
}

// ─── center section (Final + Champion + 3rd Place) ────────────────────────────

function CenterSection({ final, thirdPlace }) {
  const homeWon      = final.status === 'FINISHED' && final.homeScore > final.awayScore
  const awayWon      = final.status === 'FINISHED' && final.awayScore > final.homeScore
  const t3HomeWon    = thirdPlace.status === 'FINISHED' && thirdPlace.homeScore > thirdPlace.awayScore
  const t3AwayWon    = thirdPlace.status === 'FINISHED' && thirdPlace.awayScore > thirdPlace.homeScore

  const finalTop     = matchTop(3, 0)       // 224
  const champTop     = finalTop + MATCH_H + 12
  const thirdTop     = TOTAL_H - MATCH_H - 28

  return (
    <div style={{ flexShrink: 0, width: CTR_W }}>
      {/* Label */}
      <div
        style={{
          background: GREEN,
          color: WHITE,
          textAlign: 'center',
          padding: '3px 4px',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 700,
          fontSize: 8,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          marginBottom: 4,
        }}
      >
        <span style={{ color: GOLD, fontSize: 7 }}>★</span>
        World Final
        <span style={{ color: GOLD, fontSize: 7 }}>★</span>
      </div>

      <div style={{ position: 'relative', width: CTR_W, height: TOTAL_H }}>
        {/* Final match */}
        <div style={{ position: 'absolute', top: finalTop, left: 0, width: CTR_W }}>
          <TeamSlot label={final.slot1Label} team={final.homeTeam} score={final.homeScore} isWinner={homeWon} />
          <div style={{ height: 2 }} />
          <TeamSlot label={final.slot2Label} team={final.awayTeam} score={final.awayScore} isWinner={awayWon} />
        </div>

        {/* Champion box */}
        <div
          style={{
            position: 'absolute',
            top: champTop,
            left: 0,
            width: CTR_W,
            background: GOLD,
            border: `2px solid #A07800`,
            borderRadius: 3,
            padding: '5px 4px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 700,
              fontSize: 9,
              color: GREEN,
              letterSpacing: '0.18em',
              marginBottom: 3,
              textTransform: 'uppercase',
            }}
          >
            ★ World Champion ★
          </div>
          {final.winner ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <FlagIcon code={final.winner.flag} name={final.winner.name} size="sm" />
              <span style={{ fontSize: 10, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: GREEN }}>
                {final.winner.name}
              </span>
            </div>
          ) : (
            <div style={{ fontSize: 9, fontFamily: 'Oswald, sans-serif', color: '#5A3E00', opacity: 0.7 }}>TBD</div>
          )}
        </div>

        {/* 3rd Place */}
        <div style={{ position: 'absolute', top: thirdTop, left: 0, width: CTR_W }}>
          <div
            style={{
              background: '#777',
              color: WHITE,
              textAlign: 'center',
              padding: '2px 4px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 700,
              fontSize: 7,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 3,
            }}
          >
            3rd Place Match
          </div>
          <TeamSlot label={thirdPlace.slot1Label} team={thirdPlace.homeTeam} score={thirdPlace.homeScore} isWinner={t3HomeWon} />
          <div style={{ height: 2 }} />
          <TeamSlot label={thirdPlace.slot2Label} team={thirdPlace.awayTeam} score={thirdPlace.awayScore} isWinner={t3AwayWon} />
        </div>
      </div>
    </div>
  )
}

// ─── main export ──────────────────────────────────────────────────────────────

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
    <div style={{ background: WHITE, border: `2px solid ${GREEN}`, borderRadius: 4, overflow: 'hidden' }}>
      {/* Header banner */}
      <div
        style={{
          background: GREEN,
          borderBottom: `3px solid ${GOLD}`,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <span style={{ color: GOLD, fontSize: 16 }}>★</span>
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
        <span style={{ color: GOLD, fontSize: 16 }}>★</span>
      </div>

      {/* Bracket body */}
      <div style={{ padding: '8px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', minWidth: 'max-content' }}>

          {/* ── LEFT HALF: RO32 → RO16 → QF → SF ─────────────────────── */}
          <RoundColumn matches={ro32Left}  round={0} label="Round of 32" />
          <Connector pairRound={0} side="left" />
          <RoundColumn matches={ro16Left}  round={1} label="Round of 16" />
          <Connector pairRound={1} side="left" />
          <RoundColumn matches={qfLeft}    round={2} label="Quarter Finals" />
          <Connector pairRound={2} side="left" />
          <RoundColumn matches={sfLeft}    round={3} label="Semi Finals" />
          <SFConnector />

          {/* ── CENTER ────────────────────────────────────────────────── */}
          <CenterSection final={final} thirdPlace={thirdPlace} />

          {/* ── RIGHT HALF: SF → QF → RO16 → RO32 ────────────────────── */}
          <SFConnector />
          <RoundColumn matches={sfRight}   round={3} label="Semi Finals" />
          <Connector pairRound={2} side="right" />
          <RoundColumn matches={qfRight}   round={2} label="Quarter Finals" />
          <Connector pairRound={1} side="right" />
          <RoundColumn matches={ro16Right} round={1} label="Round of 16" />
          <Connector pairRound={0} side="right" />
          <RoundColumn matches={ro32Right} round={0} label="Round of 32" />

        </div>
      </div>

      {/* Footer legend */}
      <div
        style={{
          background: '#F5F5F5',
          borderTop: '1px solid #DDDDDD',
          padding: '4px 8px',
          textAlign: 'center',
          fontSize: 8,
          fontFamily: 'Oswald, sans-serif',
          color: '#888',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        W = Winner &bull; R/U = Runner-Up &bull; L = Loser
      </div>
    </div>
  )
}
