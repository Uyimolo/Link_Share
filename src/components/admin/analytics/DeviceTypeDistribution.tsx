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
        "dark:bg-lighterNavy rounded-xl border-none bg-white py-0 pb-0",
        className,
      )}
    >
      <CardHeader className="pt-2">
        <Heading
          variant="h2"
          className="text-base font-semibold sm:text-xl md:text-xl xl:text-xl"
        >
          Device Type Distribution
        </Heading>
      </CardHeader>

      <CardContent className="">
        <ResponsiveContainer width="100%" height={170}>
          <PieChart>
            <Pie
              data={deviceData}
              dataKey={"value"}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              fill="#4B5563" // Default fill for the pie slices
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

      <CardFooter className="flex-co space-y- w-full justify-center gap-4 px-4 pb-4 pt-0">
        <div className="flex gap-4 rounded-lg bg-[#3B82F6] p-2">
          <div className="">
            <CgLaptop className="text-xl text-white" />
          </div>
          <Paragraph className="text-white">Desktop</Paragraph>
          <Paragraph className="justify-self-end text-white dark:text-white">
            {desktopPercentage}%
          </Paragraph>
        </div>

        <div className="flex gap-4 rounded-lg bg-[#10B981] px-4 py-2">
          <div className="">
            <PiDeviceMobile className="text-xl text-white" />
          </div>
          <Paragraph className="text-white">Mobile</Paragraph>
          <Paragraph className="justify-self-end text-white dark:text-white">
            {mobilePercentage}%
          </Paragraph>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeviceTypeDistributionChart;
