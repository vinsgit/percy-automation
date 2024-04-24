import { NextApiRequest, NextApiResponse } from 'next';
import { enqueuePercyJob } from '../../../../services/jobs/enqueuePercyJob';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fileName } = req.body;

    try {
      await enqueuePercyJob(fileName);
      res.status(200).json({ message: 'Job enqueued successfully' });
    } catch (error) {
      console.error('Error enqueuing Percy job', error);
      res.status(500).json({ message: 'Failed to enqueue Percy job' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
