import axios, { AxiosResponse } from 'axios'

const alphaVantageAPI = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: process.env.ALPHA_VANTAGE_API_KEY,
  },
})

export const fetchTimeSeries = async (
  symbol: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await alphaVantageAPI.get('/', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '5min',
        outputsize: 'full',
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching data from Alpha Vantage', error)
    throw error
  }
}
