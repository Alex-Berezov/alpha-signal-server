import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fetchTimeSeries } from './services/alphaVantageService'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!')
})

app.get('/timeseries/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY!
    const response = await fetchTimeSeries(symbol, apiKey)

    // Обработка полученного массива котировок
    const timeSeries = response['Time Series (5min)']
    const quotes = Object.keys(timeSeries).map((timestamp) => {
      return {
        timestamp,
        open: timeSeries[timestamp]['1. open'],
        high: timeSeries[timestamp]['2. high'],
        low: timeSeries[timestamp]['3. low'],
        close: timeSeries[timestamp]['4. close'],
        volume: timeSeries[timestamp]['5. volume'],
      }
    })

    res.json(quotes)
  } catch (error) {
    console.error('Error fetching time series data', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
