"use client";
import { useEffect, useState } from "react";
import {
  deleteAnalyticsData,
  getAnalyticsData,
} from "@/services/firestoreService";
import { useAuthContext } from "@/context/AuthContext";
import {
  AnalyticsData,
  ClickTrendData,
  DeviceData,
  LinkWithAnalytics,
} from "@/types/types";
import { thumbnailIcons } from "@/data/thumbnailIcons";
import { useLinkContext } from "@/context/LinkContext";
import { format, fromUnixTime } from "date-fns";

type TopFiveLinks = {
  clickCount: number;
  id: string;
  url: string;
  title: string;
}[];

type CountryInfo = {
  countryCode: string;
  clicks: number;
}[];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<
    AnalyticsData[] | null | undefined
  >(null);
  const [uniqueViews, setUniqueViews] = useState<number>(0);
  const [clickTrendData, setClickTrendData] = useState<
    ClickTrendData[] | undefined
  >();

  const [dailyClickTrendData, setDailyClickTrendData] = useState<
    ClickTrendData[] | null
  >(null);
  const [topFiveLinks, setTopFiveLinks] = useState<TopFiveLinks>();
  const [deviceData, setDeviceData] = useState<DeviceData>([
    { name: "", value: 0 },
  ]);
  const [totalClicks, setTotalClicks] = useState<number>();
  const [countriesInfo, setCountriesInfo] = useState<CountryInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [linksWithAnalytics, setLinksWithAnalytics] = useState<
    LinkWithAnalytics[]
  >([]);

  const { user } = useAuthContext();
  const { links } = useLinkContext();
  const linksLength = links?.length;

  const mobile = deviceData.find((data) => data.name === "mobile")?.value;
  const desktop = deviceData.find((data) => data.name === "desktop")?.value;

  // GET ANALYTICS DATA IN REAL TIME
  useEffect(() => {
    if (user && links) {
      const unsubscribe = getAnalyticsData(user.uid, (fetchedData) => {
        const validAnalyticsData = fetchedData?.filter((analytics) =>
          links?.some((link) => link.id === analytics.id),
        );

        const invalidAnalyticsData = fetchedData?.filter(
          (analytics) => !links?.some((link) => link.id === analytics.id),
        );

        // DELETE INVALID ANALYTICS DATA
        if (
          invalidAnalyticsData &&
          invalidAnalyticsData.length > 0 &&
          links &&
          analyticsData
        ) {
          invalidAnalyticsData?.forEach((analytics) => {
            console.log(analytics);
            deleteAnalyticsData(user.uid, analytics.id);
          });
        }

        setAnalyticsData(validAnalyticsData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [links, user]);

  useEffect(() => {
    if (analyticsData) {
      const aggregateClicks = (analyticsData: AnalyticsData[] | null) => {
        const aggregatedMonthData: { [key: string]: ClickTrendData } = {};
        const aggregatedDayData: { [key: string]: ClickTrendData } = {};

        analyticsData?.forEach((data) => {
          data.clickTrends.forEach((click) => {
            // Convert Unix timestamp to Date object
            const clickDate = fromUnixTime(click.seconds);

            // Use date-fns to format and extract date components
            const year = Number(format(clickDate, "yyyy"));
            const month = format(clickDate, "MMMM");
            const day = Number(format(clickDate, "d"));

            const monthKey = `${year}-${month}`;
            const dayKey = `${year}-${month}-${day}`;

            if (!aggregatedMonthData[monthKey]) {
              aggregatedMonthData[monthKey] = { year, month, count: 0 };
            }
            aggregatedMonthData[monthKey].count += 1;

            if (!aggregatedDayData[dayKey]) {
              aggregatedDayData[dayKey] = { year, month, day, count: 0 };
            }
            aggregatedDayData[dayKey].count += 1;
          });
        });

        const monthData = Object.values(aggregatedMonthData);
        const dayData = Object.values(aggregatedDayData);

        const totalClicks = analyticsData?.reduce(
          (total, item) => total + item.clickCount,
          0,
        );

        setTotalClicks(totalClicks);
        setClickTrendData(monthData);
        setDailyClickTrendData(dayData);
      };

      aggregateClicks(analyticsData);
    }
  }, [analyticsData]);

  // CREATE ARRAY OF LINKS WHERE EACH LINK HAS SOCIAL OPTIONS DATA AND ANALYTICAL DATA INCLUDED
  useEffect(() => {
    const linksWithAnalytics = links?.map((link) => {
      // get the analytics data that relates to the the current link being iterated over
      const relatedAnalyticsData = analyticsData?.find(
        (data) => data.id === link.id,
      );
      // get the options (social media platforms) associated with the current link being iterated over
      const relatedOptions = thumbnailIcons.find(
        (icon) =>
          icon.name.toLowerCase() === link.title.toLowerCase() ||
          link.url.includes(icon.name.toLowerCase()),
      );

      const trendsPerLink = new Map<string, ClickTrendData[]>();
      const dailyTrendsPerLink = new Map<string, ClickTrendData[]>();

      // Iterate over each analytics entry
      analyticsData?.forEach((data) => {
        const linkId = data.id;

        // Aggregate clicks by day, month and year
        const aggregatedData: { [key: string]: ClickTrendData } = {};
        const aggregatedDayData: { [key: string]: ClickTrendData } = {};
        data.clickTrends.forEach((click) => {
          // Convert Unix timestamp to Date object
          const clickDate = fromUnixTime(click.seconds);

          // Use date-fns to format and extract date components
          const year = Number(format(clickDate, "yyyy"));
          const month = format(clickDate, "MMMM");
          const day = Number(format(clickDate, "d"));

          const monthKey = `${year}-${month}`;
          const dayKey = `${year}-${month}-${day}`;

          if (!aggregatedData[monthKey]) {
            aggregatedData[monthKey] = { year, month, count: 0 };
          }
          aggregatedData[monthKey].count += 1;

          if (!aggregatedDayData[dayKey]) {
            aggregatedDayData[dayKey] = { year, month, day, count: 0 };
          }
          aggregatedDayData[dayKey].count += 1;
        });

        // Store the aggregated data for the current link
        trendsPerLink.set(linkId, Object.values(aggregatedData));
        dailyTrendsPerLink.set(linkId, Object.values(aggregatedDayData));
      });

      const countryCountArray = relatedAnalyticsData
        ? Object.entries(relatedAnalyticsData?.clickLocations).map(
            ([countryCode, clicks]) => ({ countryCode, clicks }),
          )
        : [];

      const linkIcon = thumbnailIcons.find(
        (thumbnail) => thumbnail.name === link.icon,
      )?.icon;

      return {
        id: link.id,
        url: link.url,
        title: link.title,
        icon: linkIcon || relatedOptions?.icon,
        clickCount: relatedAnalyticsData?.clickCount ?? 0,
        clickTrends: relatedAnalyticsData?.clickTrends ?? [],
        deviceType: relatedAnalyticsData?.deviceType ?? {},
        uniqueVisitors: relatedAnalyticsData?.uniqueVisitors ?? [],
        clickLocations: countryCountArray,
        lastClickDate: relatedAnalyticsData
          ? new Date(
              relatedAnalyticsData?.lastClickDate?.seconds * 1000,
            ).toLocaleDateString()
          : "",
        clickTrendsChartData: trendsPerLink.get(link.id) || [],
        dailyClickTrendsChartData: dailyTrendsPerLink.get(link.id) || [],
      };
    });

    if (linksWithAnalytics) {
      setLinksWithAnalytics((prev) => linksWithAnalytics || prev);
    }
  }, [links, analyticsData]);

  // CALCULATE AND GENERATE TOP FIVE LINKS BY CLICKS
  useEffect(() => {
    // Map analytics by link ID for quick access
    const analyticsMap = new Map(analyticsData?.map((data) => [data.id, data]));

    // Create a new array with links that have analytics data
    const linksWithAnalytics = links
      ?.map((link) => {
        const analyticsData = analyticsMap.get(link.id);
        // if link exists return object containing links info and analytics data
        // else return null
        return analyticsData
          ? {
              ...link, // Link details
              clickCount: analyticsData.clickCount, // Click count from analytics
            }
          : null; // Exclude links without analytics
      })
      .filter((item) => item !== null); // Remove null values (returning only the valid objects)

    // Sort the array by click count in descending order
    const sortedLinks = linksWithAnalytics?.sort(
      (a, b) => b.clickCount - a.clickCount,
    );

    // Return only the top 5 most clicked links
    setTopFiveLinks(sortedLinks?.slice(0, 5));
  }, [analyticsData]);

  // CALCULATE AND GENERATE DEVICE DATA
  useEffect(() => {
    const deviceTypeCounts: { [key: string]: number } =
      analyticsData?.reduce(
        (acc, data) => {
          for (const [deviceType, count] of Object.entries(data.deviceType)) {
            acc[deviceType] = (acc[deviceType] || 0) + count;
          }
          return acc;
        },
        {} as { [key: string]: number },
      ) ?? {}; // Fallback to an empty object if analyticsData is null or undefined

    // Prepare data for PieChart
    const deviceData = Object.entries(deviceTypeCounts).map(
      ([deviceType, count]) => ({
        name: deviceType,
        value: count,
      }),
    );

    setDeviceData(deviceData);
  }, [analyticsData]);

  // CALCULATE THE UNIQUE VISITORS TO SHARED USER PROFILE
  useEffect(() => {
    if (analyticsData) {
      const uniqueVisitors = new Set<string>();

      analyticsData.forEach((data) => {
        data.uniqueVisitors.forEach((view) => {
          uniqueVisitors.add(view);
        });
      });

      // Set the unique views count to the size of the unique IP set
      setUniqueViews(uniqueVisitors.size);
    }
  }, [analyticsData]);

  // CALCULATE CLICKS PER COUNTRY
  useEffect(() => {
    if (analyticsData) {
      const clicksByCountry: { [key: string]: number } = analyticsData.reduce(
        (acc, data) => {
          for (const [country, count] of Object.entries(data.clickLocations)) {
            acc[country] = (acc[country] || 0) + count;
          }
          return acc;
        },
        {} as { [key: string]: number },
      );

      // Convert clicksByCountry object to array of objects with countryCode and clicks properties
      const countryClicksArray = Object.entries(clicksByCountry).map(
        ([countryCode, clicks]) => ({ countryCode, clicks }),
      );

      setCountriesInfo(countryClicksArray);
    }
  }, [analyticsData]);

  return {
    analyticsData,
    clickTrendData,
    dailyClickTrendData,
    topFiveLinks,
    totalClicks,
    mobile,
    desktop,
    uniqueViews,
    linksLength,
    deviceData,
    countriesInfo,
    loading,
    linksWithAnalytics,
  };
};
