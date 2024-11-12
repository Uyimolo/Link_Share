import { useAnalytics } from "@/custom-hooks/useAnalytics";
import ClickTrendsChart from "./ClickTrendsChart";
import TopLinksByClicksChart from "./TopLinksByClicksChart";
// import DeviceTypeDistributionChart from "./DeviceTypeDistribution";
import OverviewSection from "./OverviewSection";
import TopClicksByCountries from "./TopClicksByCountries";
import Loading from "@/components/Loading";

const AnalyticsTab = () => {
  const {
    clickTrendData,
    topFiveLinks,
    mobile,
    desktop,
    totalClicks,
    uniqueViews,
    linksLength,
    // deviceData,
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ClickTrendsChart clickTrendData={clickTrendData} />
        <TopLinksByClicksChart topLinks={topFiveLinks} />
        {/* <DeviceTypeDistributionChart
          deviceData={deviceData}
          className="hidden xl:block"
        /> */}
        <TopClicksByCountries countriesInfo={countriesInfo} />
      </div>
    </div>
  );
};

export default AnalyticsTab;
