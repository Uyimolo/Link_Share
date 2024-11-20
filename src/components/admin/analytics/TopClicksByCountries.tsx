import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import cn from "@/utilities/cn";

const TopClicksByCountries = ({
  countriesInfo,
}: {
  countriesInfo:
    | {
        countryCode: string;
        clicks: number;
      }[]
    | undefined;
}) => {
  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

  return (
    <div className="space-y-6 rounded-xl bg-white p-4">
      <Heading
        variant="h2"
        className="text-xl font-semibold md:text-xl xl:text-xl"
      >
        Countries by clicks
      </Heading>
      <div className="">
        {countriesInfo
          ?.sort((a, b) => b.clicks - a.clicks)
          .map((country, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between gap-2 py-4 hover:bg-veryLightBlue",
                index !== countriesInfo.length - 1 &&
                  "border-b border-lighterGray",
              )}
            >
              <div className="flex items-center gap-2">
                <Paragraph className="w-4">{index + 1}</Paragraph>
                <img
                  alt="country"
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.countryCode}.svg`}
                  className="w-8 rounded-full shadow shadow-black/50"
                />
                <Paragraph>{displayNames.of(country.countryCode)}</Paragraph>
              </div>

              <Paragraph className="w-[30%] max-w-[100px]">Clicks: {country.clicks}</Paragraph>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopClicksByCountries;
