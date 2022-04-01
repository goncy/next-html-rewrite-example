import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.SECRET === req.headers['x-secret-key']) {
    await res.unstable_revalidate(`/_bucket/${req.body.bucket}`)

    return res.json({ revalidated: true })
  }

  return res.status(401).end()
}
