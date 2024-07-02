import { expect } from "chai";
import { z } from 'zod';
import { describe, it } from "mocha";
//test
describe("PRODUCT TEST", () =>{
    const ProductSchema = z.object({
        name: z.string()
            .min(4, { message: 'El nombre del producto debe tener al menos 4 caracteres' })
            .max(100, { message: 'El nombre del producto no puede ser mayor a 100 caracteres' })
    });
    
    it('PT1 - Define longitud entre 4 y 100 caracteres', () => {
        const validProductData = {
            name: 'Producto de Prueba'
        };
        const result = ProductSchema.safeParse(validProductData);
        expect(result.success).to.be.true;
    });

    it('PT2 - Nombre del producto demasiado corto', () => {
        const invalidProductData = {
            name: 'Pro'
        };
        const result = ProductSchema.safeParse(invalidProductData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El nombre del producto debe tener al menos 4 caracteres');
    });

    it('PT3 - Nombre del producto demasiado largo', () => {
        const invalidProductData = {
            name: 'Producto de Prueba con un nombre extremadamente largo que excede el límite permitido de caracteres para poder probar su funcionalidad de manera correcta y envie el error al usuario'
        };
        const result = ProductSchema.safeParse(invalidProductData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El nombre del producto no puede ser mayor a 100 caracteres');
    });

})