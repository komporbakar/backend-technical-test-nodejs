import * as z from 'zod';

export class UserValidation {
    static REGISTER = z.object({
        email: z.string().email(),
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        password: z.string().min(8),
    });
    static LOGIN = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })
    static UPDATE = z.object({
        first_name: z.string().min(1),
        last_name: z.string().min(1),
    })
}