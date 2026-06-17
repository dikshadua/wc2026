import FlagIcon from './FlagIcon'

const GREEN = '#1B4D2E'
const GOLD  = '#C9A227'
const WHITE = '#FFFFFF'

// Layout
const MATCH_H = 48
const UNIT    = 62
const TOTAL_H = 8 * UNIT   // 496
const COL_W   = 88
const CTR_W   = 110

// Slot fill colors (replacing white)
const SLOT_EMPTY  = '#EDE8D8'   // warm parchment — no team yet
const SLOT_FILLED = '#E2EBE2'   // light green tint — team assigned
const SLOT_WIN    = '#FFF3CC'   // light gold — winner

function matchTop(round, idx) {
  const span = Math.pow(2, round) * UNIT
  return idx * span + (span - MATCH_H) / 2
}
function matchMidY(round, idx) {
  return matchTop(round, idx) + MATCH_H / 2
}

// ─── primitives ───────────────────────────────────────────────────────────────

function TeamSlot({ label, team, score, isWinner }) {
  const bg = isWinner ? SLOT_WIN : team ? SLOT_FILLED : SLOT_EMPTY
  const borderColor = isWinner ? GOLD : '#B8B0A0'

  return (
    <div
      style={{
        height: 22,
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        gap: 3,
        border: `1px solid ${borderColor}`,
        background: bg,
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
            <span style={{ fontSize: 9, fontFamily: 'Oswald, sans-serif', color: GREEN, fontWeight: 700, flexShrink: 0 }}>
              {score}
            </span>
          )}
        </>
      ) : (
        <span style={{ fontSize: 7.5, fontFamily: 'Oswald, sans-serif', color: '#9A8E78', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
        <div style={{
          position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
          background: '#E74C3C', color: WHITE, fontSize: 6, fontFamily: 'Oswald, sans-serif',
          padding: '1px 4px', borderRadius: 2, letterSpacing: '0.1em', zIndex: 10, whiteSpace: 'nowrap',
        }}>LIVE</div>
      )}
      <TeamSlot label={match.slot1Label} team={match.homeTeam} score={match.homeScore} isWinner={homeWon} />
      <div style={{ height: 2 }} />
      <TeamSlot label={match.slot2Label} team={match.awayTeam} score={match.awayScore} isWinner={awayWon} />
    </div>
  )
}

// ─── round column ─────────────────────────────────────────────────────────────

function RoundLabel({ text }) {
  return (
    <div style={{
      background: GREEN, color: WHITE, textAlign: 'center',
      padding: '3px 2px', fontFamily: 'Oswald, sans-serif', fontWeight: 700,
      fontSize: 7.5, letterSpacing: '0.12em', textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
      marginBottom: 4,
    }}>
      <span style={{ color: GOLD, fontSize: 6.5 }}>★</span>
      {text}
      <span style={{ color: GOLD, fontSize: 6.5 }}>★</span>
    </div>
  )
}

function RoundColumn({ matches, round, label }) {
  return (
    <div style={{ flexShrink: 0, width: COL_W }}>
      <RoundLabel text={label} />
      <div style={{ position: 'relative', width: COL_W, height: TOTAL_H }}>
        {matches.map((match, i) => (
          <MatchPair key={match.id} match={match} top={matchTop(round, i)} width={COL_W} />
        ))}
      </div>
    </div>
  )
}

// ─── center section ───────────────────────────────────────────────────────────

function CenterSection({ final, thirdPlace }) {
  const homeWon   = final.status === 'FINISHED' && final.homeScore > final.awayScore
  const awayWon   = final.status === 'FINISHED' && final.awayScore > final.homeScore
  const t3HomeWon = thirdPlace.status === 'FINISHED' && thirdPlace.homeScore > thirdPlace.awayScore
  const t3AwayWon = thirdPlace.status === 'FINISHED' && thirdPlace.awayScore > thirdPlace.homeScore

  const finalTop = matchTop(3, 0)        // 224
  const champTop = finalTop + MATCH_H + 10
  const thirdTop = TOTAL_H - MATCH_H - 26

  return (
    <div style={{ flexShrink: 0, width: CTR_W }}>
      <RoundLabel text="Final" />
      <div style={{ position: 'relative', width: CTR_W, height: TOTAL_H }}>

        {/* Final */}
        <div style={{ position: 'absolute', top: finalTop, left: 0, width: CTR_W }}>
          <TeamSlot label={final.slot1Label} team={final.homeTeam} score={final.homeScore} isWinner={homeWon} />
          <div style={{ height: 2 }} />
          <TeamSlot label={final.slot2Label} team={final.awayTeam} score={final.awayScore} isWinner={awayWon} />
        </div>

        {/* Champion */}
        <div style={{
          position: 'absolute', top: champTop, left: 0, width: CTR_W,
          background: GOLD, border: `2px solid #A07800`, borderRadius: 3,
          padding: '5px 4px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 8.5, color: GREEN, letterSpacing: '0.14em', marginBottom: 3, textTransform: 'uppercase' }}>
            ★ World Champion ★
          </div>
          {final.winner ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <FlagIcon code={final.winner.flag} name={final.winner.name} size="sm" />
              <span style={{ fontSize: 10, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: GREEN }}>{final.winner.name}</span>
            </div>
          ) : (
            <div style={{ fontSize: 8.5, fontFamily: 'Oswald, sans-serif', color: '#5A3E00', opacity: 0.7 }}>TBD</div>
          )}
        </div>

        {/* 3rd Place */}
        <div style={{ position: 'absolute', top: thirdTop, left: 0, width: CTR_W }}>
          <div style={{
            background: '#7A8A7A', color: WHITE, textAlign: 'center',
            padding: '2px 4px', fontFamily: 'Oswald, sans-serif', fontWeight: 700,
            fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3,
          }}>
            3rd Place
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
    <div style={{ background: '#F2EFE6', border: `2px solid ${GREEN}`, borderRadius: 4, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{
        background: GREEN, borderBottom: `3px solid ${GOLD}`,
        padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        <span style={{ color: GOLD, fontSize: 15 }}>★</span>
        <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '1rem', color: WHITE, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Knockout Stage
        </span>
        <span style={{ color: GOLD, fontSize: 15 }}>★</span>
      </div>

      {/* Bracket */}
      <div style={{ padding: '8px 6px' }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-start' }}>

          {/* LEFT: RO32 → SF */}
          <RoundColumn matches={ro32Left}  round={0} label="RO32" />
          <RoundColumn matches={ro16Left}  round={1} label="RO16" />
          <RoundColumn matches={qfLeft}    round={2} label="QF" />
          <RoundColumn matches={sfLeft}    round={3} label="SF" />

          {/* CENTER */}
          <CenterSection final={final} thirdPlace={thirdPlace} />

          {/* RIGHT: SF → RO32 */}
          <RoundColumn matches={sfRight}   round={3} label="SF" />
          <RoundColumn matches={qfRight}   round={2} label="QF" />
          <RoundColumn matches={ro16Right} round={1} label="RO16" />
          <RoundColumn matches={ro32Right} round={0} label="RO32" />

        </div>
      </div>

      {/* Legend */}
      <div style={{
        background: '#E8E4D8', borderTop: `1px solid #C8C4B0`,
        padding: '3px 8px', textAlign: 'center',
        fontSize: 7.5, fontFamily: 'Oswald, sans-serif', color: '#666',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        W = Winner &bull; R/U = Runner-Up &bull; L = Loser
      </div>
    </div>
  )
}
