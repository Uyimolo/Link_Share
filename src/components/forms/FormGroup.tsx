import cn from '@/utilities/cn';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';
import Paragraph from '../text/Paragraph';

type FormGroup = {
  // eslint-disable-next-line
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
            'pl-8 w-full pr-4 py-3 hover:border-blue text-sm xl:text-base text-gray border border-lighterGray rounded-lg placeholder:text-sm xl:placeholder:text-base placeholder:text-gray',
            error && 'border-red'
          )}
          type={type}
          {...register}
          placeholder={placeholder}
        />

        <Icon className='text-gray absolute top-1/2 -translate-y-1/2 left-4 text-xs' />

        {error && (
          <Paragraph
            variant='small'
            className='text-red text-right w-full md:w-fit absolute md:top-1/2 -bottom-5 md:bottom-0 md:-translate-y-1/2 md:right-4'>
            {error}
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
