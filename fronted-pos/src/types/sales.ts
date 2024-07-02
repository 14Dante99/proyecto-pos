export const enum SaleStatus {
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}
export interface DetailSales {
  id: number
  quantity: number
  price: number
  subtotal: number
  products: Products
}

export interface Products {
  id: number
  name: string
}

export interface SaleData {
  id: number
  total: number
  status: SaleStatus
  customer: Customer
  sale_date: string
  detail_sale: DetailSales[]

}

export interface Customer {
  first_name: string
}
