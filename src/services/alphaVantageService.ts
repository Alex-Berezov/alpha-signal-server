import axios from 'axios'

interface AlphaVantageResponse {
  'Time Series (5min)': Record<
    string,
    {
      '1. open': string
      '2. high': string
      '3. low': string
      '4. close': string
      '5. volume': string
    }
  >
}

const alphaVantageAPI = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
})

export const fetchTimeSeries = async (
  symbol: string,
  apiKey: string
): Promise<AlphaVantageResponse> => {
  try {
    const response = await alphaVantageAPI.get('/', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '5min',
        outputsize: 'full',
        extended_hours: false,
        apikey: apiKey,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching data from Alpha Vantage', error)
    throw error
  }
}
