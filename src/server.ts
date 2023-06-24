import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fetchTimeSeries } from 'services/alphaVantageService'

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
    const response = await fetchTimeSeries(symbol)
    res.json(response)
  } catch (error) {
    console.error('Error fetching time series data', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
