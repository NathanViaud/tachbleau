import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    tasks: z.array(z.string()),
    startDate: z.date(),
    endDate: z.date()
});