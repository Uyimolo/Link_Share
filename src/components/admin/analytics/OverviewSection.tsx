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
    " grid items-start gap-2 rounded-xl bg-white p-2 md:items-center xl:p-4 dark:bg-darkGray";

  const headerText = "dark:text-white text-white";

  const headerClass =
    "flex items-center gap-2 rounded-md  p-1 md:p-2";

  const overviewData = [
    {
      title: "Total views",
      value: `${uniqueImpressions} ${uniqueImpressions > 1 ? "views" : "view"}`,
      icon: FaEye,
      accent: "bg-blue",
    },
    {
      title: "Total links",
      value: `${numberOfLinks} ${numberOfLinks > 1 ? "links" : "link"}`,
      icon: FaLink,
      accent: "bg-orange",
    },
    {
      title: "Total clicks",
      value: `${totalClicks} ${totalClicks > 1 ? "clicks" : "click"}`,
      icon: FaHandPointer,
      accent: "bg-purple-400",
    },
    {
      title: "Devices",
      value: `${mobilePercentage}% mobile`,
      value2: `${desktopPercentage}% desktop`,
      icon: PiDevices,
      accent: "bg-lime-600",
    },
  ];

  return (
    <div className="bg-whit rounded-xl">
      {/* metric card */}
      <div className="grid gap-4 rounded-xl">
        {/* metrics */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {overviewData.map((data, index) => {
            const { title, value, value2, icon, accent } = data;
            const Icon = icon;
            return (
              <div key={index} className={overviewContentClassName}>
                <div className={`${headerClass} ${accent}`}>
                  <Icon className="text-lg text-white" />
                  <Paragraph className={headerText}>{title}</Paragraph>
                </div>
                <Paragraph className="pl-2 leading-none text-gray">
                  {" "}
                  <strong>{value}</strong>
                </Paragraph>
                {value2 && (
                  <Paragraph className="pl-2 leading-none text-gray">
                    <strong>{value2}</strong>
                  </Paragraph>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
