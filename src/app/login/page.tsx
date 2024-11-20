"use client";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "@/components/brand/Logo";
import FormGroup from "@/components/forms/FormGroup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IconType } from "react-icons";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";
import Loading from "@/components/Loading";

// Form data type definition based on validation schema
type LoginFormData = {
  email: string;
  password: string;
};

// Validation schema using Yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

// Form fields definition
const loginFormFields: Array<{
  label: string;
  name: keyof LoginFormData;
  type: string;
  required: boolean;
  placeholder: string;
  icon: IconType;
}> = [
  {
    label: "Email address",
    name: "email",
    type: "email",
    required: true,
    placeholder: "Email",
    icon: FaEnvelope,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
    placeholder: "Password",
    icon: FaLock,
  },
];

const Login = () => {
  const { isRouteLoading } = useProtectedRoute(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const { login, loading } = useAuthContext();
  // const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    // setErrorMessage('');

    try {
      await login(email, password);
      reset();
    } catch (error) {
      console.error("Error signing in with email and password:", error);
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
    <div className="grid min-h-screen bg-white p-6 md:bg-transparent md:py-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        <Logo
          showFullLogo
          className="w-fit cursor-pointer md:mx-auto"
          onClick={() => router.push("/")}
        />

        <div className="space-y-8 bg-white md:mx-auto md:w-[476px] md:p-10">
          <div className="space-y-2">
            <Heading variant="h1">Login</Heading>
            <Paragraph>{`Add your details to get back into the app`}</Paragraph>
            <Paragraph className="text-blue" variant="small">
              Test details: <br /> Email: test@mail.com <br /> Password:
              12345678
            </Paragraph>
          </div>

          <div className="space-y-4">
            {loginFormFields.map((field, index) => (
              <FormGroup
                key={index}
                register={{ ...register(field.name) }}
                formField={field}
                error={errors[field.name]?.message}
              />
            ))}
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            Login
          </Button>

          <Paragraph className="text-center text-sm text-gray">
            {` Don't have an account?`}{" "}
            <Link className="text-blue" href="/register">
              Create account
            </Link>
          </Paragraph>
        </div>
      </form>
    </div>
  );
};

export default Login;
