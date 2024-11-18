'use client'
import LinksTable from "@/components/admin/analytics/analytics-table/LinksTable";
import ClickTrendsChart from "@/components/admin/analytics/ClickTrendsChart";
import DeviceTypeDistributionChart from "@/components/admin/analytics/DeviceTypeDistribution";
import OverviewSection from "@/components/admin/analytics/OverviewSection";
import TopClicksByCountries from "@/components/admin/analytics/TopClicksByCountries";
import TopLinksByClicksChart from "@/components/admin/analytics/TopLinksByClicksChart";
import Loading from "@/components/Loading";
import { useAnalytics } from "@/custom-hooks/useAnalytics";


const AnalyticsTab = () => {
  const {
    clickTrendData,
    topFiveLinks,
    mobile,
    desktop,
    totalClicks,
    uniqueViews,
    linksLength,
    deviceData,
    loading,
    countriesInfo,
  } = useAnalytics();

  if (loading) {
    return (
      <div className="grid h-screen w-full place-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-40">
      <OverviewSection
        uniqueImpressions={uniqueViews}
        mobile={mobile}
        desktop={desktop}
        totalClicks={totalClicks}
        numberOfLinks={linksLength}
      />

      <ClickTrendsChart clickTrendData={clickTrendData} />

      <div className="grid gap-4 md:grid-cols-[60%,1fr] xl:grid-cols-[40%,25%,1fr]">
        <TopLinksByClicksChart topLinks={topFiveLinks} />

        <TopClicksByCountries countriesInfo={countriesInfo} />
        <DeviceTypeDistributionChart
          deviceData={deviceData}
          className="hidden xl:block"
        />
      </div>

      <LinksTable />
    </div>
  );
};

export default AnalyticsTab;
