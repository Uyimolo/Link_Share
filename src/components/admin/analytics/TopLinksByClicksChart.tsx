import Heading from "@/components/text/Heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  return (
    <Card className="rounded-xl border-none bg-white">
      <CardHeader>
        <Heading
          variant="h2"
          className="text-xl font-semibold md:text-xl xl:text-xl"
        >
          Top 5 Links by Clicks
        </Heading>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topLinks}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="title"
              tick={{ fill: "#6B7280" }} // ShadCN neutral color
              label={{
                value: "Links",
                position: "insideBottom",
                offset: -10,
                fill: "#6B7280",
              }}
            />
            <YAxis
              tick={{ fill: "#6B7280" }}
              label={{
                value: "Click Count",
                angle: -90,
                position: "insideLeft",
                fill: "#6B7280",
              }}
            />
            <Tooltip formatter={(value) => `${value} clicks`} />
            <Bar
              dataKey="clickCount"
              fill="#633CFF" // Neutral color from ShadCN for bars
              radius={[5, 5, 0, 0]}
              barSize={80}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopLinksByClicksChart;
