import * as z from 'zod';

export const notificationSchema = z.object({
    title: z.string().min(3).max(255),
    message: z.string().min(3).max(255),
    read: z.boolean().default(false),
    assignedTo: z.string().nullable().optional(),
});