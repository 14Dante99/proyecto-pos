import supabase from '@/lib/supabase';
import { MemberData } from '@/types/members';

export interface UserData extends Omit<MemberData, 'id'> {
	id: number;
}

export const getAllUsers = async ({ current, pageSize }: { current: number; pageSize: number }): Promise<MemberData[]> => {
	try {
		const pageCurrent = (current - 1) * pageSize;
		const offset = pageCurrent + pageSize - 1;

		const { data, error } = await supabase
			.from('member')
			.select(
				`
                id,
                name,
                lastname,
                member_role!inner (
                    role,
                    status
                )
            `
			)
			.range(pageCurrent, offset);

		if (error) throw new Error(error.message);

		const formattedData = data.map((member) => ({
			member_id: member.id,
			member_name: member.name,
			member_lastname: member.lastname,
			member_role_app: member.member_role[0]?.role,
			member_status: member.member_role[0]?.status
		}));

		return formattedData;
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
};

export const getCountUsers = async (): Promise<number> => {
	try {
		const { count, error } = await supabase
			.from('member')
			.select(`
                id,
                name,
                lastname,
                member_role!inner (
                    role,
                    status
                )
            `, { count: 'exact', head: true });

		if (error) throw new Error(error.message);

		return count ?? 0;
	} catch (error) {
		console.error('Error fetching user count:', error);
		return 0;
	}
};

export const getUserById = async ({ id,timeout }: { id: string , timeout: (milliseconds: number) => AbortSignal}) => {
	const { data: menber } = await supabase
	.from('member')
	.select(`id,name,lastname,member_role!inner (role,status)`)
	.eq('id', id)
	.abortSignal(timeout(3000));
	
	return menber?.[0] as unknown as UserData;
};