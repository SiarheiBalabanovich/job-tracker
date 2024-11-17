import { connectToDatabase } from '../../../lib/mongodb';
import Job from '../../../models/Job';

export default async function handler(req, res) {
  console.log(`Received request: ${req.method} /api/jobs`);
  console.log('Request body:', req.body);
  await connectToDatabase();

  const { method } = req;

  if (method === 'GET') {
    try {
      const jobs = await Job.find().limit(10).lean();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
    }
  } else if (method === 'POST') {
    try {
      const newJob = new Job(req.body);
      await newJob.save();
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create job', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}