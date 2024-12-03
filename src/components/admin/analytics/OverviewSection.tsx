import Paragraph from "@/components/text/Paragraph";
import { FaEye, FaHandPointer, FaLink } from "react-icons/fa6";
import { PiDevices } from "react-icons/pi";

const OverviewSection = ({
  totalClicks = 0,
  mobile = 0,
  desktop = 0,
  uniqueImpressions = 0,
  numberOfLinks = 0,
}: {
  totalClicks: number | undefined;
  mobile: number | undefined;
  desktop: number | undefined;
  uniqueImpressions: number;
  numberOfLinks?: number;
}) => {
  const mobilePercentage = Math.round((mobile / totalClicks) * 100);
  const desktopPercentage = Math.round((desktop / totalClicks) * 100);

  const overviewContentClassName =
    " grid items-start gap-2 rounded-xl bg-white p-2 md:items-center md:p-4 dark:bg-darkGray";
  
  const headerText = 'dark:text-gray'

  return (
    <div className="bg-whit rounded-xl">
      {/* metric card */}
      <div className="grid gap-4 rounded-xl">
        {/* metrics */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* views */}
          <div className={overviewContentClassName}>
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <FaEye className="text-lg text-gray" />
              <Paragraph className={headerText}>Total views</Paragraph>
            </div>
            <Paragraph className="pl-2 leading-none text-gray">
              {" "}
              <strong>{uniqueImpressions}</strong>{" "}
              {uniqueImpressions === 1 ? "view" : "unique views"}
            </Paragraph>
          </div>

          {/* number of links */}
          <div className={overviewContentClassName}>
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <FaLink className="text-lg text-gray" />
              <Paragraph className={headerText}>Total links</Paragraph>
            </div>
            <Paragraph className="pl-2 text-gray">
              {" "}
              <strong>{numberOfLinks}</strong> links
            </Paragraph>
          </div>

          {/* total clicks */}
          <div className={overviewContentClassName}>
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <FaHandPointer className="text-lg text-gray" />
              <Paragraph className={headerText}>Total clicks</Paragraph>
            </div>
            <Paragraph className="pl-2 text-gray">
              {" "}
              <strong>{totalClicks}</strong> total clicks
            </Paragraph>
          </div>

          {/* devices */}
          <div className={overviewContentClassName}>
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <PiDevices className="text-lg text-gray" />
              <Paragraph className={headerText}>Devices</Paragraph>
            </div>
            <Paragraph className="pl-2 text-gray xl:flex xl:gap-2">
              {" "}
              <strong>{mobilePercentage ? mobilePercentage : 0}%</strong> mobile
              <br className="xl:hidden" />
              <span className="hidden xl:block">|</span>
              <strong>
                {" "}
                {desktopPercentage ? desktopPercentage : 0}%
              </strong>{" "}
              {" " + "desktop"}
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
