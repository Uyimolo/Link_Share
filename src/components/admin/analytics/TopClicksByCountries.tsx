import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import { Card } from "@/components/ui/card";
import cn from "@/utilities/cn";
import Image from "next/image";

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
    <Card className="space-y-4 rounded-xl bg-white border-none px-4 py-2 dark:bg-lighterNavy">
      <Heading
        variant="h2"
        className="text-base font-semibold sm:text-xl md:text-xl xl:text-xl"
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
                "flex items-center justify-between gap-2 py-4",
                index !== countriesInfo.length - 1 &&
                  "border-b border-lighterGray",
              )}
            >
              <div className="flex items-center gap-2">
                <Paragraph className="w-4">{index + 1}</Paragraph>
                <Image
                  alt="country"
                  width={32}
                  height={16}
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.countryCode}.svg`}
                  className="w-8 rounded-full shadow shadow-black/50"
                />
                <Paragraph>{displayNames.of(country.countryCode)}</Paragraph>
              </div>

              <Paragraph className="w-[30%] max-w-[100px]">
                Clicks: {country.clicks}
              </Paragraph>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default TopClicksByCountries;
