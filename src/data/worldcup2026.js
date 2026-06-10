export const GROUPS = [
  {
    id: 'A',
    name: 'Group A',
    teams: [
      { id: 1, name: 'Mexico', code: 'MEX', flag: 'mx' },
      { id: 2, name: 'Ecuador', code: 'ECU', flag: 'ec' },
      { id: 3, name: 'Honduras', code: 'HON', flag: 'hn' },
      { id: 4, name: 'Jamaica', code: 'JAM', flag: 'jm' },
    ],
  },
  {
    id: 'B',
    name: 'Group B',
    teams: [
      { id: 5, name: 'Canada', code: 'CAN', flag: 'ca' },
      { id: 6, name: 'Uruguay', code: 'URU', flag: 'uy' },
      { id: 7, name: 'Cameroon', code: 'CMR', flag: 'cm' },
      { id: 8, name: "Côte d'Ivoire", code: 'CIV', flag: 'ci' },
    ],
  },
  {
    id: 'C',
    name: 'Group C',
    teams: [
      { id: 9, name: 'Brazil', code: 'BRA', flag: 'br' },
      { id: 10, name: 'Croatia', code: 'CRO', flag: 'hr' },
      { id: 11, name: 'Morocco', code: 'MAR', flag: 'ma' },
      { id: 12, name: 'Mali', code: 'MLI', flag: 'ml' },
    ],
  },
  {
    id: 'D',
    name: 'Group D',
    teams: [
      { id: 13, name: 'USA', code: 'USA', flag: 'us' },
      { id: 14, name: 'Colombia', code: 'COL', flag: 'co' },
      { id: 15, name: 'New Zealand', code: 'NZL', flag: 'nz' },
      { id: 16, name: 'Ukraine', code: 'UKR', flag: 'ua' },
    ],
  },
  {
    id: 'E',
    name: 'Group E',
    teams: [
      { id: 17, name: 'Germany', code: 'GER', flag: 'de' },
      { id: 18, name: 'Japan', code: 'JPN', flag: 'jp' },
      { id: 19, name: 'Costa Rica', code: 'CRC', flag: 'cr' },
      { id: 20, name: 'Saudi Arabia', code: 'KSA', flag: 'sa' },
    ],
  },
  {
    id: 'F',
    name: 'Group F',
    teams: [
      { id: 21, name: 'Portugal', code: 'POR', flag: 'pt' },
      { id: 22, name: 'Paraguay', code: 'PAR', flag: 'py' },
      { id: 23, name: 'Iraq', code: 'IRQ', flag: 'iq' },
      { id: 24, name: 'Zimbabwe', code: 'ZIM', flag: 'zw' },
    ],
  },
  {
    id: 'G',
    name: 'Group G',
    teams: [
      { id: 25, name: 'Netherlands', code: 'NED', flag: 'nl' },
      { id: 26, name: 'Senegal', code: 'SEN', flag: 'sn' },
      { id: 27, name: 'Chile', code: 'CHI', flag: 'cl' },
      { id: 28, name: 'South Korea', code: 'KOR', flag: 'kr' },
    ],
  },
  {
    id: 'H',
    name: 'Group H',
    teams: [
      { id: 29, name: 'Spain', code: 'ESP', flag: 'es' },
      { id: 30, name: 'South Africa', code: 'RSA', flag: 'za' },
      { id: 31, name: 'Egypt', code: 'EGY', flag: 'eg' },
      { id: 32, name: 'Iceland', code: 'ISL', flag: 'is' },
    ],
  },
  {
    id: 'I',
    name: 'Group I',
    teams: [
      { id: 33, name: 'France', code: 'FRA', flag: 'fr' },
      { id: 34, name: 'Nigeria', code: 'NGA', flag: 'ng' },
      { id: 35, name: 'Norway', code: 'NOR', flag: 'no' },
      { id: 36, name: 'Turkey', code: 'TUR', flag: 'tr' },
    ],
  },
  {
    id: 'J',
    name: 'Group J',
    teams: [
      { id: 37, name: 'Argentina', code: 'ARG', flag: 'ar' },
      { id: 38, name: 'Kenya', code: 'KEN', flag: 'ke' },
      { id: 39, name: 'Albania', code: 'ALB', flag: 'al' },
      { id: 40, name: 'Panama', code: 'PAN', flag: 'pa' },
    ],
  },
  {
    id: 'K',
    name: 'Group K',
    teams: [
      { id: 41, name: 'England', code: 'ENG', flag: 'gb-eng' },
      { id: 42, name: 'Tunisia', code: 'TUN', flag: 'tn' },
      { id: 43, name: 'Bosnia & Herz.', code: 'BIH', flag: 'ba' },
      { id: 44, name: 'DR Congo', code: 'COD', flag: 'cd' },
    ],
  },
  {
    id: 'L',
    name: 'Group L',
    teams: [
      { id: 45, name: 'Belgium', code: 'BEL', flag: 'be' },
      { id: 46, name: 'Peru', code: 'PER', flag: 'pe' },
      { id: 47, name: 'Serbia', code: 'SRB', flag: 'rs' },
      { id: 48, name: 'Australia', code: 'AUS', flag: 'au' },
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
    stats[team.id] = {
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
    const home = stats[match.homeTeam.id]
    const away = stats[match.awayTeam.id]
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
