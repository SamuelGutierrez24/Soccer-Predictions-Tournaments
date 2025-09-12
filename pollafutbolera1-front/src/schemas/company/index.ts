import * as z from 'zod';

export const CreateCompanySchema = z.object({

    name: z.string().min(1, {
          message: 'El nombre de la empresa debe tener al menos 1 caracter'
    }).max(99, {
          message: 'El nombre de la empresa debe tener máximo 99 caracteres'
    }),

    nit: z.string().min(8, {
        message: 'El nit de la empresa debe tener al menos 8 dígitos'
    }).max(99, {
            message: 'El nit de la empresa debe tener máximo 99 caracteres'
    }),

    address: z.string().max(99, {
            message: 'La dirección de la empresa debe tener máximo 99 caracteres'
    }).nullable(),

    contact: z.string().max(99, {
        message: 'El contacto de la empresa debe tener máximo 99 caracteres'
    }).nullable()

})


// Esquema de validación para editar la empresa
export const EditCompanySchema = z.object({
    name: z.string().min(1, {
        message: 'El nombre de la compañía es obligatorio',
    }),

    address: z.string().min(1, {
        message: 'La dirección es obligatoria',
    }),

    contact: z.string().min(1, {
        message: 'El contacto es obligatorio',
    }).refine(value => {
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return phoneRegex.test(value) || emailRegex.test(value);
    }, {
        message: 'El contacto debe ser un número de teléfono válido o un correo electrónico válido',
    }),
});
