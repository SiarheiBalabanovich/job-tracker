import mongoose from 'mongoose';
import Job from '../../../models/Job';

export default async function handler(req, res) {
    const { method } = req;

    try {
        if (method === 'GET') {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } else if (method === 'POST') {
            const newJob = new Job(req.body);
            await newJob.save();
            res.status(201).json(newJob);
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error(`Error in ${method} /api/jobs:`, error);
        res.status(500).json({ error: 'Failed to process request' });
    }
}