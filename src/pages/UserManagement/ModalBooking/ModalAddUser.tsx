import React from 'react'
import { StyleAdd } from './styles';
import Input from '../../../components/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const initialValues = {
    email: '',
}
const CreateUserSchema = z.object({
    email: z.string().email(),
})
export const ModalAddUser = () => {
    const {
      control,
      reset,
      setValue,
      handleSubmit,
      getValues,

      formState: { errors, isSubmitting },
    } = useForm({
      defaultValues: initialValues,
      resolver: zodResolver(CreateUserSchema),
    });
    const onSubmit = () => {
        console.log('first')
    };
  return (
    <StyleAdd.Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'email'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input label='Email' placeholder='Your email' />
              {error && <p>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={'email'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input label='User Name' placeholder='Your user name' />
              {error && <p>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={'email'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input label='Phone Number' placeholder='Your phone number' />
              {error && <p>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={'email'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input label='Email' placeholder='Your email' />
              {error && <p>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={'email'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input label='Email' placeholder='Your email' />
              {error && <p>{error.message}</p>}
            </div>
          )}
        />
      </form>
    </StyleAdd.Wrapper>
  );
}
