import { IconType } from "react-icons";

export type LinkType = {
  id: string;
  url: string;
  title: string;
};

export type LinkCardProps = {
  index: number;
  link: LinkType;
  updateLink: (link: LinkType) => void;
  deleteLink: (linkId: string) => void;
};

export type ProfileFormData = {
  profilePicture: File;
  firstName: string;
  lastName: string;
  email?: string;
};

export type ProfileDetails = {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GeolocationResponse = {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
};

export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export type AnalyticsData = {
  id: string;
  clickCount: number;
  lastClickDate: FirestoreTimestamp;
  clickLocations: {
    [countryCode: string]: number; // Country codes as keys, counts as values
  };
  clickTrends: FirestoreTimestamp[]; // Array of timestamps representing click times
  deviceType: {
    mobile: number;
    desktop: number;
  };
  uniqueVisitors: string[]; // Array of visitor IDs (like IPs)
};

export type ClickTrendData = {
  year: number;
  month: string;
  count: number;
};

export type LifetimeAnalyticsData = {
  clickCount: number;
  uniqueVisitors: string[];
  deviceType: {
    mobile: number;
    desktop: number;
  };
};

export type DeviceData = {
  name: string;
  value: number;
}[];

export type LinkWithAnalytics = {
  id: string;
  url: string;
  title: string;
  icon?: IconType;
  color: string;
  clickCount: number;
  clickTrends: FirestoreTimestamp[];
  deviceType: {
    [device: string]: number;
  };
  uniqueVisitors: string[];
  clickLocations: {
    countryCode: string;
    clicks: number;
  }[];
  lastClickDate?: string;
  clickTrendsChartData?: ClickTrendData[];
};

// Type '{ id: string;
// url: string;
// title: string;
// icon: IconType | undefined;
// clickCount: number;
// clickTrends: FirestoreTimestamp[];
// deviceType: { }; uniqueVisitors: string[];
// clickLocations: { ...; };
// lastClickDate: number | undefined; }[]
// ' is not assignable to type 'LinkWithAnalytics[]'.
//     Type '{ id: string; url: string; title: string; icon: IconType | undefined; clickCount: number; clickTrends: FirestoreTimestamp[]; deviceType: {}; uniqueVisitors: string[]; clickLocations: { ...; }; lastClickDate: number | undefined; }' is not assignable to type 'LinkWithAnalytics'.
//       Types of property 'lastClickDate' are incompatible.
//         Type 'number | undefined' is not assignable to type 'FirestoreTimestamp | undefined'.
//           Type 'number' is not assignable to type 'FirestoreTimestamp'.ts(2345)
// const linksWithAnalytics: {
//     id: string;
//     url: string;
//     title: string;
//     icon: IconType | undefined;
//     clickCount: number;
//     clickTrends: FirestoreTimestamp[];
//     deviceType: {};
//     uniqueVisitors: string[];
//     clickLocations: {
//         ...;
//     };
//     lastClickDate: number | undefined;
// }[]

export type NavItem = {
  label: string;
  icon: IconType;
  link: string;
};
