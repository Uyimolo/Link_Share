"use client";
import useConfirmPageLeave from "@/custom-hooks/useConfirmPageLeave";
import { useLinks } from "@/custom-hooks/useLinks";
import { useRef, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MockupPreview from "@/components/mockup-preview/MockupPreview";
import LinkTab from "@/components/dashboard/links/LinkTab";
import ProfileTab from "@/components/dashboard/profile/ProfileTab";
import PreviewLinksAndProfile from "@/components/preview/PreviewLinksAndProfile";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import cn from "@/utilities/cn";
import AnalyticsTab from "@/components/dashboard/analytics/AnalyticsTab";

/**
 * Component: [Dashboard]
 * Description: [This component handles all links related processes (addition, updating, deleting and saving to db and preview), profile updates and analytics]
 */

const Dashboard = () => {
  const { links, setLinks, linksFromDb, saveLinks, loading } = useLinks();
  const { profileInfo } = useProfileInfo();

  // container ref to serve as reference for scrolling down effect when new links are added
  const containerRef = useRef<HTMLDivElement>(null);

  // state for tracking the index of the currently displayed dashboard tab
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    {
      title: "Links",
      content: (
        <LinkTab
          links={links}
          setLinks={setLinks}
          saveLinks={saveLinks}
          loading={loading}
          linksFromDb={linksFromDb}
          containerRef={containerRef}
        />
      ),
    },
    { title: "Profile", content: <ProfileTab /> },
    { title: "Analytics", content: <AnalyticsTab /> },
    {
      title: "Preview",
      content: (
        <PreviewLinksAndProfile
          isPublic={true}
          links={links}
          loading={loading}
          profileInfo={profileInfo}
        />
      ),
    },
  ];

  // Ask for user confirmation before reloading or leaving page if there are unsaved link changes.
  useConfirmPageLeave(links !== linksFromDb);

  return (
    <div>
      <DashboardHeader tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div
        className={cn(
          "rounded-xl px-4",
          tabIndex === 3 || tabIndex === 2
            ? ""
            : "lg:grid lg:grid-cols-[40%,1fr] lg:items-stretch lg:gap-4",
        )}
      >
        {tabIndex < 2 && (
          <div className="hidden rounded-t-xl bg-white py-10 lg:block 2xl:py-20">
            <MockupPreview />
          </div>
        )}

        <div className="gap-4 lg:space-y-0" ref={containerRef}>
          {tabs[tabIndex].content}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
