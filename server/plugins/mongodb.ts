import type { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();
    
    console.log('Connecting to MongoDB...');
    
    if(!process.env.MONGODB_URI) return;
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Failed to connect to MongoDB', e);
    }
}