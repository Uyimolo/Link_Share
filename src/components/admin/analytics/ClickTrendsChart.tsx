"use client";
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Heading from "@/components/text/Heading";
import { ClickTrendData } from "@/types/types";
import { useThemeContext } from "@/context/ThemeContext";
import { getFillColor, getGridStrokeColor } from "@/utilities/analyticsChartsColors";



const ClickTrendsChart = ({
  clickTrendData,
}: {
  clickTrendData?: ClickTrendData[];
}) => {
  const { theme } = useThemeContext();
  useEffect(() => console.log(theme), [theme]);
  console.log(theme);
  const data = clickTrendData
    ? clickTrendData
    : [
        { year: 2024, month: "November", count: 25 },
        { year: 2024, month: "December", count: 15 },
        { year: 2025, month: "January", count: 20 },
        { year: 2025, month: "February", count: 10 },
        { year: 2025, month: "March", count: 30 },
        { year: 2025, month: "April", count: 25 },
        { year: 2025, month: "May", count: 20 },
      ];

  const trendData = data.map((item) => ({
    ...item,
    month: `${item.month} ${item.year}`, // Combine month and year for X-axis labeling
  }));

  // Utility to determine grid stroke color
 

  return (
    <Card className="w-full rounded-xl border-none dark:bg-darkGray">
      <CardHeader>
        <Heading
          variant="h2"
          className="text-xl font-semibold md:text-xl xl:text-xl"
        >
          Monthly Click Trends
        </Heading>
      </CardHeader>
      <CardContent className="dark:text-white">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            className="dark:text-white"
            data={trendData}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={getGridStrokeColor(theme)} // Use the utility function
            />
            <XAxis
              tick={{ fill: getFillColor(theme), fontSize: 14 }}
              dataKey="month"
              label={{
                value: "Links",
                position: "insideBottom",
                offset: -10,
                fill: getFillColor(theme),
              }}
            />
            <YAxis
              tick={{ fill: getFillColor(theme), fontSize: 14 }}
              label={{
                value: "Clicks",
                angle: -90,
                position: "insideLeft",
                fill: getFillColor(theme),
              }}
            />

            <Tooltip labelClassName="dark:text-black" />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClickTrendsChart;
