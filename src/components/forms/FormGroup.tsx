import cn from '@/utilities/cn';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';

type FormGroup = {
  register: ReturnType<UseFormRegister<any>>;
  formField: {
    label: string;
    name: string;
    type: string;
    required: boolean;
    placeholder: string;
    icon: IconType;
  };
  error: string | undefined;
};

const FormGroup = ({ register, formField, error }: FormGroup) => {
  const { name, type, label, placeholder } = formField;
  const Icon = formField.icon;
  return (
    <div className='w-full flex flex-col space-y-2'>
      <label className={cn('text-xs', error && 'text-red')} htmlFor={name}>
        {label}
      </label>

      <div className='relative'>
        <input
          className={cn(
            'pl-8 w-full pr-4 py-3 border border-lighterGray rounded-lg placeholder:text-base placeholder:text-gray',
            error && 'border-red'
          )}
          type={type}
          {...register}
          placeholder={placeholder}
        />

        <Icon className='text-gray absolute top-1/2 -translate-y-1/2 left-4 text-xs' />

        {error && (
          <p className='text-xs text-red text-right  w-full md:w-fit absolute md:top-1/2 -bottom-5 md:bottom-0 md:-translate-y-1/2 md:right-4'>
            {error}
          </p>
        )}
      </div>

      <p></p>
    </div>
  );
};

export default FormGroup;
