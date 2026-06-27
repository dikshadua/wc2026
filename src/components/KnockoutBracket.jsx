import FlagIcon from './FlagIcon'

const GREEN = '#1B4D2E'
const GOLD  = '#C9A227'
const WHITE = '#FFFFFF'

const SLOT_H   = 34
const SLOT_GAP = 1
const MATCH_H  = SLOT_H * 2 + SLOT_GAP  // 69
const UNIT     = 100
const TOTAL_H  = 8 * UNIT               // 800
const COL_W    = 140
const CTR_W    = 152
const GAP_W    = 24  // wider so connector lines are clearly visible

function matchTop(round, idx) {
  const span = Math.pow(2, round) * UNIT
  return idx * span + (span - MATCH_H) / 2
}

function matchMidY(round, idx) {
  return matchTop(round, idx) + MATCH_H / 2
}

// SVG bracket connector — no spacer needed since labels are in the top header row
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
    <svg width={GAP_W} height={TOTAL_H} style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} stroke={GREEN} strokeWidth={1.5} fill="none" opacity={0.45} />
    </svg>
  )
}

function SFConnector({ side }) {
  const ym = matchMidY(3, 0)
  const d = side === 'left' ? `M 0 ${ym} H ${GAP_W}` : `M ${GAP_W} ${ym} H 0`
  return (
    <svg width={GAP_W} height={TOTAL_H} style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} stroke={GREEN} strokeWidth={1.5} fill="none" opacity={0.45} />
    </svg>
  )
}

function TeamSlot({ label, team, score, isWinner }) {
  return (
    <div style={{
      height: SLOT_H,
      display: 'flex',
      alignItems: 'center',
      paddingRight: 8,
      gap: 5,
      background: isWinner ? '#FFFBF0' : WHITE,
      borderLeft: `3px solid ${isWinner ? GOLD : 'transparent'}`,
      minWidth: 0,
    }}>
      <div style={{ width: 34, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {team && <FlagIcon code={team.flag} name={team.name} size="md" />}
      </div>
      {team ? (
        <>
          <span style={{
            flex: 1,
            fontSize: 11,
            fontFamily: 'Inter, sans-serif',
            color: GREEN,
            fontWeight: isWinner ? 600 : 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {team.name}
          </span>
          {score !== null && score !== undefined && (
            <span style={{
              fontSize: 13,
              fontFamily: 'Oswald, sans-serif',
              color: isWinner ? '#7A5800' : GREEN,
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
          color: '#999',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          letterSpacing: '0.04em',
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
      border: `1px solid #DDDDDD`,
      borderRadius: 2,
      overflow: 'hidden',
      background: WHITE,
    }}>
      {isLive && (
        <div style={{
          position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
          background: '#E74C3C', color: WHITE, fontSize: 7, fontFamily: 'Oswald, sans-serif',
          padding: '1px 5px', borderRadius: 2, letterSpacing: '0.1em', zIndex: 10, whiteSpace: 'nowrap',
        }}>
          ● LIVE
        </div>
      )}
      <TeamSlot label={match.slot1Label} team={match.homeTeam} score={match.homeScore} isWinner={homeWon} />
      <div style={{ height: SLOT_GAP, background: '#EEEEEE' }} />
      <TeamSlot label={match.slot2Label} team={match.awayTeam} score={match.awayScore} isWinner={awayWon} />
    </div>
  )
}

// No round label — labels live in the top header row
function RoundColumn({ matches, round }) {
  return (
    <div style={{ flexShrink: 0, width: COL_W }}>
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

  const finalTop = matchTop(3, 0)
  const champTop = finalTop + MATCH_H + 12
  const thirdTop = TOTAL_H - MATCH_H - 52

  return (
    <div style={{ flexShrink: 0, width: CTR_W }}>
      <div style={{ position: 'relative', width: CTR_W, height: TOTAL_H }}>

        {/* Final match */}
        <div style={{
          position: 'absolute',
          top: finalTop,
          left: 0,
          width: CTR_W,
          border: `1px solid ${GOLD}`,
          borderRadius: 2,
          overflow: 'hidden',
          background: WHITE,
        }}>
          <TeamSlot label={final.slot1Label} team={final.homeTeam} score={final.homeScore} isWinner={homeWon} />
          <div style={{ height: SLOT_GAP, background: GOLD, opacity: 0.25 }} />
          <TeamSlot label={final.slot2Label} team={final.awayTeam} score={final.awayScore} isWinner={awayWon} />
        </div>

        {/* Champion */}
        <div style={{
          position: 'absolute',
          top: champTop,
          left: 0,
          width: CTR_W,
          background: GREEN,
          border: `1px solid ${GOLD}`,
          borderRadius: 2,
          padding: '8px 6px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: 9,
            color: GOLD,
            letterSpacing: '0.16em',
            marginBottom: 6,
            textTransform: 'uppercase',
          }}>
            ◆ World Champion ◆
          </div>
          {final.winner ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <FlagIcon code={final.winner.flag} name={final.winner.name} size="md" />
              <span style={{ fontSize: 13, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: WHITE }}>
                {final.winner.name}
              </span>
            </div>
          ) : (
            <div style={{ fontSize: 10, fontFamily: 'Oswald, sans-serif', color: GOLD, opacity: 0.6 }}>TBD</div>
          )}
        </div>

        {/* 3rd Place */}
        <div style={{ position: 'absolute', top: thirdTop, left: 0, width: CTR_W }}>
          <div style={{
            background: '#F0F0F0',
            color: '#555',
            textAlign: 'center',
            padding: '3px 4px',
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: 9,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderBottom: '1px solid #DDDDDD',
          }}>
            3rd Place
          </div>
          <div style={{ border: '1px solid #DDDDDD', borderTop: 'none', borderRadius: '0 0 2px 2px', overflow: 'hidden' }}>
            <TeamSlot label={thirdPlace.slot1Label} team={thirdPlace.homeTeam} score={thirdPlace.homeScore} isWinner={t3HomeWon} />
            <div style={{ height: SLOT_GAP, background: '#EEEEEE' }} />
            <TeamSlot label={thirdPlace.slot2Label} team={thirdPlace.awayTeam} score={thirdPlace.awayScore} isWinner={t3AwayWon} />
          </div>
        </div>

      </div>
    </div>
  )
}

// Single top header row with all round names — matches reference bracket style
function RoundNamesHeader() {
  const cell = (w, text) => (
    <div style={{
      width: w,
      flexShrink: 0,
      textAlign: 'center',
      padding: '7px 4px',
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: GREEN,
      borderRight: `1px solid #E0E0E0`,
    }}>
      {text}
    </div>
  )
  const gap = <div style={{ width: GAP_W, flexShrink: 0, borderRight: `1px solid #E0E0E0` }} />

  return (
    <div style={{ display: 'flex', background: '#F5F5F5', borderBottom: `2px solid ${GREEN}` }}>
      <div style={{ width: 8, flexShrink: 0 }} />
      {cell(COL_W, 'Round of 32')}
      {gap}
      {cell(COL_W, 'Round of 16')}
      {gap}
      {cell(COL_W, 'Quarterfinals')}
      {gap}
      {cell(COL_W, 'Semifinals')}
      {gap}
      {cell(CTR_W, 'Final')}
      {gap}
      {cell(COL_W, 'Semifinals')}
      {gap}
      {cell(COL_W, 'Quarterfinals')}
      {gap}
      {cell(COL_W, 'Round of 16')}
      {gap}
      {cell(COL_W, 'Round of 32')}
      <div style={{ width: 8, flexShrink: 0 }} />
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
    <div style={{ border: `3px solid ${GREEN}`, borderRadius: 3, overflow: 'hidden', background: WHITE }}>

      {/* Section header — matches GroupBlock */}
      <div style={{
        background: GREEN,
        fontFamily: 'Oswald, sans-serif',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.15em',
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: WHITE,
      }}>
        <span style={{ color: GOLD, marginRight: 8 }}>&#9670;</span>
        KNOCKOUT STAGE
        <span style={{ color: GOLD, marginLeft: 8 }}>&#9670;</span>
      </div>

      {/* Round names header row */}
      <RoundNamesHeader />

      {/* Bracket */}
      <div style={{ padding: '10px 8px', background: WHITE }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* LEFT: RO32 → RO16 → QF → SF */}
          <RoundColumn matches={ro32Left}  round={0} />
          <BracketConnector wideRound={0} narrowRound={1} side="left" />
          <RoundColumn matches={ro16Left}  round={1} />
          <BracketConnector wideRound={1} narrowRound={2} side="left" />
          <RoundColumn matches={qfLeft}    round={2} />
          <BracketConnector wideRound={2} narrowRound={3} side="left" />
          <RoundColumn matches={sfLeft}    round={3} />
          <SFConnector side="left" />

          <CenterSection final={final} thirdPlace={thirdPlace} />

          {/* RIGHT: SF → QF → RO16 → RO32 */}
          <SFConnector side="right" />
          <RoundColumn matches={sfRight}   round={3} />
          <BracketConnector wideRound={2} narrowRound={3} side="right" />
          <RoundColumn matches={qfRight}   round={2} />
          <BracketConnector wideRound={1} narrowRound={2} side="right" />
          <RoundColumn matches={ro16Right} round={1} />
          <BracketConnector wideRound={0} narrowRound={1} side="right" />
          <RoundColumn matches={ro32Right} round={0} />

        </div>
      </div>

      <div style={{
        background: '#F5F5F5',
        borderTop: '1px solid #DDDDDD',
        padding: '3px 10px',
        textAlign: 'center',
        fontSize: 8,
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
