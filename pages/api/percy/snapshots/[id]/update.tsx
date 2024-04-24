import { NextApiRequest, NextApiResponse } from 'next';
import RedisService from '../../../../../services/redisService';

interface SnapshotRecord {
  status: string;
}

const redisService = new RedisService();
const redisConnection = redisService.getRedisConnection();

const updateSnapshotStatus = async (fileName: string, status: string): Promise<boolean> => {
  try {
    const existingRecord = await redisConnection.hget('percy:snapshots', fileName);
    if (existingRecord) {
      const parsedRecord: SnapshotRecord = JSON.parse(existingRecord);
      parsedRecord.status = status;
      await redisConnection.hset('percy:snapshots', fileName, JSON.stringify(parsedRecord));
      return true;
    }else{
      return false;
    }
  } catch (error:any) {
    throw new Error(`Running ${fileName} Error: ${error}`);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { status } = req.body;

  try {
    const statusUpdated = await updateSnapshotStatus(id as string, status as string);

    if (statusUpdated) {
      res.status(200).json({ message: 'Status updated successfully' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
