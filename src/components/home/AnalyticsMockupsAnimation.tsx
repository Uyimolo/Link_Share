import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import mobile from "@/assets/images/analyticsMobile.png";
import tablet from "@/assets/images/analyticsIpad.png";
import desktop from "@/assets/images/analyticsPage.png";

const AnalyticsMockupsAnimation = () => {
  const [activeDevice, setActiveDevice] = useState(0);
  const devices = [
    {
      image: desktop,
      alt: "Desktop Mockup",
      className:
        "mx-auto mt-16 w-10/12 rounded-sm border-[5px] border-black lg:mt-0",
      mockupClassName: "",
      type: "desktop",
      size: "w-full max-w-[1000px]",
    },
    {
      image: tablet,
      alt: "Tablet Mockup",
      className: "",
      mockupClassName:
        "relative h-auto overflow-hidden rounded-2xl border-4 border-black bg-white",
      type: "tablet",
      size: "w-3/5 md:w-2/5  max-w-[600px]",
    },
    {
      image: mobile,
      alt: "Mobile Mockup",
      className: "",
      mockupClassName:
        "relative h-auto w-2/5 overflow-hidden rounded-2xl border-2 border-black bg-black bg-cover",
      type: "mobile",
      size: "w-full md:max-w-[400px] lg:w-2/5 max-w-[300px]",
    },
  ];

  useEffect(() => {
    // let interval: NodeJS.Timeout | undefined;

    const interval = setInterval(() => {
      setActiveDevice((prev) => (prev + 1) % devices.length);
    }, 4000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [devices.length]);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: 100,
    },
    in: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "anticipate",
      },
    },
    out: {
      opacity: 0,
      scale: 0.8,
      x: -100,
      transition: {
        duration: 0.8,
        ease: "anticipate",
      },
    },
  };

  return (
    <div className="relative flex h-[50vh] items-center justify-center overflow-hidden px-4 lg:h-[80vh]">
      <AnimatePresence mode="wait">
        {devices.map(
          (device, index) =>
            activeDevice === index && (
              <motion.div
                key={device.type}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="absolute mx-auto flex w-fit flex-col items-center"
              >
                <div className={`${device.mockupClassName} ${device.size}`}>
                  <Image
                    src={device.image}
                    alt={device.alt}
                    className={`${device.className} shadow-2xl`}
                  />
                  {device.type === "tablet" && (
                    <>
                      <span className="absolute left-1/2 top-2 h-2 w-12 -translate-x-1/2 rounded-full bg-black/50"></span>
                      <span className="absolute bottom-2 left-1/2 h-3 w-8 -translate-x-1/2 rounded bg-black/30"></span>
                    </>
                  )}
                  {device.type === "mobile" && (
                    <>
                      <span className="absolute left-1/2 top-4 h-1.5 w-[30%] -translate-x-1/2 rounded-xl bg-black/50 lg:h-3"></span>
                      <span className="absolute bottom-2 left-1/2 h-1 w-[30%] -translate-x-1/2 rounded bg-black/30"></span>
                    </>
                  )}
                  {device.type === "desktop" && (
                    <>
                      <div className="h-3 w-full rounded-b-xl bg-black shadow-xl shadow-black"></div>
                      <div className="mx-auto flex h-[2px] w-4/5 justify-between">
                        <div className="h-full w-6 bg-black/50"></div>
                        <div className="h-full w-6 bg-black/50"></div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsMockupsAnimation;
