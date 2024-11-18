"use client";
import AccountOptions from "@/components/admin/profile/AccountOptions";
import ProfileInfoForm from "@/components/admin/profile/ProfileInfoForm";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";
import React, { useState } from "react";

/**
 * Component: [Profile]
 * Description: [Handles all tasks associated with setting and updating profile information]
 */

const Profile = () => {
  useProtectedRoute(true);
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false);

  return (
    <div className="gap-4">
      {/* Profile information */}
      <div className="space-y-6 rounded-t-xl bg-white p-6 md:p-10">
        <div className="space-y-2">
          <Heading variant="h1">Profile Details</Heading>
          <Paragraph>
            Add your details to create a personal touch to your profile
          </Paragraph>
        </div>
        {/* form for setting and viewing user information*/}
        <ProfileInfoForm setShowAccountOptions={setShowAccountOptions} />
      </div>
      {/*  */}
      {showAccountOptions && (
        <AccountOptions closeModal={() => setShowAccountOptions(false)} />
      )}
    </div>
  );
};

export default Profile;
