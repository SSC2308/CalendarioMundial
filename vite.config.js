import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        // Sirve /api/events en dev usando la misma lógica que la serverless de prod
        name: 'dev-events-api',
        configureServer(server) {
          server.middlewares.use('/api/events', async (req, res) => {
            try {
              const url = new URL(req.url, 'http://localhost')
              const { getGoals } = await server.ssrLoadModule('/api/_apisports.js')
              const data = await getGoals({
                date: url.searchParams.get('date'),
                home: url.searchParams.get('home'),
                away: url.searchParams.get('away'),
                key: env.APISPORTS_KEY,
              })
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
            } catch (e) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: e.message }))
            }
          })
        },
      },
    ],
    server: {
      proxy: {
        '/api/football': {
          target: 'https://api.football-data.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/football/, ''),
        },
      },
    },
  }
})
