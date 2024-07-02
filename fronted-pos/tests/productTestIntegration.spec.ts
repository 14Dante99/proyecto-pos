// import { test, expect } from '@playwright/test';
// import { addProducts} from '../src/lib/products/addProducts';
// import { getAllProducts, getProductById} from '../src/lib/products/getProduct';
// import { updateProductDetails } from '../src/lib/products/putProducts';

// const mockProducts = [
//   {
//     id: 33,
//     name: 'Papas Fritas',
//     container: 'BOLSA',
//     status: 'INACTIVE',
//     stock: 1,
//     price: 0.01
//   },
//   {
//     id: 32,
//     name: 'Aceite',
//     container: 'BOTELLA',
//     status: 'ACTIVE',
//     stock: 1,
//     price: 13
//   }
// ];

// class SupabaseProductTests {
//   mockData = mockProducts;

//   async traerProductoPorId(id: number) {
//     const expectedProduct = this.mockData.find((product) => product.id === id);
//     const result = await getProductById({ id: id.toString() });

//     expect(expectedProduct).toBeDefined(); // Verifica que el producto esperado exista
//     if (expectedProduct) {
//       expect(result).toMatchObject(expectedProduct);
//     }
//   }

//   async traerTodosLosProductos(current: number, pageSize: number) {
//     const startIndex = (current - 1) * pageSize;
//     const expectedSubset = this.mockData.slice(startIndex, startIndex + pageSize);
//     const result = await getAllProducts({ current, pageSize, filter: 'ALL' });

//     expect(result.length).toBe(expectedSubset.length);
//     expectedSubset.forEach((expectedItem, index) => {
//       expect(result[index]).toMatchObject(expectedItem);
//     });
//   }

//   async actualizarDetallesProducto(id: number) {
//     const updatedProduct = {
//       id,
//       name: 'Producto A Actualizado',
//       container: 'Caja',
//       price: 12,
//       stock: 120
//     };

//     const result = await updateProductDetails(updatedProduct);
//     expect(result).toBeDefined();
//     expect(result[0]).toMatchObject(updatedProduct);
//   }
// }

// const supabaseProductTests = new SupabaseProductTests();

// test.describe('API de Supabase para productos', () => {
//   test('Agregar productos', async () => {
//       const newProducts = [
//         {
//           name: 'Producto para prueba',
//           container: 'BOLSA',
//           status: 'ACTIVE',
//           stock: 50,
//           price: 15
//         }
//       ];

//       const response = await addProducts({ products: newProducts });
//       expect(response).toMatchObject({
//         success: true, // Asegúrate de que tu función de addProducts devuelva un objeto con una propiedad success
//         data: expect.any(Array) 
//       });
//   });

//   test('Traer producto por ID', async () => {
//     const id = 1;
//     await supabaseProductTests.traerProductoPorId(id);
//   });

//   test.only('Traer todos los productos', async () => {
//     const current = 1;
//     const pageSize = 2;
//     await supabaseProductTests.traerTodosLosProductos(current, pageSize);
//   });

//   test('Actualizar detalles de producto', async () => {
//     const id = 1;
//     await supabaseProductTests.actualizarDetallesProducto(id);
//   });
// });
