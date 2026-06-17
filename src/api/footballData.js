import axios from 'axios'

const api = axios.create()

const proxy = (endpoint, params = '') =>
  api.get(`/api/football-proxy?endpoint=${endpoint}${params ? `&${params}` : ''}`)

export const fetchCompetition = () => proxy('matches')
export const fetchMatches    = () => proxy('matches',   'season=2026')
export const fetchStandings  = () => proxy('standings', 'season=2026')
export const fetchTeams      = () => proxy('teams',     'season=2026')

export const hasApiKey = () => Boolean(import.meta.env.VITE_FOOTBALL_API_KEY)
