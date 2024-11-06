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

const features = [
  {
    title: "Simple Link Creation",
    content:
      "Easily add links to showcase your work, social profiles, or resources.",
  },
  // {
  //   title: 'Drag-and-Drop Organization',
  //   content:
  //     'Reorder your links instantly with a simple drag-and-drop interface.',
  // },
  {
    title: "Real-Time Preview",
    content:
      "See changes live as you edit, ensuring your profile looks perfect.",
  },
  {
    title: "Batch Updates",
    content:
      "Make multiple edits and save them all at once with a single click.",
  },
  {
    title: "Mobile-First Design",
    content: "Manage your links smoothly from any device, wherever you are.",
  },
];

const Home = () => {
  useProtectedRoute(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="fixed left-1/2 top-4 z-10 flex w-[calc(100%-32px)] -translate-x-1/2 items-center justify-between rounded-xl bg-white p-4">
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

      {/* first section */}
      <div className="space-y-10 bg-blue p-4 pt-32 md:grid md:grid-cols-2 md:items-center md:p-12 lg:space-y-0 lg:p-[5vw] lg:pt-48">
        <div className="space-y-4">
          <Heading
            variant="h1"
            className="max-w-md text-4xl leading-none text-white md:max-w-none lg:text-5xl xl:text-[4.15vw] 2xl:text-7xl"
          >
            Effortlessly Share Your Story with One Link.
          </Heading>
          <Paragraph className="w-fit max-w-sm leading-none text-lightestGray md:max-w-xl lg:max-w-lg lg:text-lg xl:max-w-xl xl:text-xl">
            {`Whether you're a content creator, business owner, or just someone who
          loves organization, easily manage and share all your important links
          from one place.`}
          </Paragraph>

          <Button
            variant="secondary"
            className="w-fit lg:translate-y-6"
            onClick={() => router.push("/login")}
          >
            Get started for free
          </Button>
        </div>

        <div className="">
          <div className="relative mx-auto ml-auto w-40 md:w-[50%] lg:mr-[5vw] lg:max-w-[500px] xl:w-[45%]">
            <div className="absolute left-1/2 top-1/2 grid aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border-4 backdrop-blur-sm"></div>

            <div className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lightBlue/50 backdrop-blur-[1px]"></div>

            <Image
              alt="Mockup of preview page"
              src={previewScreenshot}
              className="relative rounded-xl border shadow-xl shadow-black/50"
            />

            <Image
              src={logo}
              alt="logo"
              className="absolute -left-6 top-1/2 w-16 -translate-y-1/2 opacity-60 lg:-left-16 lg:w-28"
            />
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="grid items-center space-y-6 p-4 md:p-12 lg:grid-cols-2 lg:gap-20 lg:space-y-0 lg:p-[5vw]">
        <div className="space-y-6 rounded-xl p-4 lg:order-2">
          <Heading
            variant="h2"
            className="max-w-md text-4xl leading-none md:max-w-none lg:text-5xl xl:text-[3.7vw] 2xl:text-7xl"
          >
            Manage your links with Unmatched Simplicity
          </Heading>

          <Paragraph className="">{`Quickly add links to showcase your work, social profiles, or resources. Easily reorder with drag-and-drop, preview changes live, and save multiple updates with one click. Manage everything seamlessly from any device.`}</Paragraph>

          <Button className="w-fit" onClick={() => router.push("/login")}>
            Get started for free
          </Button>
        </div>

        <Image
          src={dashboardScreenshot}
          alt="Mockup of dashboard page"
          className="rounded-xl border shadow-xl shadow-black/50"
        />
      </div>

      {/* third section  */}
      <div className="grid items-center space-y-6 p-4 md:p-12 lg:grid-cols-2 lg:gap-20 lg:space-y-0 lg:p-[5vw]">
        <div className="space-y-6 rounded-xl p-4">
          <Heading
            variant="h2"
            className="max-w-md text-4xl leading-none md:max-w-none lg:text-5xl xl:text-[3.7vw] 2xl:text-7xl"
          >
            Track, Analyze, and Optimize Your Link Performance
          </Heading>

          <Paragraph className="">{`Grow with clear, actionable insights from our analytics. Track profile visits, monitor link clicks, and see real-time updates to understand what content resonates. With easy-to-read metrics, refine your strategy and connect better with your audience.`}</Paragraph>

          <Button className="w-fit" onClick={() => router.push("/login")}>
            Get started for free
          </Button>
        </div>

        <Image
          src={dashboardScreenshot}
          alt="Mockup of dashboard page"
          className="rounded-xl border shadow-xl shadow-black/50"
        />
      </div>
      {/*  */}
    </div>
  );
};

export default Home;
