import { getGoals } from './_apisports.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { date, home, away } = req.query;
    const data = await getGoals({ date, home, away, key: process.env.APISPORTS_KEY });
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
