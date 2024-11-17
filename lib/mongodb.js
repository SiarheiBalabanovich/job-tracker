require('dotenv').config();

import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
    console.log('Using existing database connection');
    return;
}

    try {
    await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
}
}