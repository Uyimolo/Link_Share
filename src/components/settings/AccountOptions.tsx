"use client";
import { useState } from "react";
import Heading from "../text/Heading";
import Paragraph from "../text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import Confirm from "../Confirm";
import { auth } from "../../../config/firebase";
import Modal from "../Modal";
import FormGroup from "../forms/FormGroup";
import { IconType } from "react-icons";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button";
import { toast } from "sonner";

type PasswordPromptType = {
  password: string;
};

type FormFieldsType = {
  label: string;
  name: keyof PasswordPromptType;
  type: string;
  required: boolean;
  placeholder: string;
  icon: IconType;
}[];

const passwordPromptFormFileds: FormFieldsType = [
  {
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
    name: "password",
    icon: FaLock,
  },
];

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Passwords must be atleast 8 characters")
    .required("Password is required"),
});

const AccountOptions = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] =
    useState(false);

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const { logout, handleAccountDeletion, reAuthenticateUser } =
    useAuthContext();
  const { profileInfo } = useProfileInfo();

  // reauthenticate the user and delete user
  const deleteAccount = async (providedPassword: string) => {
    setShowDeleteAccountConfirmation(false);
    if (auth.currentUser && providedPassword) {
      const userAuthenticated = await reAuthenticateUser(
        auth.currentUser,
        providedPassword,
      ); // Re-authenticate user to delete account

      if (userAuthenticated) {
        handleAccountDeletion(profileInfo);
      } else {
        reset();
        setShowPasswordPrompt(false);
        toast.error("Failed to delete account. User reauthentication failed.");
      }
    }
  };

  const onSubmit = (data: PasswordPromptType) => {
    const { password } = data;
    deleteAccount(password);
  };

  const DeleteAccountConfirmation = (
    <Confirm
      isOpen={showDeleteAccountConfirmation}
      variant="serious"
      header="Warning!"
      content="Deleting your account
          will permanently remove all your data and this action can't be undone"
      rejectAction={() => setShowDeleteAccountConfirmation(false)}
      acceptAction={() => {
        setShowDeleteAccountConfirmation(false);
        setShowPasswordPrompt(true);
      }}
    />
  );

  const PasswordPrompt = (
    <Modal isOpen={showPasswordPrompt}>
      <form
        className="space-y-4 rounded-xl bg-white p-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paragraph>
          For your safety confirm your password before you can delete your
          account
        </Paragraph>

        <FormGroup
          register={{ ...register(passwordPromptFormFileds[0].name) }}
          formField={passwordPromptFormFileds[0]}
          error={errors[passwordPromptFormFileds[0].name]?.message}
          inputClassName="mb-4"
        />

        <div className="flex justify-end space-x-2">
          <Button className="w-fit px-4 py-2" type="submit">
            Confirm
          </Button>
          <Button
            variant="secondary"
            className="w-fit px-4 py-2"
            onClick={() => setShowPasswordPrompt(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );

  const LogoutConfirmation = (
    <Confirm
      isOpen={showLogoutConfirmation}
      header="Are you sure you want to log out?"
      content="This action will log you out of your
          account."
      rejectAction={() => setShowLogoutConfirmation(false)}
      acceptAction={logout}
    />
  );

  return (
    <div className="">
      <Heading
        variant="h2"
        className="mb-2 text-lg underline underline-offset-2 md:text-lg lg:text-lg"
      >
        Account options
      </Heading>

      {/* content */}
      <div className="space-y-2">
        <Paragraph
          className="w-fit cursor-pointer hover:text-blue"
          onClick={() => setShowLogoutConfirmation(true)}
        >
          Logout
        </Paragraph>
        <Paragraph
          className="w-fit cursor-pointer hover:text-blue"
          onClick={() => setShowDeleteAccountConfirmation(true)}
        >
          Delete account
        </Paragraph>
      </div>

      {DeleteAccountConfirmation}
      {LogoutConfirmation}
      {PasswordPrompt}
    </div>
  );
};

export default AccountOptions;
