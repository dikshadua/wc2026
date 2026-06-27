import FlagIcon from './FlagIcon'

const GREEN = '#1B4D2E'
const GOLD  = '#C9A227'
const WHITE = '#FFFFFF'

// Layout — enlarged for readability
const SLOT_H   = 34
const SLOT_GAP = 4
const MATCH_H  = SLOT_H * 2 + SLOT_GAP  // 72
const UNIT     = 100
const TOTAL_H  = 8 * UNIT               // 800
const COL_W    = 140
const CTR_W    = 152
const GAP_W    = 12
const LABEL_H  = 28
const LABEL_MB = 6

const SLOT_EMPTY  = '#F5F3EE'
const SLOT_FILLED = '#EEF4EE'
const SLOT_WIN    = '#FFFBE6'

function matchTop(round, idx) {
  const span = Math.pow(2, round) * UNIT
  return idx * span + (span - MATCH_H) / 2
}

function matchMidY(round, idx) {
  return matchTop(round, idx) + MATCH_H / 2
}

// SVG bracket connector between two adjacent columns
function BracketConnector({ wideRound, narrowRound, side }) {
  const count = 8 / Math.pow(2, narrowRound)
  const mid = GAP_W / 2
  const d = Array.from({ length: count }, (_, k) => {
    const y0 = matchMidY(wideRound, 2 * k)
    const y1 = matchMidY(wideRound, 2 * k + 1)
    const ym = matchMidY(narrowRound, k)
    return side === 'left'
      ? `M 0 ${y0} H ${mid} M 0 ${y1} H ${mid} M ${mid} ${y0} V ${y1} M ${mid} ${ym} H ${GAP_W}`
      : `M ${GAP_W} ${y0} H ${mid} M ${GAP_W} ${y1} H ${mid} M ${mid} ${y0} V ${y1} M ${mid} ${ym} H 0`
  }).join(' ')

  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: LABEL_H + LABEL_MB, flexShrink: 0 }} />
      <svg width={GAP_W} height={TOTAL_H} style={{ display: 'block' }}>
        <path d={d} stroke={GOLD} strokeWidth={1.5} fill="none" opacity={0.6} />
      </svg>
    </div>
  )
}

// Simple horizontal line from SF column into the Final
function SFConnector({ side }) {
  const ym = matchMidY(3, 0)
  const d = side === 'left' ? `M 0 ${ym} H ${GAP_W}` : `M ${GAP_W} ${ym} H 0`
  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: LABEL_H + LABEL_MB, flexShrink: 0 }} />
      <svg width={GAP_W} height={TOTAL_H} style={{ display: 'block' }}>
        <path d={d} stroke={GOLD} strokeWidth={1.5} fill="none" opacity={0.6} />
      </svg>
    </div>
  )
}

function TeamSlot({ label, team, score, isWinner }) {
  const bg = isWinner ? SLOT_WIN : team ? SLOT_FILLED : SLOT_EMPTY

  return (
    <div style={{
      height: SLOT_H,
      display: 'flex',
      alignItems: 'center',
      paddingRight: 8,
      gap: 6,
      background: bg,
      border: `1px solid ${isWinner ? GOLD : '#D0C9B5'}`,
      borderLeft: `3px solid ${isWinner ? GOLD : 'transparent'}`,
      minWidth: 0,
    }}>
      <div style={{ width: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {team && <FlagIcon code={team.flag} name={team.name} size="md" />}
      </div>
      {team ? (
        <>
          <span style={{
            flex: 1,
            fontSize: 11,
            fontFamily: 'Inter, sans-serif',
            color: '#1A1A1A',
            fontWeight: isWinner ? 700 : 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {team.name}
          </span>
          {score !== null && score !== undefined && (
            <span style={{
              fontSize: 14,
              fontFamily: 'Oswald, sans-serif',
              color: isWinner ? '#7A5800' : '#222',
              fontWeight: 700,
              flexShrink: 0,
              minWidth: 16,
              textAlign: 'right',
            }}>
              {score}
            </span>
          )}
        </>
      ) : (
        <span style={{
          flex: 1,
          fontSize: 9,
          fontFamily: 'Oswald, sans-serif',
          color: '#9A8E78',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

function MatchCard({ match, top, width }) {
  const homeWon = match.status === 'FINISHED' && match.homeScore > match.awayScore
  const awayWon = match.status === 'FINISHED' && match.awayScore > match.homeScore
  const isLive  = match.status === 'IN_PLAY' || match.status === 'PAUSED'

  return (
    <div style={{
      position: 'absolute',
      top,
      left: 0,
      width,
      height: MATCH_H,
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
    }}>
      {isLive && (
        <div style={{
          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
          background: '#E74C3C', color: WHITE, fontSize: 7.5, fontFamily: 'Oswald, sans-serif',
          padding: '1px 6px', borderRadius: 2, letterSpacing: '0.1em', zIndex: 10, whiteSpace: 'nowrap',
        }}>
          ● LIVE
        </div>
      )}
      <TeamSlot label={match.slot1Label} team={match.homeTeam} score={match.homeScore} isWinner={homeWon} />
      <div style={{ height: SLOT_GAP, background: '#DDD8C8' }} />
      <TeamSlot label={match.slot2Label} team={match.awayTeam} score={match.awayScore} isWinner={awayWon} />
    </div>
  )
}

function RoundLabel({ text }) {
  return (
    <div style={{
      height: LABEL_H,
      boxSizing: 'border-box',
      background: GREEN,
      color: WHITE,
      textAlign: 'center',
      padding: '2px 6px',
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      marginBottom: LABEL_MB,
      borderRadius: 2,
    }}>
      <span style={{ color: GOLD, fontSize: 8 }}>★</span>
      {text}
      <span style={{ color: GOLD, fontSize: 8 }}>★</span>
    </div>
  )
}

function RoundColumn({ matches, round, label }) {
  return (
    <div style={{ flexShrink: 0, width: COL_W }}>
      <RoundLabel text={label} />
      <div style={{ position: 'relative', width: COL_W, height: TOTAL_H }}>
        {matches.map((match, i) => (
          <MatchCard key={match.id} match={match} top={matchTop(round, i)} width={COL_W} />
        ))}
      </div>
    </div>
  )
}

function CenterSection({ final, thirdPlace }) {
  const homeWon   = final.status === 'FINISHED' && final.homeScore > final.awayScore
  const awayWon   = final.status === 'FINISHED' && final.awayScore > final.homeScore
  const t3HomeWon = thirdPlace.status === 'FINISHED' && thirdPlace.homeScore > thirdPlace.awayScore
  const t3AwayWon = thirdPlace.status === 'FINISHED' && thirdPlace.awayScore > thirdPlace.homeScore

  const finalTop = matchTop(3, 0)          // 364
  const champTop = finalTop + MATCH_H + 14 // 450
  const thirdTop = TOTAL_H - MATCH_H - 50  // 678

  return (
    <div style={{ flexShrink: 0, width: CTR_W }}>
      <RoundLabel text="Final" />
      <div style={{ position: 'relative', width: CTR_W, height: TOTAL_H }}>

        {/* Final match */}
        <div style={{
          position: 'absolute',
          top: finalTop,
          left: 0,
          width: CTR_W,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        }}>
          <TeamSlot label={final.slot1Label} team={final.homeTeam} score={final.homeScore} isWinner={homeWon} />
          <div style={{ height: SLOT_GAP, background: GOLD, opacity: 0.35 }} />
          <TeamSlot label={final.slot2Label} team={final.awayTeam} score={final.awayScore} isWinner={awayWon} />
        </div>

        {/* Champion */}
        <div style={{
          position: 'absolute',
          top: champTop,
          left: 0,
          width: CTR_W,
          background: `linear-gradient(145deg, ${GOLD} 0%, #D4A020 100%)`,
          border: `2px solid #A07800`,
          borderRadius: 5,
          padding: '10px 8px',
          textAlign: 'center',
          boxShadow: '0 3px 10px rgba(201,162,39,0.4)',
        }}>
          <div style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: 10,
            color: GREEN,
            letterSpacing: '0.16em',
            marginBottom: 7,
            textTransform: 'uppercase',
          }}>
            ★ World Champion ★
          </div>
          {final.winner ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <FlagIcon code={final.winner.flag} name={final.winner.name} size="md" />
              <span style={{ fontSize: 14, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: GREEN }}>
                {final.winner.name}
              </span>
            </div>
          ) : (
            <div style={{ fontSize: 10, fontFamily: 'Oswald, sans-serif', color: '#5A3E00', opacity: 0.6 }}>
              TBD
            </div>
          )}
        </div>

        {/* 3rd Place */}
        <div style={{ position: 'absolute', top: thirdTop, left: 0, width: CTR_W }}>
          <div style={{
            background: '#6B7A6B',
            color: WHITE,
            textAlign: 'center',
            padding: '4px',
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: 9,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 4,
            borderRadius: '2px 2px 0 0',
          }}>
            3rd Place
          </div>
          <div style={{ borderRadius: '0 0 3px 3px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            <TeamSlot label={thirdPlace.slot1Label} team={thirdPlace.homeTeam} score={thirdPlace.homeScore} isWinner={t3HomeWon} />
            <div style={{ height: SLOT_GAP, background: '#DDD8C8' }} />
            <TeamSlot label={thirdPlace.slot2Label} team={thirdPlace.awayTeam} score={thirdPlace.awayScore} isWinner={t3AwayWon} />
          </div>
        </div>

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
    <div style={{ background: '#F2EFE6', border: `2px solid ${GREEN}`, borderRadius: 4, overflow: 'hidden' }}>

      <div style={{
        background: GREEN,
        borderBottom: `3px solid ${GOLD}`,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}>
        <span style={{ color: GOLD, fontSize: 18 }}>★</span>
        <span style={{
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: WHITE,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}>
          Knockout Stage
        </span>
        <span style={{ color: GOLD, fontSize: 18 }}>★</span>
      </div>

      <div style={{ padding: '10px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* LEFT: RO32 → RO16 → QF → SF → Final */}
          <RoundColumn matches={ro32Left}  round={0} label="RO32" />
          <BracketConnector wideRound={0} narrowRound={1} side="left" />
          <RoundColumn matches={ro16Left}  round={1} label="RO16" />
          <BracketConnector wideRound={1} narrowRound={2} side="left" />
          <RoundColumn matches={qfLeft}    round={2} label="QF" />
          <BracketConnector wideRound={2} narrowRound={3} side="left" />
          <RoundColumn matches={sfLeft}    round={3} label="SF" />
          <SFConnector side="left" />

          <CenterSection final={final} thirdPlace={thirdPlace} />

          {/* RIGHT: Final → SF → QF → RO16 → RO32 */}
          <SFConnector side="right" />
          <RoundColumn matches={sfRight}   round={3} label="SF" />
          <BracketConnector wideRound={2} narrowRound={3} side="right" />
          <RoundColumn matches={qfRight}   round={2} label="QF" />
          <BracketConnector wideRound={1} narrowRound={2} side="right" />
          <RoundColumn matches={ro16Right} round={1} label="RO16" />
          <BracketConnector wideRound={0} narrowRound={1} side="right" />
          <RoundColumn matches={ro32Right} round={0} label="RO32" />

        </div>
      </div>

      <div style={{
        background: '#E8E4D8',
        borderTop: `1px solid #C8C4B0`,
        padding: '4px 10px',
        textAlign: 'center',
        fontSize: 9,
        fontFamily: 'Oswald, sans-serif',
        color: '#666',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        W = Winner &bull; R/U = Runner-Up &bull; L = Loser
      </div>

    </div>
  )
}
