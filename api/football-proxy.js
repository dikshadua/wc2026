export default async function handler(req, res) {
  const { endpoint, season } = req.query
  const API_KEY = process.env.VITE_FOOTBALL_API_KEY

  if (!API_KEY) {
    return res.status(401).json({ error: 'API key not configured' })
  }

  const allowed = ['matches', 'standings', 'teams']
  if (!allowed.includes(endpoint)) {
    return res.status(400).json({ error: 'Invalid endpoint' })
  }

  const qs = season ? `?season=${season}` : ''
  const url = `https://api.football-data.org/v4/competitions/2000/${endpoint}${qs}`

  try {
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY },
    })
    const data = await response.json()
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(response.status).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Upstream fetch failed', message: err.message })
  }
}
