import { expect } from "chai";
import { describe, it } from "mocha";
import { z } from 'zod';
//test
describe("CLIENT TEST", () =>{
    const CustomerSchema = z.object({
        dni: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' }),
        last_name: z.string().min(1, { message: 'El Apellido es obligatorio y no puede estar vacío.' }),
        birth_date: z.date({ message: 'La Fecha de Nacimiento debe tener el formato DD/MM/AAAA.' }),
        first_name: z.string({ message: 'El Nombre debe ser texto.' }).min(1, { message: 'El Nombre es obligatorio y no puede estar vacío.' })
    });

    const AddressSchema = z.object({
        street: z.string().min(1, { message: 'La Calle es obligatoria y no puede estar vacía.' }),
        city: z.string().min(1, { message: 'La ciudad es obligatoria y no puede estar vacía.' }),
        state: z.string().min(1, { message: 'El departamento es obligatorio y no puede estar vacío.' }),
        customer: CustomerSchema
    });


    it('CT1-Datos Del Cliente', () => {

        const validCustomerData = {
            dni: '12345678',
            last_name: 'Apellido',
            birth_date: new Date('1990-01-01'),
            first_name: 'Nombre'
        };
        const result = CustomerSchema.safeParse(validCustomerData);
        expect(result.success).to.be.true;
    })

    it('CT2-Datos de Dirección', () => {
        const validAddressData = {
            street: 'Calle Principal',
            city: 'Ciudad',
            state: 'Estado',
            customer: {
                dni: '12345678',
                last_name: 'Apellido',
                birth_date: new Date('1990-01-01'),
                first_name: 'Nombre'
            }
        };

        // Validar que los datos de la dirección cumplan con el esquema
        const result = AddressSchema.safeParse(validAddressData);
        expect(result.success).to.be.true;
    });

    it('CT3 - Cliente con DNI inválido', () => {
        const invalidCustomerData = {
            dni: '12345', // DNI inválido (menos de 8 dígitos)
            last_name: 'Apellido',
            birth_date: new Date('1990-01-01'),
            first_name: 'Nombre'
        };
        const result = CustomerSchema.safeParse(invalidCustomerData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El DNI debe contener exactamente 8 dígitos numéricos.');
    });

    it('CT4 - Dirección con calle vacía', () => {
        const invalidAddressData = {
            street: '', // Calle vacía
            city: 'Ciudad',
            state: 'Estado',
            customer: {
                dni: '12345678',
                last_name: 'Apellido',
                birth_date: new Date('1990-01-01'),
                first_name: 'Nombre'
            }
        };
        const result = AddressSchema.safeParse(invalidAddressData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('La Calle es obligatoria y no puede estar vacía.');
    });
})