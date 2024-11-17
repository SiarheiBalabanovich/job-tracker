import { connectToDatabase } from '../../../lib/mongodb';
import Job from '../../../models/Job';

export default async function handler(req, res) {
  await connectToDatabase(); // Подключаемся к базе данных
  
  const { method } = req;
  const { id } = req.query;

  try {
    if (method === 'PUT') {
      const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedJob) {
        res.status(404).json({ message: 'Job not found' });
      } else {
        res.status(200).json(updatedJob);
      }
    } else if (method === 'DELETE') {
      const deletedJob = await Job.findByIdAndDelete(id);
      if (!deletedJob) {
        res.status(404).json({ message: 'Job not found' });
      } else {
        res.status(200).json({ message: 'Job deleted' });
      }
    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to process request', error: error.message });
  }
}