import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    company: String,
    position: String,
    salaryRange: String,
    status: String,
    notes: String,
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);