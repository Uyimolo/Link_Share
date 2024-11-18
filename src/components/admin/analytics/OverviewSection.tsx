import Paragraph from "@/components/text/Paragraph";
import { FaEye, FaHandPointer, FaPercent } from "react-icons/fa6";
import { PiDevices } from "react-icons/pi";

const OverviewSection = ({
  totalClicks = 0,
  mobile = 0,
  desktop = 0,
  uniqueImpressions,
  numberOfLinks = 0,
}: {
  totalClicks: number | undefined;
  mobile: number | undefined;
  desktop: number | undefined;
  uniqueImpressions: number;
  numberOfLinks?: number;
}) => {
  const mobilePercentage = (mobile / totalClicks) * 100;
  const desktopPercentage = (desktop / totalClicks) * 100;

  return (
    <div className="bg-whit rounded-xl">
      {/* metric card */}
      <div className="grid gap-4 rounded-xl">
        {/* metrics */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* views */}
          <div className="md:fle grid items-start gap-2 rounded-xl bg-white p-2 md:items-center md:p-4">
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <FaEye className="text-lg text-gray" />
              <Paragraph>Total views</Paragraph>
            </div>
            <Paragraph className="pl-2 leading-none text-gray">
              {" "}
              <strong>{uniqueImpressions}</strong>{" "}
              {uniqueImpressions === 1 ? "view" : "unique views"}
            </Paragraph>
          </div>

          {/* click rate */}
          <div className="md:fle grid items-start gap-2 rounded-xl bg-white p-2 md:items-center md:p-4">
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <FaPercent className="text-lg text-gray" />
              <Paragraph>Total links</Paragraph>
            </div>
            <Paragraph className="pl-2 text-gray">
              {" "}
              <strong>{numberOfLinks}</strong> links
            </Paragraph>
          </div>

          {/* total clicks */}
          <div className="md:fle grid items-start gap-2 rounded-xl bg-white p-2 md:items-center md:p-4">
            <div className="flex items-center gap-2 rounded-md border bg-veryLightBlue p-1 md:p-2">
              <FaHandPointer className="text-lg text-gray" />
              <Paragraph>Total clicks</Paragraph>
            </div>
            <Paragraph className="pl-2 text-gray">
              {" "}
              <strong>{totalClicks}</strong> total clicks
            </Paragraph>
          </div>

          {/* devices */}
          <div className="grid items-start gap-2 rounded-xl bg-white p-2 md:items-center md:p-4">
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
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
