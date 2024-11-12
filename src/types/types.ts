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

type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export type AnalyticsData = {
  id: string;
  clickCount: number;
  lastClickDate: Date;
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