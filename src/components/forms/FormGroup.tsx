import cn from '@/utilities/cn';
import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';
import Paragraph from '../text/Paragraph';

type FormGroupProps<TFormValues extends FieldValues> = {
  register: ReturnType<UseFormRegister<TFormValues>>;
  formField: {
    label: string;
    name: Path<TFormValues>; // Ensures name is a valid key from TFormValues
    type: string;
    required: boolean;
    placeholder: string;
    icon?: IconType;
  };
  error?: string;
  responsive?: boolean;
};

const FormGroup = <TFormValues extends FieldValues>({
  register,
  formField,
  error,
  responsive = false,
}: FormGroupProps<TFormValues>) => {
  const { name, type, label, placeholder, icon } = formField;
  const Icon = icon;

  return (
    <div
      className={cn(
        'w-full flex flex-col space-y-2',
        responsive
          ? 'md:grid md:grid-cols-[40%,1fr] md:items-center space-y-0'
          : ''
      )}>
      <label
        className={cn('text-xs text-gray', error && 'text-red')}
        htmlFor={name}>
        {label}
      </label>

      <div className='relative'>
        <input
          className={cn(
            'pl-10 w-full pr-4 py-3 hover:border-blue text-sm xl:text-base text-gray border border-lighterGray rounded-lg placeholder:text-sm xl:placeholder:text-base placeholder:text-gray',
            error && 'border-red', responsive ? 'pl-4' : ''
          )}
          type={type}
          {...register}
          placeholder={placeholder}
        />

        {Icon && (
          <Icon className='text-gray absolute top-1/2 -translate-y-1/2 left-4 text-xs' />
        )}

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
