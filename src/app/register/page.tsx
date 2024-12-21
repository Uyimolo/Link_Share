"use client";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "@/components/brand/Logo";
import FormGroup from "@/components/forms/FormGroup";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { IconType } from "react-icons";
import Button from "@/components/Button";
import Link from "next/link";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

// Form data type definition based on validation schema
type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

// Validation schema using Yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  username: yup.string().min(6).max(30).required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormFieldsType = {
  label: string;
  name: keyof RegisterFormData;
  type: string;
  required: boolean;
  placeholder: string;
  icon: IconType;
}[];

// Form fields definition
const registerFormFields: FormFieldsType = [
  {
    label: "Email address",
    name: "email",
    type: "email",
    required: true,
    placeholder: "Email",
    icon: FaEnvelope,
  },
  {
    label: "Username",
    name: "username",
    type: "text",
    required: true,
    placeholder: "Username",
    icon: FaUser,
  },
  {
    label: "Create password",
    name: "password",
    type: "password",
    required: true,
    placeholder: "Password",
    icon: FaLock,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
    placeholder: "Confirm Password",
    icon: FaLock,
  },
];

const Register = () => {
  const { isRouteLoading } = useProtectedRoute(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { registerNewUser, loading } = useAuthContext();

  const onSubmit = async (data: RegisterFormData) => {
    const { email, password, username } = data;
    try {
      const registered = await registerNewUser(email, password, username);
      if (registered) {
        reset();
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (isRouteLoading) {
    return (
      <div className="grid h-screen place-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen bg-white p-6 dark:bg-transparent md:bg-transparent md:py-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        <Logo
          showFullLogo
          className="w-fit cursor-pointer md:mx-auto"
          onClick={() => router.push("/")}
        />

        <div className="space-y-8 bg-white dark:bg-transparent md:mx-auto md:w-[476px] md:p-10 md:dark:bg-lighterNavy">
          <div className="space-y-2">
            <Heading variant="h1">Create account</Heading>
            <Paragraph className="text-base">{`Let's get you started sharing your links!`}</Paragraph>
          </div>

          {/* form fields */}
          <div className="space-y-4">
            {registerFormFields.map((field, index) => (
              <FormGroup
                key={index}
                register={{ ...register(field.name) }}
                formField={field}
                error={errors[field.name]?.message}
              />
            ))}
          </div>

          <Paragraph variant="small">
            Password must contain at least 8 characters
          </Paragraph>

          <Button type="submit" variant="primary" disabled={loading}>
            Create new account
          </Button>

          <Paragraph className="text-center">
            Already have an account?{" "}
            <Link className="text-blue" href="/login">
              Login
            </Link>
          </Paragraph>
        </div>
      </form>
    </div>
  );
};

export default Register;
