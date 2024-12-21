import React from "react";
import ClickTrendsChart from "../ClickTrendsChart";
import TopClicksByCountries from "../TopClicksByCountries";
import { ClickTrendData, LinkWithAnalytics } from "@/types/types";
import OverviewSection from "../OverviewSection";
import DeviceTypeDistributionChart from "../DeviceTypeDistribution";

type LinkAnalytics = {
  mobilePercentage: number;
  desktopPercentage: number;
  uniqueVisitorsCount: number;
  clickLocations: {
    countryCode: string;
    clicks: number;
  }[];
  clickTrendChartData: ClickTrendData[] | undefined;
  dailyClickTrendData: ClickTrendData[] | undefined;
};

const LinkAnalytics = ({ link }: { link: LinkWithAnalytics }) => {
  const {
    clickLocations,
    clickTrendsChartData,
    dailyClickTrendsChartData,
    deviceType,
    clickCount,
    uniqueVisitors,
  } = link;

  const deviceData = Object.entries(deviceType).map(([deviceType, count]) => ({
    name: deviceType,
    value: count,
  }));

  return (
    <div className="grid w-[90%] mx-auto md:w-full w-ful gap-4 lg:max-w-screen-xl">
      <OverviewSection
        totalClicks={clickCount}
        mobile={deviceType.mobile}
        desktop={deviceType.desktop}
        uniqueImpressions={uniqueVisitors.length}
        numberOfLinks={1}
      />

      <ClickTrendsChart
        clickTrendData={clickTrendsChartData}
        dailyClickTrendData={dailyClickTrendsChartData}
      />

      <div className="grid gap-4 lg:min-w-[900px] lg:grid-cols-2">
        {/* Top countries  */}

        <TopClicksByCountries countriesInfo={clickLocations} />

        {/* Device type distribution */}
        <DeviceTypeDistributionChart
          deviceData={deviceData}
          totalClicks={clickCount}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
};

export default LinkAnalytics;
