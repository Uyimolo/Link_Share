import AccountOptions from "@/components/settings/AccountOptions";
import Heading from "@/components/text/Heading";
import React from "react";

const Settings = () => {
  return (
    <div className="px-4 lg:px-0">
      <div className="min-h-[80vh] w-full space-y-4 rounded-xl bg-white p-6 dark:bg-gray lg:min-h-screen lg:rounded-none lg:pt-14 lg:dark:bg-darkGray">
        <Heading variant="h1">Settings</Heading>

        <div className="">
          {/* General */}
          {/* Theme / Appearance */}
          {/* Account Settings */}
          <AccountOptions />
          {/* Notifications */}
          {/* Security */}
          {/* Privacy */}
        </div>
      </div>
    </div>
  );
};

export default Settings;