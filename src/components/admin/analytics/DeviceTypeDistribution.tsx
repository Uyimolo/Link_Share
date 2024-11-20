import Heading from "@/components/text/Heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import cn from "@/utilities/cn";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DeviceTypeDistributionChart = ({
  deviceData,
  className,
}: {
  className?: string;
  deviceData: {
    name: string;
    value: number;
  }[];
}) => {
  return (
    <Card className={cn("rounded-xl border-none bg-white", className)}>
      <CardHeader>
        <Heading
          variant="h2"
          className="text-xl font-semibold md:text-xl xl:text-xl"
        >
          Device Type Distribution
        </Heading>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={deviceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
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
    </Card>
  );
};

export default DeviceTypeDistributionChart;
