import { PlusCircle } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { TableClient } from '@/components/Table/TableClient';
import { Link } from '@tanstack/react-router';
import { type ClientsPagination } from '@/routes/_authenticated/(clients)/clients';

export const Clients = () => {
	return (
		<Tabs defaultValue='all'>
			<div className='flex items-center'>
				<div className='ml-auto flex items-center gap-2'>
					<Link
						className='h-8 gap-1 text-sm bg-[#10b981] hover:bg-[#34d399] text-white flex flex-row items-center p-[0.5em] rounded-[0.5em]'
						to='/clients/add'
						search={(prev) => {
							const data = prev as ClientsPagination;
							return { ...data };
						}}
					>
						<PlusCircle className='h-3.5 w-3.5' />
						<span className='sr-only leading-none sm:not-sr-only sm:whitespace-nowrap'>Cliente</span>
					</Link>
				</div>
			</div>
			<TableClient />
		</Tabs>
	);
};
