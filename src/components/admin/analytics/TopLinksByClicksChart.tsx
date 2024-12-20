import Heading from "@/components/text/Heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useThemeContext } from "@/context/ThemeContext";
import { getFillColor } from "@/utilities/analyticsChartsColors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TopLinksByClicksChart = ({
  topLinks,
}: {
  topLinks:
    | {
        clickCount: number;
        id: string;
        url: string;
        title: string;
      }[]
    | undefined;
}) => {
  const { theme } = useThemeContext();

  return (
    <Card className="rounded-xl space-y-0 border-none bg-white dark:bg-lighterNavy">
      <CardHeader className="px-4 py-3">
        <Heading
          variant="h2"
          className="text-base font-semibold sm:text-xl md:text-xl xl:text-xl"
        >
          Top 5 Links by Clicks
        </Heading>
      </CardHeader>

      <CardContent className="px-4 pt-0 py-2 text-sm">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            className="hover:bg-transparent"
            data={topLinks}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="title"
              tick={{ fill: getFillColor(theme), fontSize: 12 }}
              label={{
                value: "Links",
                position: "insideBottom",
                offset: -10,
                fill: getFillColor(theme),
                fontSize: 14,
              }}
            />
            <YAxis
              tick={{ fill: getFillColor(theme), fontSize: 12 }}
              label={{
                value: "Click Count",
                angle: -90,
                position: "insideLeft",
                fill: getFillColor(theme),
                fontSize: 14,
              }}
            />
            <Tooltip
              formatter={(value) => `${value} clicks`}
              labelClassName="dark:text-black"
            />
            <Bar
              dataKey="clickCount"
              fill="#3B82F6"
              radius={[5, 5, 0, 0]}
              barSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopLinksByClicksChart;
