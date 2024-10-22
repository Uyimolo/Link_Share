'use client';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '@/components/brand/Logo';
import FormGroup from '@/components/forms/FormGroup';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Button from '@/components/Button';
import Link from 'next/link';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';

// Form data type definition based on validation schema
type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

// Validation schema using Yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Form fields definition
const registerFormFields: Array<{
  label: string;
  name: keyof RegisterFormData;
  type: string;
  required: boolean;
  placeholder: string;
  icon: IconType;
}> = [
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Email',
    icon: FaEnvelope,
  },
  {
    label: 'Create password',
    name: 'password',
    type: 'password',
    required: true,
    placeholder: 'Password',
    icon: FaLock,
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    required: true,
    placeholder: 'Confirm Password',
    icon: FaLock,
  },
];

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { register: registerNewUser, loading } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: RegisterFormData) => {
    const { email, password } = data;

    setErrorMessage(''); 

    try {
      const userCredential = await registerNewUser(email, password);
      console.log('User created:', userCredential);
      reset();
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Error creating user. Please try again.'); // Update state with error message
    }
  };

  return (
    <div className='p-6 min-h-screen bg-white md:bg-transparent grid md:place-content-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-16'>
        <Logo showFullLogo className='md:mx-auto w-fit ' />

        <div className='space-y-8 md:p-10 md:w-[476px] md:mx-auto bg-white'>
          <div className='space-y-2'>
            <Heading variant='h1'>Create account</Heading>
            <Paragraph className='text-base'>{`Let's get you started sharing your links!`}</Paragraph>
          </div>
          {/* form fields */}
          <div className='space-y-2'>
            {registerFormFields.map((field, index) => (
              <FormGroup
                key={index}
                register={{ ...register(field.name) }}
                formField={field}
                error={errors[field.name]?.message}
              />
            ))}
          </div>
          <Paragraph variant='small'>
            Password must contain at least 8 characters
          </Paragraph>
          {/* Error Message */}
          {errorMessage && (
            <Paragraph variant='small' className='text-red-500'>
              {errorMessage}
            </Paragraph>
          )}{' '}
          <Button type='submit' variant='primary' disabled={loading}>
            {loading ? 'Creating account...' : 'Create new account'}
          </Button>
          <Paragraph className='text-center'>
            Already have an account?{' '}
            <Link className='text-blue' href='/login'>
              Login
            </Link>
          </Paragraph>
        </div>
      </form>
    </div>
  );
};

export default Register;
