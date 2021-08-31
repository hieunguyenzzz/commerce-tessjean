import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = serverRuntimeConfig.emailSubscribeUrl
    if (!url) {
      throw new Error('EMAIL_SUBSCRIBE_URL not found')
    }
    console.log(req.body)
    fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((result) => {
      const jsonData = result.json()
      console.log(jsonData)
      res.status(200).json(jsonData)
      return jsonData
    })
  } catch (error) {
    console.error(error)
  }
  return res
}
