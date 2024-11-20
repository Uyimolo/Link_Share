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
  LinkType,
  LinkWithAnalytics,
} from "@/types/types";
import { options } from "@/data/options";
import { useLinkContext } from "@/context/LinkContext";

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

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<
    AnalyticsData[] | null | undefined
  >(null);
  const [uniqueViews, setUniqueViews] = useState<number>(0);
  const [clickTrendData, setClickTrendData] = useState<
    ClickTrendData[] | undefined
  >();
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
  const { links, loading: linksLoading } = useLinkContext();
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

  // CALCULATE AND GENERATE CLICK TREND DATA
  useEffect(() => {
    if (analyticsData) {
      const aggregateClicksByMonth = (
        analyticsData: AnalyticsData[] | null,
      ) => {
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
        const aggregatedData: { [key: string]: ClickTrendData } = {};

        analyticsData?.forEach((data) => {
          data.clickTrends.forEach((click) => {
            const clickDate = new Date(click.seconds * 1000);
            const year = clickDate.getUTCFullYear();
            const month = monthNames[clickDate.getUTCMonth()];

            const key = `${year}-${month}`;

            if (!aggregatedData[key]) {
              aggregatedData[key] = { year, month, count: 0 };
            }
            aggregatedData[key].count += 1;
          });
        });

        const data = Object.values(aggregatedData);

        const totalClicks = analyticsData?.reduce(
          (total, item) => total + item.clickCount,
          0,
        );

        setTotalClicks(totalClicks);
        setClickTrendData(data);
      };

      aggregateClicksByMonth(analyticsData);
    }
  }, [analyticsData]);

  // CALCULATE AND GENERATE CLICK TRENDS FOR INDIVIDUAL LINKS
  // CALCULATE AND STORE CLICK TRENDS FOR INDIVIDUAL LINKS
  useEffect(() => {
    if (analyticsData) {
      // Create a map to store click trends per link
      const trendsPerLink = new Map<string, ClickTrendData[]>();

      // Iterate over each analytics entry
      analyticsData.forEach((data) => {
        const linkId = data.id;
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

        // Aggregate clicks by month and year
        const aggregatedData: { [key: string]: ClickTrendData } = {};
        data.clickTrends.forEach((click) => {
          const clickDate = new Date(click.seconds * 1000);
          const year = clickDate.getUTCFullYear();
          const month = monthNames[clickDate.getUTCMonth()];

          const key = `${year}-${month}`;

          if (!aggregatedData[key]) {
            aggregatedData[key] = { year, month, count: 0 };
          }
          aggregatedData[key].count += 1;
        });

        // Store the aggregated data for the current link
        trendsPerLink.set(linkId, Object.values(aggregatedData));
      });

      // Convert the map to an array of objects (if needed)
      const clickTrendsPerLink = Array.from(trendsPerLink.entries()).map(
        ([linkId, trends]) => ({
          linkId,
          trends,
        }),
      );

      setLinksWithAnalytics((prevLinks) =>
        prevLinks.map((link) => ({
          ...link,
          clickTrendsChartData: trendsPerLink.get(link.id) || [],
        })),
      );
    }
  }, [analyticsData]);

  // CALCULATE AND GENERATE TOP FIVE LINKS BY CLICKS
  useEffect(() => {
    // Map analytics by link ID for quick access
    const analyticsMap = new Map(analyticsData?.map((data) => [data.id, data]));

    // Create a new array with links that have analytics data
    const linksWithAnalytics = links
      ?.map((link) => {
        const analyticsData = analyticsMap.get(link.id);
        return analyticsData
          ? {
              ...link, // Link details
              clickCount: analyticsData.clickCount, // Click count from analytics
            }
          : null; // Exclude links without analytics
      })
      .filter((item) => item !== null); // Remove null values

    // Sort the array by click count in descending order
    const sortedLinks = linksWithAnalytics?.sort(
      (a, b) => b.clickCount - a.clickCount,
    );

    // Return only the top 5 most clicked links
    setTopFiveLinks(sortedLinks?.slice(0, 5));
  }, [analyticsData]);

  // MERGE LINKS ARRAY WITH ANALYTICS DATA
  useEffect(() => {
    const linksWithAnalytics = links?.map((link) => {
      const relatedAnalyticsData = analyticsData?.find(
        (data) => data.id === link.id,
      );
      const relatedOptions = options.find(
        (option) => option.value === link.title,
      );

      const trendsPerLink = new Map<string, ClickTrendData[]>();

      // Iterate over each analytics entry
      analyticsData?.forEach((data) => {
        const linkId = data.id;
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

        // Aggregate clicks by month and year
        const aggregatedData: { [key: string]: ClickTrendData } = {};
        data.clickTrends.forEach((click) => {
          const clickDate = new Date(click.seconds * 1000);
          const year = clickDate.getUTCFullYear();
          const month = monthNames[clickDate.getUTCMonth()];

          const key = `${year}-${month}`;

          if (!aggregatedData[key]) {
            aggregatedData[key] = { year, month, count: 0 };
          }
          aggregatedData[key].count += 1;
        });

        // Store the aggregated data for the current link
        trendsPerLink.set(linkId, Object.values(aggregatedData));
      });

      // Convert the map to an array of objects (if needed)
      const clickTrendsPerLink = Array.from(trendsPerLink.entries()).map(
        ([linkId, trends]) => ({
          linkId,
          trends,
        }),
      );

      const countryCountArray = relatedAnalyticsData
        ? Object.entries(relatedAnalyticsData?.clickLocations).map(
            ([countryCode, clicks]) => ({ countryCode, clicks }),
          )
        : [];

      return {
        id: link.id,
        url: link.url,
        title: link.title,
        icon: relatedOptions?.icon,
        color: relatedOptions?.color ?? "",
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
      };
    });

    // Set the state or perform any further actions with linksWithAnalytics here
    if (linksWithAnalytics) setLinksWithAnalytics(linksWithAnalytics);
  }, [links, analyticsData, options]);

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
