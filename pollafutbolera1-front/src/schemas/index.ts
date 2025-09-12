import * as z from 'zod';


export const LoginSchema = z.object({

    nickname: z.string().min(2,{
        message: 'Por favor ingresa un nombre de usuario válido'
    }),
    password: z.string().min(6,{

        message: 'La contraseña debe tener al menos 6 caracteres'
    })

})

export const SignUpSchema = z.object({
    cedula: z.string().min(6, {
        message: 'El número de cédula no puede tener menos de 6 dígitos'
    }).max(10, {
        message: 'El número de cédula no puede tener más de 10 dígitos'
    }).regex(/^[0-9]{6,10}$/, {
        message: 'El número de cédula solo puede contener números'
    }),
    firstName: z.string().min(2, {
        message: 'Por favor ingresa un nombre válido'
    }).regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, {
        message: 'El nombre solo puede contener letras'
    }),
    lastName: z.string().min(2, {
        message: 'Por favor ingresa un apellido válido'
    }).regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, {
        message: 'El apellido solo puede contener letras'
    }),
    phone: z.string().min(10, {
        message: 'El número de teléfono debe tener exactamente 10 dígitos'
    }).max(10, {
        message: 'El número de teléfono debe tener exactamente 10 dígitos'
    }).regex(/^[0-9]{10}$/, {
        message: 'El número de teléfono solo puede contener números'	
    }),
    email: z.string().email({
        message: 'Por favor ingresa un correo electrónico válido'
    }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'El correo electrónico solo puede contener letras, números y los siguientes caracteres: . _ % + - @'
    }),
    nickname: z.string().min(2, {
        message: 'Tu nickname debe tener al menos 2 caracteres'
    }).max(20, {
        message: 'Tu nickname no puede tener más de 20 caracteres'
    }),
    password: z.string().min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,{
        message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
    }),
    confirmPassword: z.string().min(8, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,{
        message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
})

export const personalInfoSchema = z.object({
    cedula: z.string().min(6, {
        message: 'El número de cédula no puede tener menos de 6 dígitos'
    }).max(10, {
        message: 'El número de cédula no puede tener más de 10 dígitos'
    }).regex(/^[0-9]{6,10}$/, {
        message: 'El número de cédula solo puede contener números'
    }),
    firstName: z.string().min(2, {
        message: 'Por favor ingresa un nombre válido'
    }).regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, {
        message: 'El nombre solo puede contener letras'
    }),
    lastName: z.string().min(2, {
        message: 'Por favor ingresa un apellido válido'
    }).regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, {
        message: 'El apellido solo puede contener letras'
    }),
});

export const credentialsSchema = z.object({
    nickname: z.string().min(2, {
        message: 'Tu nickname debe tener al menos 2 caracteres'
    }).max(20, {
        message: 'Tu nickname no puede tener más de 20 caracteres'
    }),
    password: z.string().min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, {
        message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
    }),
    confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
});

export const contactInfoSchema = z.object({
    email: z.string().email({
      message: 'Por favor ingresa un correo electrónico válido'
    }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'El correo electrónico solo puede contener letras, números y los siguientes caracteres: . _ % + - @'
    }),
    phone: z.string().min(10, {
      message: 'El número de teléfono debe tener exactamente 10 dígitos'
    }).max(10, {
      message: 'El número de teléfono debe tener exactamente 10 dígitos'
    }).regex(/^[0-9]{10}$/, {
      message: 'El número de teléfono solo puede contener números'
    })
});