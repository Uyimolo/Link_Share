import Paragraph from "@/components/text/Paragraph";
import React from "react";
import { FaEye } from "react-icons/fa6";
import { PiDevices } from "react-icons/pi";
import ClickTrendsChart from "../ClickTrendsChart";
import TopClicksByCountries from "../TopClicksByCountries";
import { ClickTrendData } from "@/types/types";

type LinkAnalytics = {
  mobilePercentage: number;
  desktopPercentage: number;
  uniqueVisitorsCount: number;
  clickLocations: {
    countryCode: string;
    clicks: number;
  }[];
  clickTrendChartData: ClickTrendData[] | undefined;
};

const LinkAnalytics = ({
  mobilePercentage,
  desktopPercentage,
  uniqueVisitorsCount,
  clickLocations,
  clickTrendChartData,
}: LinkAnalytics) => {
  return (
    <div className="grid gap-4 md:w-[calc(100vw-36px)] lg:w-[70vw]">
      <div className="lg:grid-cols- grid w-[calc(100vw-36px)] gap-4 md:w-full md:grid-cols-2">
        <div className="space-y-4">
          {/* devices info */}
          <div className="md:p- grid items-start gap-2 rounded-xl bg-white p-2 md:items-center">
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <PiDevices className="text-lg text-gray" />
              <Paragraph>Devices</Paragraph>
            </div>
            <Paragraph className="pl-2 text-gray lg:flex lg:gap-2">
              {" "}
              <strong>{mobilePercentage ? mobilePercentage : 0}%</strong> mobile
              <br className="lg:hidden" />
              <span className="hidden lg:block">|</span>
              <strong>
                {" "}
                {desktopPercentage ? desktopPercentage : 0}%
              </strong>{" "}
              {" " + "desktop"}
            </Paragraph>
          </div>

          {/* views info */}
          <div className="md:fle grid items-start gap-2 rounded-xl bg-white p-2 md:items-center">
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <FaEye className="text-lg text-gray" />
              <Paragraph>Total views</Paragraph>
            </div>
            <Paragraph className="pl-2 leading-none text-gray">
              {" "}
              <strong>{uniqueVisitorsCount}</strong>{" "}
              {uniqueVisitorsCount === 1 ? "view" : "unique views"}
            </Paragraph>
          </div>
        </div>

        {/* Top countries */}
        <TopClicksByCountries countriesInfo={clickLocations} />
      </div>

      <ClickTrendsChart clickTrendData={clickTrendChartData} />
    </div>
  );
};

export default LinkAnalytics;
