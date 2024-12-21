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
    <div className="px-4 lg:bg-white dark:bg-deepNavy lg:px-0">
      {/* Profile information */}
      <div className="space-y-6 rounded-b-xl rounded-t-xl border border-transparent lg:border-none bg-white pt-6 dark:border-lighterGray/50  dark:bg-deepNavy md:pt-14 lg:rounded-none">
        <div className="space-y-2 px-6 ">
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
