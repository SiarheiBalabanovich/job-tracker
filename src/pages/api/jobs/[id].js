import mongoose from 'mongoose';
import Job from './models/Job'; // предполагаем, что модель находится в models/Job.js

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    try {
        if (method === 'PUT') {
            const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedJob) {
                res.status(404).json({ error: 'Job not found' });
            } else {
                res.status(200).json(updatedJob);
            }
        } else if (method === 'DELETE') {
            const deletedJob = await Job.findByIdAndDelete(id);
            if (!deletedJob) {
                res.status(404).json({ error: 'Job not found' });
            } else {
                res.status(204).end();
            }
        } else {
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error(`Error in handler for ${method} /api/jobs/${id}:`, error);
        res.status(500).json({ error: 'Failed to process request' });
    }
}