
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@/hooks/useQuery';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignOutSchema, SignOutSchemaValidator } from '@/lib/validation/validation';
import { MemberRole } from '@/types/members';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import StepsList from './UserEdit/StepList';
import UserEditHeader from './UserEdit/UserEditHeader';
import type { UsersPagination } from '@/routes/_authenticated/(users)/users';
import { updateUser } from '@/lib/user/updateUser';

import { getUserById, UserData } from '@/lib/user/getUser';
const route = getRouteApi('/_authenticated/users/$id');


const UserEdit = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SignOutSchemaValidator>({
    resolver: zodResolver(SignOutSchema),
  });

  const loaderData = route.useParams();
  const navigate = useNavigate({ from: '/users' });

  const { data: member } = useQuery<SignOutSchemaValidator>({
		fetchFunction: getUserById,
		params: { id: loaderData.id }
	});


  const onSubmit = async () => {
    try {
      if (member === null) return;
			await updateUser(member);
			toast.success('El usuario se ha modificado con éxito');
			return navigate({
				to: '/users',
				search: (searchParams) => {
					const prevSearchParams = searchParams as UsersPagination;
					return { ...prevSearchParams };
				}
			});
		} catch (error) {
			console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-7xl">
        <UserEditHeader handleSubmit={handleSubmit} onSubmit={onSubmit} />
        <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Editar Usuario</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-lg">Nombre</Label>
                    <Input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Nombre"
                      {...register('name')}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                      defaultValue={member?.name ?? ''}
                      
                    />
                    {errors.name && <span className="text-sm text-red-600">{errors.name?.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="text-lg">Apellido</Label>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Apellido"
                      {...register('lastname')}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                      defaultValue={member?.lastname ?? ''}
                    />
                    {errors.lastname && <span className="text-sm text-red-600">{errors.lastname?.message}</span>}
                  </div>
                  <div className="md:col-span-2 flex justify-center">
                    <div className="w-full md:w-1/2">
                      <Label htmlFor="role" className="text-lg">Rol</Label>
                      <Controller
                        name="role"
                        control={control}
                        defaultValue={member?.role ?? 'MEMBER'}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onValueChange={(value) => field.onChange(value as MemberRole)}
                          >
                            <SelectTrigger className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50">
                              <SelectValue placeholder="Seleccionar Rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={MemberRole.MEMBER}>Miembro</SelectItem>
                              <SelectItem value={MemberRole.ADMIN}>Admin</SelectItem>
                              <SelectItem value={MemberRole.SELLER}>Vendedor</SelectItem>
                              <SelectItem value={MemberRole.STOREKEEPER}>Almacenero</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.role && <span className="text-sm text-red-600">{errors.role?.message}</span>}
                    </div>                    
                  </div>
                  <div className="md:col-span-2 flex justify-end space-x-4">
                    <Button 
                      type="submit" 
                      className="bg-green-600 text-white"
                      onClick={onSubmit}>
                      Guardar Cambios 
                      </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <StepsList />
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
