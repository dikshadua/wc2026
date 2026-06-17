import axios from 'axios'

const BASE_URL = 'https://api.football-data.org/v4'
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY
const COMPETITION_ID = 2000 // FIFA World Cup

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Auth-Token': API_KEY,
  },
})

export const fetchCompetition = () => api.get(`/competitions/${COMPETITION_ID}`)
export const fetchMatches = () => api.get(`/competitions/${COMPETITION_ID}/matches?season=2026`)
export const fetchStandings = () => api.get(`/competitions/${COMPETITION_ID}/standings?season=2026`)
export const fetchTeams = () => api.get(`/competitions/${COMPETITION_ID}/teams?season=2026`)

export const hasApiKey = () => Boolean(API_KEY)
