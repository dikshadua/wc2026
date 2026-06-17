// Maps 3-letter TLA codes (from football-data.org API) to ISO 2-letter flag codes (for flagcdn.com)
export const TLA_TO_FLAG = {
  CZE: 'cz', MEX: 'mx', RSA: 'za', KOR: 'kr',
  BIH: 'ba', CAN: 'ca', QAT: 'qa', SUI: 'ch',
  BRA: 'br', HAI: 'ht', MAR: 'ma', SCO: 'gb-sct',
  AUS: 'au', PAR: 'py', TUR: 'tr', USA: 'us',
  CUW: 'cw', ECU: 'ec', GER: 'de', CIV: 'ci',
  JPN: 'jp', NED: 'nl', SWE: 'se', TUN: 'tn',
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz',
  CPV: 'cv', KSA: 'sa', ESP: 'es', URU: 'uy',
  FRA: 'fr', IRQ: 'iq', NOR: 'no', SEN: 'sn',
  ALG: 'dz', ARG: 'ar', AUT: 'at', JOR: 'jo',
  COL: 'co', COD: 'cd', POR: 'pt', UZB: 'uz',
  CRO: 'hr', ENG: 'gb-eng', GHA: 'gh', PAN: 'pa',
}

export const GROUPS = [
  {
    id: 'A',
    name: 'Group A',
    teams: [
      { id: 1, name: 'Mexico', code: 'MEX', flag: 'mx' },
      { id: 2, name: 'Czechia', code: 'CZE', flag: 'cz' },
      { id: 3, name: 'South Africa', code: 'RSA', flag: 'za' },
      { id: 4, name: 'South Korea', code: 'KOR', flag: 'kr' },
    ],
  },
  {
    id: 'B',
    name: 'Group B',
    teams: [
      { id: 5, name: 'Canada', code: 'CAN', flag: 'ca' },
      { id: 6, name: 'Bosnia & Herz.', code: 'BIH', flag: 'ba' },
      { id: 7, name: 'Qatar', code: 'QAT', flag: 'qa' },
      { id: 8, name: 'Switzerland', code: 'SUI', flag: 'ch' },
    ],
  },
  {
    id: 'C',
    name: 'Group C',
    teams: [
      { id: 9, name: 'Brazil', code: 'BRA', flag: 'br' },
      { id: 10, name: 'Haiti', code: 'HAI', flag: 'ht' },
      { id: 11, name: 'Morocco', code: 'MAR', flag: 'ma' },
      { id: 12, name: 'Scotland', code: 'SCO', flag: 'gb-sct' },
    ],
  },
  {
    id: 'D',
    name: 'Group D',
    teams: [
      { id: 13, name: 'USA', code: 'USA', flag: 'us' },
      { id: 14, name: 'Australia', code: 'AUS', flag: 'au' },
      { id: 15, name: 'Paraguay', code: 'PAR', flag: 'py' },
      { id: 16, name: 'Türkiye', code: 'TUR', flag: 'tr' },
    ],
  },
  {
    id: 'E',
    name: 'Group E',
    teams: [
      { id: 17, name: 'Germany', code: 'GER', flag: 'de' },
      { id: 18, name: 'Curaçao', code: 'CUW', flag: 'cw' },
      { id: 19, name: 'Ecuador', code: 'ECU', flag: 'ec' },
      { id: 20, name: "Côte d'Ivoire", code: 'CIV', flag: 'ci' },
    ],
  },
  {
    id: 'F',
    name: 'Group F',
    teams: [
      { id: 21, name: 'Netherlands', code: 'NED', flag: 'nl' },
      { id: 22, name: 'Japan', code: 'JPN', flag: 'jp' },
      { id: 23, name: 'Sweden', code: 'SWE', flag: 'se' },
      { id: 24, name: 'Tunisia', code: 'TUN', flag: 'tn' },
    ],
  },
  {
    id: 'G',
    name: 'Group G',
    teams: [
      { id: 25, name: 'Belgium', code: 'BEL', flag: 'be' },
      { id: 26, name: 'Egypt', code: 'EGY', flag: 'eg' },
      { id: 27, name: 'Iran', code: 'IRN', flag: 'ir' },
      { id: 28, name: 'New Zealand', code: 'NZL', flag: 'nz' },
    ],
  },
  {
    id: 'H',
    name: 'Group H',
    teams: [
      { id: 29, name: 'Spain', code: 'ESP', flag: 'es' },
      { id: 30, name: 'Cape Verde', code: 'CPV', flag: 'cv' },
      { id: 31, name: 'Saudi Arabia', code: 'KSA', flag: 'sa' },
      { id: 32, name: 'Uruguay', code: 'URU', flag: 'uy' },
    ],
  },
  {
    id: 'I',
    name: 'Group I',
    teams: [
      { id: 33, name: 'France', code: 'FRA', flag: 'fr' },
      { id: 34, name: 'Iraq', code: 'IRQ', flag: 'iq' },
      { id: 35, name: 'Norway', code: 'NOR', flag: 'no' },
      { id: 36, name: 'Senegal', code: 'SEN', flag: 'sn' },
    ],
  },
  {
    id: 'J',
    name: 'Group J',
    teams: [
      { id: 37, name: 'Argentina', code: 'ARG', flag: 'ar' },
      { id: 38, name: 'Algeria', code: 'ALG', flag: 'dz' },
      { id: 39, name: 'Austria', code: 'AUT', flag: 'at' },
      { id: 40, name: 'Jordan', code: 'JOR', flag: 'jo' },
    ],
  },
  {
    id: 'K',
    name: 'Group K',
    teams: [
      { id: 41, name: 'Portugal', code: 'POR', flag: 'pt' },
      { id: 42, name: 'Colombia', code: 'COL', flag: 'co' },
      { id: 43, name: 'DR Congo', code: 'COD', flag: 'cd' },
      { id: 44, name: 'Uzbekistan', code: 'UZB', flag: 'uz' },
    ],
  },
  {
    id: 'L',
    name: 'Group L',
    teams: [
      { id: 45, name: 'England', code: 'ENG', flag: 'gb-eng' },
      { id: 46, name: 'Croatia', code: 'CRO', flag: 'hr' },
      { id: 47, name: 'Ghana', code: 'GHA', flag: 'gh' },
      { id: 48, name: 'Panama', code: 'PAN', flag: 'pa' },
    ],
  },
]

// Generate all group stage matches (6 per group)
function generateGroupMatches() {
  const matches = []
  let matchId = 1

  GROUPS.forEach((group) => {
    const teams = group.teams
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id: matchId++,
          groupId: group.id,
          stage: 'GROUP',
          homeTeam: teams[i],
          awayTeam: teams[j],
          homeScore: null,
          awayScore: null,
          status: 'SCHEDULED',
          date: null,
        })
      }
    }
  })

  return matches
}

export const MATCHES = generateGroupMatches()

// Knockout structure following FIFA 2026 bracket
export function getKnockoutStructure() {
  const ro32Matches = [
    { id: 'R32-1',  slot1Label: 'W Group A', slot2Label: 'R/U Group B', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-2',  slot1Label: 'W Group C', slot2Label: 'R/U Group D', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-3',  slot1Label: 'W Group E', slot2Label: 'R/U Group F', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-4',  slot1Label: 'W Group G', slot2Label: 'R/U Group H', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-5',  slot1Label: 'W Group I', slot2Label: 'R/U Group J', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-6',  slot1Label: 'W Group K', slot2Label: 'R/U Group L', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-7',  slot1Label: 'W Group B', slot2Label: 'R/U Group A', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-8',  slot1Label: 'W Group D', slot2Label: 'R/U Group C', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-9',  slot1Label: 'W Group F', slot2Label: 'R/U Group E', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-10', slot1Label: 'W Group H', slot2Label: 'R/U Group G', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-11', slot1Label: 'W Group J', slot2Label: 'R/U Group I', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-12', slot1Label: 'W Group L', slot2Label: 'R/U Group K', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-13', slot1Label: 'Best 3rd (1)', slot2Label: 'Best 3rd (2)', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-14', slot1Label: 'Best 3rd (3)', slot2Label: 'Best 3rd (4)', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-15', slot1Label: 'Best 3rd (5)', slot2Label: 'Best 3rd (6)', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
    { id: 'R32-16', slot1Label: 'Best 3rd (7)', slot2Label: 'Best 3rd (8)', homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, status: 'TBD' },
  ]

  const ro16Matches = Array.from({ length: 8 }, (_, i) => ({
    id: `R16-${i + 1}`,
    slot1Label: `W R32-${i * 2 + 1}`,
    slot2Label: `W R32-${i * 2 + 2}`,
    homeTeam: null,
    awayTeam: null,
    homeScore: null,
    awayScore: null,
    status: 'TBD',
  }))

  const qfMatches = Array.from({ length: 4 }, (_, i) => ({
    id: `QF-${i + 1}`,
    slot1Label: `W R16-${i * 2 + 1}`,
    slot2Label: `W R16-${i * 2 + 2}`,
    homeTeam: null,
    awayTeam: null,
    homeScore: null,
    awayScore: null,
    status: 'TBD',
  }))

  const sfMatches = Array.from({ length: 2 }, (_, i) => ({
    id: `SF-${i + 1}`,
    slot1Label: `W QF-${i * 2 + 1}`,
    slot2Label: `W QF-${i * 2 + 2}`,
    homeTeam: null,
    awayTeam: null,
    homeScore: null,
    awayScore: null,
    status: 'TBD',
  }))

  const finalMatch = {
    id: 'FINAL',
    slot1Label: 'W SF-1',
    slot2Label: 'W SF-2',
    homeTeam: null,
    awayTeam: null,
    homeScore: null,
    awayScore: null,
    status: 'TBD',
  }

  const thirdPlace = {
    id: 'THIRD',
    slot1Label: 'L SF-1',
    slot2Label: 'L SF-2',
    homeTeam: null,
    awayTeam: null,
    homeScore: null,
    awayScore: null,
    status: 'TBD',
  }

  return {
    ro32: ro32Matches,
    ro16: ro16Matches,
    qf: qfMatches,
    sf: sfMatches,
    final: finalMatch,
    thirdPlace,
  }
}

export function computeStandings(groupId, matches) {
  const group = GROUPS.find((g) => g.id === groupId)
  if (!group) return []

  const stats = {}
  group.teams.forEach((team) => {
    stats[team.code.toUpperCase()] = {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
    }
  })

  const groupMatches = matches.filter(
    (m) => m.groupId === groupId && m.status === 'FINISHED' && m.homeScore !== null && m.awayScore !== null
  )

  groupMatches.forEach((match) => {
    const home = stats[match.homeTeam?.code?.toUpperCase()]
    const away = stats[match.awayTeam?.code?.toUpperCase()]
    if (!home || !away) return

    const hs = match.homeScore
    const as_ = match.awayScore

    home.played++
    away.played++
    home.gf += hs
    home.ga += as_
    away.gf += as_
    away.ga += hs
    home.gd = home.gf - home.ga
    away.gd = away.gf - away.ga

    if (hs > as_) {
      home.won++
      home.pts += 3
      away.lost++
    } else if (hs < as_) {
      away.won++
      away.pts += 3
      home.lost++
    } else {
      home.drawn++
      away.drawn++
      home.pts += 1
      away.pts += 1
    }
  })

  return Object.values(stats).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.gd !== a.gd) return b.gd - a.gd
    if (b.gf !== a.gf) return b.gf - a.gf
    return a.team.name.localeCompare(b.team.name)
  })
}
