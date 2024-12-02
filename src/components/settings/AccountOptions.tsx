"use client";
import { useState } from "react";
import Heading from "../text/Heading";
import Paragraph from "../text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
// import useProfileInfo from "@/custom-hooks/useProfileInfo";
import Confirm from "../Confirm";

const AccountOptions = () => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] =
    useState(false);

  const { logout, handleAccountDeletion } = useAuthContext();
  // const { profileInfo } = useProfileInfo();

  const DeleteAccountConfirmation = (
    <Confirm
      variant="serious"
      header="Warning!"
      content="Deleting your account
          will permanently remove all your data and this action can't be undone. Deleting your account requires a recent login.
          Please log out and log back in, before proceeding."
      rejectAction={() => setShowDeleteAccountConfirmation(false)}
      acceptAction={() => handleAccountDeletion}
    />
  );

  const LogoutConfirmation = (
    <Confirm
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

      {showDeleteAccountConfirmation && DeleteAccountConfirmation}

      {showLogoutConfirmation && LogoutConfirmation}
    </div>
  );
};

export default AccountOptions;
