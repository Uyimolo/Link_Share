import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import cn from "@/utilities/cn";
import { CgLaptop } from "react-icons/cg";
import { PiDeviceMobile } from "react-icons/pi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DeviceTypeDistributionChart = ({
  deviceData,
  totalClicks = 0,
  className,
}: {
  className?: string;
  deviceData: {
    name: string;
    value: number;
  }[];
  totalClicks?: number;
}) => {
  const mobile = deviceData.find((data) => data.name === "mobile");
  const desktop = deviceData.find((data) => data.name === "desktop");

  const mobilePercentage = Math.round(
    (mobile ? mobile.value / totalClicks : 0) * 100,
  );

  const desktopPercentage = Math.round(
    (desktop ? desktop.value / totalClicks : 0) * 100,
  );

  return (
    <Card
      className={cn(
        "rounded-xl border-none bg-white pb-0 dark:bg-gray",
        className,
      )}
    >
      <CardHeader>
        <Heading
          variant="h2"
          className="text-base font-semibold sm:text-xl md:text-xl xl:text-xl"
        >
          Device Type Distribution
        </Heading>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={deviceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#4B5563" // Default fill for the pie slices
              label
            >
              {/* Optional: Customize colors for each device type */}
              {deviceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "desktop" ? "#3B82F6" : "#10B981"} // Blue for desktop, green for mobile
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="w-full flex-col space-y-2 px-4">
        <div className="grid w-full grid-cols-[20px,1fr,40px] gap-4 rounded-lg bg-[#3B82F6] p-4 py-2">
          <div className="">
            <CgLaptop className="text-xl text-white" />
          </div>
          <Paragraph className="text-white">
            Clicks from desktop devices
          </Paragraph>
          <Paragraph className="justify-self-end text-white dark:text-white">
            {desktopPercentage}%
          </Paragraph>
        </div>

        <div className="grid w-full grid-cols-[20px,1fr,40px] gap-4 rounded-lg bg-[#10B981] px-4 py-2">
          <div className="">
            <PiDeviceMobile className="text-xl text-white" />
          </div>
          <Paragraph className="text-white">
            Clicks from mobile devices
          </Paragraph>
          <Paragraph className="justify-self-end text-white dark:text-white">
            {mobilePercentage}%
          </Paragraph>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeviceTypeDistributionChart;
