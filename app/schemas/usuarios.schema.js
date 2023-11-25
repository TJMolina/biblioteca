import {z} from 'zod';
export const schemaRegistrarUsuario = z.object({
    username: z.string({
        required_error: 'Usermane is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        required_error: 'Invalid email.'
    }),
    password: z.string({
        required_error: 'Password is required.'
    }).min(6,{
        message: 'Passord must be almost 6 characters.'
    })
});
export const schemaLoginUsuario = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        required_error: 'Invalid email.'
    }),
    password: z.string({
        required_error: 'Password is required.'
    }).min(6,{
        message: 'Passord must be almost 6 characters.'
    })
});