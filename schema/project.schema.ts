import * as z from 'zod';

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.any(),
    endDate: z.any()
});