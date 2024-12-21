"use client";
import Button from "@/components/Button";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import Image from "next/image";
import { useRouter } from "next/navigation";
import manageLinks from "@/assets/svgs/undraw_social_media_re_sulg.svg";
import Footer from "@/components/footer/Footer";
import Reveal from "@/components/animation/Reveal";
import { FaLink, FaPaintRoller } from "react-icons/fa6";
import { SiFsecure } from "react-icons/si";
import Logo from "@/components/brand/Logo";
import FAQSection from "@/components/home/FAQSection";
import BentoGrid from "@/components/home/BentoGrid";
import desktop from "@/assets/images/analyticsPage.png";
import { useAuthContext } from "@/context/AuthContext";
import ThemeSelector from "@/components/ThemeSelector";

const Home = () => {
  console.log("testing debug console");
  // useProtectedRoute(false);
  const router = useRouter();
  const { user, loading } = useAuthContext();

  const whyChooseUs = [
    {
      icon: FaLink,
      title: "Quick Links Management",
      description:
        "Easily add, reorder, and preview links in real-time. Spend less time managing, more time sharing.",
      background: "bg-gradient-to-br from-blue to-deep-blue",
      hoverEffect: "hover:scale-105 hover:shadow-2xl hover:rotate-3",
    },
    {
      icon: FaPaintRoller,
      title: "Customizable Themes",
      description:
        "Personalize your profile with themes and branding options. Let your profile reflect your style.",
      background: "bg-gradient-to-br from-purple-500 to-purple-700",
      hoverEffect: "hover:scale-105 hover:shadow-2xl hover:-rotate-3",
    },
    {
      icon: SiFsecure,
      title: "Secure & Reliable",
      description:
        "Built with industry-standard security to ensure your data is safe and accessible at all times.",
      background: "bg-gradient-to-br from-green-500 to-green-700",
      hoverEffect: "hover:scale-105 hover:shadow-2xl hover:rotate-6",
    },
  ];


  const paragraphStyle =
    "w-fit sm:text-base max-w-xl lg:max-w-none md:text-2xl xl:text-xl";

  const handleUserRedirection = () => {
    if (loading) {
      return;
    }
    if (!user) {
      router.push("/login");
    } else {
      router.push("/admin");
    }
  };

  const buttonMessage = () => {
    if (loading) {
      return "Loading...";
    }
    if (!user) {
      return "Get started for free";
    }
    return "Continue last session";
  };

  return (
    <>
      <div className="relative w-full">
        <Reveal
          variants="fade in"
          className="sticky top-4 z-10 mx-auto flex w-[calc(100vw-4rem)] items-center justify-between rounded-full bg-blue/80 px-4 py-6 shadow-lg backdrop-blur dark:bg-lighterNavy md:w-[calc(100vw-96px)] lg:w-[90vw]"
          once={false}
        >
          <Logo showFullLogo variant="white" className="hidden md:flex" />
          <Logo variant="white" className="md:hidden" />
          <ThemeSelector />
        </Reveal>
        {/* First Section */}
        <div className="grid min-h-screen pb-20 pt-4">
          <div className="grid w-full gap-16 border px-4 py-20 md:items-center md:px-12 md:py-32 lg:grid-cols-2 lg:px-[5vw]">
            <Reveal
              className="space-y-6 md:space-y-8"
              once={false}
              variants="fade in"
            >
              <Reveal variants="slide up" once={false}>
                <Heading variant="h1" className="mx-auto text-5xl md:text-6xl 2xl:text-7xl">
                  <span className="text-blue">Share</span> your story with a
                  single <span className="text-blue">link</span>
                </Heading>
              </Reveal>

              <Reveal variants="fade in" once={false}>
                <Paragraph className="max-w-2xl text-2xl font-light 2xl:text-3xl">
                  Simplify your digital presence by managing and sharing all
                  your important links in one place.
                </Paragraph>
              </Reveal>

              <Reveal
                once={false}
                variants="scale up"
                className="gap-4 pt-6 md:flex lg:mx-auto lg:pt-0"
              >
                <Button
                  variant="secondary"
                  loading={loading}
                  className="w-fit rounded-full py-5 2xl:text-lg"
                  onClick={handleUserRedirection}
                >
                  {buttonMessage()}
                </Button>
              </Reveal>
            </Reveal>

            <div className="overflow-hidden">
              <BentoGrid />
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid space-y-6 px-4 py-12 pb-20 md:min-h-screen md:max-h-[1000px] md:px-12 md:py-16 lg:items-center lg:space-y-12 lg:px-[5vw]">
          <Reveal
            variants="slide up"
            once={false}
            className={`grid w-full max-w-2xl gap-6 space-y-6 md:px-6 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-10`}
          >
            <div className="space-y-6 md:space-y-10 lg:order-2">
              <Reveal variants="slide right" once={false}>
                <Heading
                  variant="h2"
                  className="max-w-2xl text-4xl md:text-6xl"
                >
                  <span className="text-blue">Manage</span> links with unmatched{" "}
                  <span className="text-blue">simplicity</span>
                </Heading>
              </Reveal>

              <Reveal variants="fade in" once={false}>
                <Paragraph className={paragraphStyle}>
                  {`Quickly add links to showcase your work, social profiles, or
                resources. Easily reorder with drag-and-drop, preview changes
                live, and save multiple updates with one click. Manage
                everything seamlessly from any device.`}
                </Paragraph>
              </Reveal>

              <Reveal
                once={false}
                variants="scale up"
                className="gap-4 pt-6 md:flex lg:mx-auto lg:pt-0"
              >
                <Button
                  variant="secondary"
                  loading={loading}
                  className="w-fit rounded-full py-5 2xl:text-lg"
                  onClick={handleUserRedirection}
                >
                  {buttonMessage()}
                </Button>
              </Reveal>
            </div>

            <Reveal
              variants="scale up"
              once={false}
              className="mx-auto h-fit max-w-2xl lg:max-w-none"
            >
              <Image
                alt="Mockup of preview page"
                src={manageLinks}
                className="mt-16 md:mt-0"
              />
            </Reveal>
          </Reveal>
        </div>

        {/* Third Section */}
        <div className="grid px-4 py-12 pb-20 md:min-h-screen md:px-12 md:py-16 lg:items-center lg:px-[5vw]">
          <Reveal
            variants="fade in"
            once={false}
            className={`grid w-full gap-10 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-10 lg:space-y-0`}
          >
            <div className="space-y-6 md:space-y-10">
              <Reveal variants="slide right" once={false}>
                <Heading
                  variant="h2"
                  className="max-w-2xl text-4xl md:text-6xl"
                >
                  <span className="text-blue">Track, analyze,</span> and
                  optimize your link{" "}
                  <span className="text-blue">performance</span>
                </Heading>
              </Reveal>

              <Reveal variants="fade in" once={false}>
                <Paragraph className={paragraphStyle}>
                  {`Grow with clear, actionable insights from our analytics. Track profile visits, monitor link clicks, and see real-time updates to understand what content resonates. With easy-to-read metrics, refine your strategy and connect better with your audience.`}
                </Paragraph>
              </Reveal>

              <Reveal
                once={false}
                variants="scale up"
                className="gap-4 pt-6 md:flex lg:mx-auto lg:pt-0"
              >
                <Button
                  variant="secondary"
                  loading={loading}
                  className="w-fit rounded-full py-5 2xl:text-lg"
                  onClick={handleUserRedirection}
                >
                  {buttonMessage()}
                </Button>
              </Reveal>
            </div>

            <Reveal variants="scale up" className="mx-auto w-full">
              <div className="relative mx-auto w-[90%] overflow-hidden rounded-lg border-[5px] border-black dark:border-lighterGray">
                <Image
                  alt="Mockup of analytics page"
                  src={desktop}
                  className=""
                />
              </div>

              <div className="h-3 w-full rounded-b-xl bg-black shadow-xl shadow-black dark:bg-lighterGray"></div>
              <div className="mx-auto flex h-[2px] w-4/5 justify-between">
                <div className="h-full w-6 bg-black/50 dark:bg-lighterGray"></div>
                <div className="h-full w-6 bg-black/50 dark:bg-lighterGray"></div>
              </div>

              {/* <AnalyticsMockupsAnimation /> */}
            </Reveal>
          </Reveal>
        </div>

        {/* fourth section (why choose us) */}
        <div className="grid place-content-center space-y-12 px-4 py-12 pb-20 md:px-12 md:py-16 lg:h-screen lg:items-center lg:justify-center lg:space-y-16 lg:px-[5vw]">
          <Heading
            variant="h2"
            className="md:textxl text-center text-4xl lg:text-6xl"
          >
            <span className="text-blue">Why</span> choose{" "}
            <span className="text-blue"></span>us
          </Heading>

          <div className="mx-auto flex w-fit flex-col gap-12 py-16 lg:flex-row lg:items-stretch lg:gap-8">
            {whyChooseUs.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Reveal
                  key={idx}
                  once={false}
                  variants="slide up"
                  className="group flex aspect-square max-w-[300px] flex-1 flex-col items-center justify-start space-y-6 md:max-w-[400px] lg:aspect-[3/2] lg:max-w-sm"
                >
                  <div
                    className={`border-gray-200 dark:border-gray-700 flex h-full flex-col items-center space-y-6 rounded-2xl border bg-white p-8 text-center shadow-xl dark:bg-lighterNavy ${feature.hoverEffect} transition-all duration-300`}
                  >
                    <div
                      className={` ${feature.background} -mt-16 rounded-full p-4 shadow-lg group-hover:animate-bounce`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <Heading
                      variant="h3"
                      className="text-2xl font-bold transition-colors group-hover:text-blue"
                    >
                      {feature.title}
                    </Heading>
                    <Paragraph>{feature.description}</Paragraph>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <FAQSection />
      </div>
      <Footer />
    </>
  );
};

export default Home;
