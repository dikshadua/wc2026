import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchMatches, fetchStandings, hasApiKey } from '../api/footballData'
import { GROUPS, MATCHES, getKnockoutStructure, computeStandings, TLA_TO_FLAG } from '../data/worldcup2026'

function getFlag(tla) {
  return TLA_TO_FLAG[tla?.toUpperCase()] || tla?.toLowerCase() || null
}

function normalizeApiMatches(apiMatches) {
  return apiMatches.map((m) => ({
    id: m.id,
    groupId: m.group ? m.group.replace('GROUP_', '') : null,
    stage: m.stage,
    homeTeam: m.homeTeam
      ? { id: m.homeTeam.id, name: m.homeTeam.name, code: m.homeTeam.tla, flag: getFlag(m.homeTeam.tla) }
      : null,
    awayTeam: m.awayTeam
      ? { id: m.awayTeam.id, name: m.awayTeam.name, code: m.awayTeam.tla, flag: getFlag(m.awayTeam.tla) }
      : null,
    homeScore: m.score?.fullTime?.home ?? null,
    awayScore: m.score?.fullTime?.away ?? null,
    status: m.status,
    date: m.utcDate,
  }))
}

function buildStandingsFromMatches(matches) {
  const standingsMap = {}
  GROUPS.forEach((group) => {
    standingsMap[group.id] = computeStandings(group.id, matches)
  })
  return standingsMap
}

export function useWorldCupData() {
  const [groups] = useState(GROUPS)
  const [matches, setMatches] = useState(MATCHES)
  const [standings, setStandings] = useState(() => buildStandingsFromMatches(MATCHES))
  const [knockoutMatches, setKnockoutMatches] = useState(getKnockoutStructure())
  const [liveMatches, setLiveMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isApiConnected, setIsApiConnected] = useState(false)
  const intervalRef = useRef(null)

  const loadData = useCallback(async () => {
    if (!hasApiKey()) return

    try {
      setIsLoading(true)
      setError(null)

      const [matchesRes, standingsRes] = await Promise.allSettled([
        fetchMatches(),
        fetchStandings(),
      ])

      let normalizedMatches = MATCHES

      if (matchesRes.status === 'fulfilled') {
        const apiData = matchesRes.value.data
        normalizedMatches = normalizeApiMatches(apiData.matches || [])
        setMatches(normalizedMatches)

        const finished = normalizedMatches.filter((m) => m.status === 'FINISHED')
        console.log('[WC2026] Matches loaded:', normalizedMatches.length, '| Finished:', finished.length)
        console.log('[WC2026] Sample finished match:', finished[0])

        const live = normalizedMatches.filter(
          (m) => m.status === 'IN_PLAY' || m.status === 'PAUSED'
        )
        setLiveMatches(live)
      } else {
        console.error('[WC2026] Matches fetch failed:', matchesRes.reason)
      }

      if (standingsRes.status === 'fulfilled') {
        const apiStandings = standingsRes.value.data?.standings || []
        console.log('[WC2026] Standings from API:', apiStandings.length, 'groups')
        console.log('[WC2026] Raw standings sample:', apiStandings[0])

        const standingsMap = {}

        apiStandings.forEach((s) => {
          const groupId = s.group?.replace('GROUP_', '')
          console.log('[WC2026] Group raw value:', s.group, '→ parsed:', groupId)
          if (groupId) {
            standingsMap[groupId] = s.table.map((row) => ({
              team: {
                id: row.team.id,
                name: row.team.name,
                code: row.team.tla,
                flag: getFlag(row.team.tla),
              },
              played: row.playedGames,
              won: row.won,
              drawn: row.draw,
              lost: row.lost,
              gf: row.goalsFor,
              ga: row.goalsAgainst,
              gd: row.goalDifference,
              pts: row.points,
            }))
          }
        })

        console.log('[WC2026] Standings map keys:', Object.keys(standingsMap))

        if (Object.keys(standingsMap).length > 0) {
          setStandings(standingsMap)
        } else {
          console.log('[WC2026] No API standings, computing from matches...')
          setStandings(buildStandingsFromMatches(normalizedMatches))
        }
      } else {
        console.error('[WC2026] Standings fetch failed:', standingsRes.reason)
        setStandings(buildStandingsFromMatches(normalizedMatches))
      }

      setIsApiConnected(true)
    } catch (err) {
      console.error('[WC2026] loadData error:', err)
      setError(err.message || 'Failed to load data')
      setIsApiConnected(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Set up polling only during live matches
  useEffect(() => {
    if (!hasApiKey()) return

    loadData()

    const setupPolling = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = setInterval(async () => {
        await loadData()

        // Check if still live
        setLiveMatches((current) => {
          if (current.length === 0 && intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          return current
        })
      }, 60000)
    }

    setupPolling()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [loadData])

  // When live matches change, start or stop polling
  useEffect(() => {
    if (!hasApiKey()) return

    if (liveMatches.length > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(loadData, 60000)
    } else if (liveMatches.length === 0 && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [liveMatches, loadData])

  return {
    groups,
    standings,
    matches,
    knockoutMatches,
    liveMatches,
    isLoading,
    error,
    isApiConnected,
  }
}
