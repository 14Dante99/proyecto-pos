interface Product {
	name: string;
	quantity: number;
	price: number;
    subtotal:number;
}

export interface Invoice {
	date: string;
	customer: string;
	products: Product[];
	total: number;
}
