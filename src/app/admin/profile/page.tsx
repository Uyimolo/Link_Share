"use client";
import ProfileInfoForm from "@/components/admin/profile/ProfileInfoForm";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";

/**
 * Component: [Profile]
 * Description: [Handles all tasks associated with setting and updating profile information]
 */

const Profile = () => {
  useProtectedRoute(true);

  return (
    <div className="px-4 lg:h-screen lg:bg-white lg:px-0 lg:dark:bg-darkGray">
      {/* Profile information */}
      <div className="overflow-hidde space-y-6 rounded-b-xl rounded-t-xl bg-white pt-6 dark:bg-gray md:pt-14 lg:rounded-none lg:dark:bg-darkGray">
        <div className="space-y-2 px-6">
          <Heading variant="h1">Profile details</Heading>
          <Paragraph>
            Add your details to create a personal touch to your profile
          </Paragraph>
        </div>
        {/* form for setting and viewing user information*/}
        <ProfileInfoForm />
      </div>
    </div>
  );
};

export default Profile;
