"use client";
import Button from "@/components/Button";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import useProtectedRoute from "@/custom-hooks/useProtectedRoute";
import Image from "next/image";
import { useRouter } from "next/navigation";
import previewScreenshot from "@/assets/images/preview-screenshot.png";
import dashboardScreenshot from "@/assets/images/dashboard-screenshot.png";
import logo from "@/assets/images/logo.svg";
import Logo from "@/components/brand/Logo";
import undrawImage from "@/assets/svgs/undraw4.svg";
import Footer from "@/components/footer/Footer";
import Reveal from "@/components/animation/Reveal";
import StaggeredRevealContainer from "@/components/animation/StaggeredRevealContainer";
import StaggeredReveal from "@/components/animation/StaggeredReveal";

const Home = () => {
  useProtectedRoute(false);
  const router = useRouter();

  const paragraphStyle =
    "w-fit sm:text-base md:text-2xl lg:max-w-none lg:text-base";

  const headingStyle =
    "font-bold text-4xl sm:text-5xl md:text-6xl leading-none lg:text-5xl xl:text-[4.2vw] 2xl:text-7xl";
  return (
    <div className="w-full overflow-x-hidden bg-white dark:bg-darkGray">
      <div className="fixed left-1/2 top-4 z-10 flex w-[calc(100%-32px)] -translate-x-1/2 items-center justify-between rounded-xl border border-gray/10 bg-white/80 p-4 shadow-lg outline-8 dark:bg-gray/50 outline-white backdrop-blur-[2px]">
        <div className="hidden md:block">
          <Logo showFullLogo />
        </div>

        <div className="md:hidden">
          <Logo />
        </div>

        <div className="flex space-x-4">
          <Button
            variant="secondary"
            className="w-fit"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="primary"
            className="hidden w-fit md:block"
            onClick={() => router.push("/register")}
          >
            Get started
          </Button>
        </div>
      </div>
      <div className="px-4 md:px-12 lg:px-[5vw]">
        {/* first section */}
        <div className="grid gap-16 pt-36 md:items-center md:pt-48 lg:grid-cols-2">
          <StaggeredRevealContainer className="space-y-6">
            <StaggeredReveal variants="slide up">
              <Heading variant="h1" className={headingStyle}>
                Effortlessly <span className="text-blue">share your story</span>{" "}
                with a single link.
              </Heading>
            </StaggeredReveal>

            <StaggeredReveal variants="slide up">
              <Paragraph className={paragraphStyle}>
                {`Whether you're a content creator, business owner, or organization enthusiast, simplify your digital presence by managing and sharing all your important links in one place. Save time, stay organized, and ensure your audience has easy access to everything they need with just a click!`}
              </Paragraph>
            </StaggeredReveal>

            <StaggeredReveal variants="slide up">
              <Button
                variant="secondary"
                className="w-fit"
                onClick={() => router.push("/login")}
              >
                Get started for free
              </Button>
            </StaggeredReveal>
          </StaggeredRevealContainer>

          <Reveal
            variants="slide left"
            className="relative mx-auto ml-auto w-1/2 max-w-sm sm:w-[40%] lg:mr-[5vw] lg:max-w-[500px] xl:w-[45%]"
          >
            <div className="absolute left-1/2 top-1/2 grid aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border-4 backdrop-blur-sm"></div>

            <div className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lightBlue/50 backdrop-blur-[1px]"></div>

            <Image
              alt="Mockup of preview page"
              src={previewScreenshot}
              className="relative mx-auto rounded-xl border shadow-xl shadow-black/50"
            />

            <Image
              src={logo}
              alt="logo"
              className="absolute -left-6 top-1/2 w-16 -translate-y-1/2 opacity-60 lg:-left-16 lg:w-28"
            />
          </Reveal>
        </div>

        {/* second section */}
        <div className="grid items-center gap-16 pt-24 md:pt-48 lg:grid-cols-2 lg:gap-20 lg:space-y-0">
          <StaggeredRevealContainer className="space-y-6 rounded-xl lg:order-2">
            <StaggeredReveal variants="slide up">
              <Heading variant="h2" className={headingStyle}>
                <span className="text-blue">Manage your links</span> with
                unmatched simplicity
              </Heading>
            </StaggeredReveal>

            <StaggeredReveal variants="slide up">
              <Paragraph
                className={paragraphStyle}
              >{`Quickly add links to showcase your work, social profiles, or resources. Easily reorder with drag-and-drop, preview changes live, and save multiple updates with one click. Manage everything seamlessly from any device.`}</Paragraph>
            </StaggeredReveal>

            <StaggeredReveal variants="slide up">
              <Button className="w-fit" onClick={() => router.push("/login")}>
                Get started for free
              </Button>
            </StaggeredReveal>
          </StaggeredRevealContainer>

          <Reveal variants="slide right">
            <Image
              src={dashboardScreenshot}
              alt="Mockup of dashboard page"
              className="mx-auto w-full max-w-xl rounded-xl border shadow-xl shadow-black/50 md:w-full md:max-w-3xl lg:max-w-none xl:w-4/5"
            />
          </Reveal>
        </div>

        {/* third section  */}
        <div className="grid items-center gap-16 py-24 md:pt-48 lg:grid-cols-2 lg:gap-20">
          <StaggeredRevealContainer className="space-y-6">
            <StaggeredReveal variants="slide up">
              <Heading variant="h2" className={headingStyle}>
                <span className="text-blue">Track, analyze, and optimize</span>{" "}
                your link performance
              </Heading>
            </StaggeredReveal>

            <StaggeredReveal variants="slide up">
              <Paragraph
                className={paragraphStyle}
              >{`Grow with clear, actionable insights from our analytics. Track profile visits, monitor link clicks, and see real-time updates to understand what content resonates. With easy-to-read metrics, refine your strategy and connect better with your audience.`}</Paragraph>
            </StaggeredReveal>

            <StaggeredReveal variants="slide up">
              <Button className="w-fit" onClick={() => router.push("/login")}>
                Get started for free
              </Button>
            </StaggeredReveal>
          </StaggeredRevealContainer>

          <Reveal variants="slide left">
            <Image
              src={undrawImage}
              alt="image of analytics"
              className="mx-auto xl:w-4/5"
            />
          </Reveal>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
