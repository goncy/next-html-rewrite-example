import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // For demo purposes we're not doing anything with Auth
  if (!req.headers['Authorization']) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // await res.unstable_revalidate(`/${req.body.bucket}`);
  try {
    await res.unstable_revalidate(
      `/localhost?secret=${process.env.REVALIDATE_SECRET}`
    );
    return res.json({ done: true });
  } catch (e) {
    console.log('Revalidation failed with:', e);
    return res.json({ done: false });
  }
}
