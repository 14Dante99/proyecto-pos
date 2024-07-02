import supabase from '@/lib/supabase';

export const putSalesByState = async ({ status, idSale }: { status: 'COMPLETED' | 'CANCELED'; idSale: number }) => {
	const { data } = await supabase.from('sale').update({ status }).eq('id', idSale).select();
	return data;
};