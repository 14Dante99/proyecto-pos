import { expect } from "chai";
import { z } from 'zod';
import { describe, it } from "mocha";

describe("Validation TEST", () =>{
    const MemberRoleEnum = z.enum(['MEMBER', 'ADMIN', 'SELLER', 'STOREKEEPER'], {
        required_error: 'Debe seleccionar un rol',
    });

    const BaseSchema = z.object({
        email: z.string().trim().min(1, { message: 'Este campo no debe estar vacío.' }).email('No es un email válido.'),
        password: z.string().trim().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    });

    const SignOutSchema = BaseSchema.extend({
        name: z.string().trim().min(5, { message: 'El nombre debe tener al menos 5 caracteres' }),
        lastname: z.string().trim().min(5, { message: 'El apellido debe tener al menos 5 caracteres' }),
        role: MemberRoleEnum
    });

    const ProfileSchema = SignOutSchema.omit({ email: true })
        .extend({
            confirmPassword: z.string()
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Las contraseñas deben coincidir.',
            path: ['confirmPassword']
        });


        it('VT1 - Validación de correo y contraseña', () => {
            const validData = {
                email: 'usuario@example.com',
                password: 'password123'
            };
            const result = BaseSchema.safeParse(validData);
            expect(result.success).to.be.true;
        });
    
        it('VT2 - Validación de nombre, apellido y rol', () => {
            const validData = {
                email: 'usuario@example.com',
                password: 'password123',
                name: 'Nombre',
                lastname: 'Apellido',
                role: 'ADMIN'
            };
            const result = SignOutSchema.safeParse(validData);
            expect(result.success).to.be.true;
        });
    
        it('VT3 - Validación de perfil con contraseña coincidente', () => {
            const validData = {
                email: 'usuario@example.com',
                password: 'password123',
                name: 'Nombre',
                lastname: 'Apellido',
                role: 'ADMIN',
                confirmPassword: 'password123'
            };
            const result = ProfileSchema.safeParse(validData);
            expect(result.success).to.be.true;
        });
    
        it('VT4 - Validación de perfil con contraseña no coincidente', () => {
            const invalidData = {
                email: 'usuario@example.com',
                password: 'password123',
                name: 'Nombre',
                lastname: 'Apellido',
                role: 'ADMIN',
                confirmPassword: 'password456'
            };
            const result = ProfileSchema.safeParse(invalidData);
            expect(result.success).to.be.false;
            expect(result.error.errors[0].message).to.equal('Las contraseñas deben coincidir.');
        });
    
        it('VT5 - Validación de rol no seleccionado', () => {
            const invalidData = {
                email: 'usuario@example.com',
                password: 'password123',
                name: 'Nombre',
                lastname: 'Apellido'
                // No se incluye el campo 'role'
            };
            const result = SignOutSchema.safeParse(invalidData);
            expect(result.success).to.be.false;
            expect(result.error.errors[0].message).to.equal('Debe seleccionar un rol');
        });

})