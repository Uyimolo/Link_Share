"use client";
import React, { useState } from "react";
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
import {
  getFillColor,
  getGridStrokeColor,
} from "@/utilities/analyticsChartsColors";
import Button from "@/components/Button";

const ClickTrendsChart = ({
  clickTrendData,
  dailyClickTrendData,
}: {
  clickTrendData?: ClickTrendData[];
  dailyClickTrendData?: ClickTrendData[] | null;
}) => {
  const [isMonthlyData, setIsMonthlyData] = useState(false);
  const { theme } = useThemeContext();

  const monthlyData = clickTrendData
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

  const dailyData = dailyClickTrendData
    ? dailyClickTrendData
    : [
        { year: 2024, month: "April", day: 3, count: 20 },
        {
          year: 2024,
          month: "April",
          day: 4,
          count: 25,
        },
        {
          year: 2024,
          month: "April",
          day: 12,
          count: 25,
        },
        {
          year: 2024,
          month: "December",
          day: 12,
          count: 25,
        },
      ];

  const monthlyTrendData = monthlyData.map((item) => ({
    ...item,
    month: `${item.month} ${item.year}`, // Combine month and year for X-axis labeling
  }));

  const dailyTrendData = dailyData?.map((item) => ({
    ...item,
    day: `${item.day} ${item.month} ${item.year}`, // Combine day and month for X-axis labeling
  }));


  // Utility to determine grid stroke color

  return (
    <Card className="w-full rounded-xl border-none dark:bg-lighterNavy">
      <CardHeader className="grid w-full grid-cols-1 items-start justify-between px-4 py-3 sm:grid-cols-2">
        <Heading
          variant="h2"
          className="relative text-base font-semibold sm:text-xl md:text-xl xl:text-xl"
        >
          {isMonthlyData ? "Monthly" : "Daily"} Click Trends
        </Heading>

        <div className="flex w-full items-center justify-end gap-2 justify-self-end sm:w-fit">
          <Button
            className="w-fit px-3 py-2"
            onClick={() => setIsMonthlyData(true)}
          >
            Monthly
          </Button>
          <Button
            variant="secondary"
            className="w-fit px-3 py-2"
            onClick={() => setIsMonthlyData(false)}
          >
            Daily
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-0 dark:text-white text-sm">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            className="dark:text-white"
            data={isMonthlyData ? monthlyTrendData : dailyTrendData}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={getGridStrokeColor(theme)} // Use the utility function
            />
            <XAxis
              tick={{ fill: getFillColor(theme), fontSize: 12 }}
              dataKey={isMonthlyData ? "month" : "day"}
              label={{
                value: "Links",
                position: "insideBottom",
                offset: -10,
                fill: getFillColor(theme),
                
              }}
            />
            <YAxis
              tick={{ fill: getFillColor(theme), fontSize: 12 }}
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
