"use client";
import React from "react";
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
const ClickTrendsChart = ({
  clickTrendData,
}: {
  clickTrendData?: {
    month: string;
    year: number;
    count: number;
  }[];
}) => {
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

  return (
    <Card className="w-full border-none rounded-xl">
      <CardHeader>
        <Heading variant="h2" className="text-xl md:text-xl font-semibold xl:text-xl">
          Monthly Click Trends
        </Heading>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={trendData}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{
                value: "Links",
                position: "insideBottom",
                offset: -10,
                fill: "#6B7280",
              }}
            />
            <YAxis
              label={{
                value: "Clicks",
                angle: -90,
                position: "insideLeft",
                fill: "#6B7280",
              }}
            />
            <Tooltip />
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
