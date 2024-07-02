import React from 'react';
import { UseFormRegister, Control, FieldErrors, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { SignOutSchemaValidator } from '@/lib/validation/validation';
import { MemberRole } from '@/types/members';
import { Button } from '@/components/ui/button';

interface UserFormProps {
    onSubmit: () => void;
    register: UseFormRegister<SignOutSchemaValidator>;
    control: Control<SignOutSchemaValidator>;
    errors: FieldErrors<SignOutSchemaValidator>;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, register, control, errors }) => {
    return (
        <Card className="p-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl mb-4">Formulario de Registro</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <Label htmlFor="name" className="text-lg">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nombre"
                            {...register('name')}
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                            defaultValue={client?.customer?.first_name ?? ''}
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
                            defaultValue={client?.customer?.first_name ?? ''}
                        />
                        {errors.lastname && <span className="text-sm text-red-600">{errors.lastname?.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-lg">Correo Electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="ejemplo@gmail.com"
                            autoComplete="email"
                            {...register('email')}
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                        />
                        {errors.email && <span className="text-sm text-red-600">{errors.email?.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-lg">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="**********"
                            {...register('password')}
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                        />
                        {errors.password && <span className="text-sm text-red-600">{errors.password?.message}</span>}
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <div className="w-full md:w-1/2">
                            <Label htmlFor="role" className="text-lg">Rol</Label>
                            <Controller
                                name="role"
                                control={control}
                                defaultValue={MemberRole.MEMBER}
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
                        <Button type="submit" className="bg-green-600 text-white">Guardar Cambi</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default UserForm;
