import { ReactNode } from "react";
import { IconType } from "react-icons";
import { Variant } from "motion/react";

export type LinkType = {
  id: string;
  url: string;
  title: string;
  isVisible: boolean;
  icon: string;
};

export type LinkCardProps = {
  index: number;
  link: LinkType;
  updateLink: (link: LinkType) => void;
  deleteLink: (linkId: string) => void;
  setLinks: React.Dispatch<React.SetStateAction<LinkType[] | null>>;
  links: LinkType[];
  linksFromDb: LinkType[] | null;
};

export type ProfileFormData = {
  profilePicture: File;
  firstName: string;
  lastName: string;
  email?: string;
  bio?: string;
};

export type ProfileDetails = {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email?: string;
  bio?: string;
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
  day?: string;
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
  dailyClickTrendsChartData?: ClickTrendData[];
};

export type NavItem = {
  label: string;
  icon: IconType;
  link: string;
};

// export type RevealProps = {
//   children: ReactNode;
//   className?: string;
//   variants:
//     | "slide left"
//     | "slide right"
//     | "slide up"
//     | "scale up"
//     | "rotate"
//     | "slide down"
//     | "fade in";

//   delay?: number;
//   once?: boolean;
// };

export type ConfirmProps = {
  rejectAction: (shouldClose: boolean) => void;
  acceptAction: () => void;
  header: string;
  content: string;
  variant?: "serious" | "normal";
  isOpen: boolean;
};

export type ThumbnailIcon = {
  name: string;
  icon: IconType;
  category: string;
};

// Basic variant states
export interface MotionVariantStates {
  hidden: Variant;
  visible: Variant;
}

// More specific variant type with optional additional states
export interface MotionVariants extends MotionVariantStates {
  // Optional additional states
  [key: string]: Variant;
}

// Custom transition type with spring and easing options
export interface CustomTransition {
  type?: "spring" | "tween" | "keyframes" | "inertia";
  damping?: number;
  stiffness?: number;
  mass?: number;
  duration?: number;
  ease?: string | [number, number, number, number];
}

// Enhanced variant type with custom transition
export interface EnhancedMotionVariant {
  hidden: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
    rotate?: number;
  };
  visible: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
    rotate?: number;
    transition?: CustomTransition;
  };
}

// // Usage example
// export const exampleVariant: EnhancedMotionVariant = {
//   hidden: {
//     x: 100,
//     opacity: 0,
//     scale: 0.95,
//   },
//   visible: {
//     x: 0,
//     opacity: 1,
//     scale: 1,
//     transition: {
//       type: "spring",
//       damping: 15,
//       stiffness: 250,
//     },
//   },
// };

export type RevealVariantType =
  | "slide up"
  | "slide right"
  | "slide left"
  | "scale up"
  | "rotate"
  | "fade in"
  | "slide down";

// Props for the Reveal component
export interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: RevealVariantType;
  delay?: number;
  once?: boolean;
}
