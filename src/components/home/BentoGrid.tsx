import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, BarChart3, Palette, Share2 } from "lucide-react";

const BentoGrid = () => {
  const [positions, setPositions] = useState([0, 1, 2, 3]);
  const [carouselIndex, setCarouselIndex] = useState(0); // Track the active carousel index

  // Grid layout configurations
  const gridItems = [
    {
      icon: Link,
      title: "Link Management",
      description:
        "Create, organize, and share all your important links in one beautiful profile",
      className: "bg-gradient-to-br from-[#D2E823] to-[#254F1A]",
      textColor: "text-white",
      iconColor: "text-white",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track your link performance and audience engagement",
      className: "bg-white dark:bg-lighterNavy",
      iconColor: "text-[#D2E823]",
      progressBar: true,
    },
    {
      icon: Palette,
      title: "Themes",
      description: "Customize your profile with beautiful themes",
      className: "bg-[#E9C0E9]",
      textColor: "text-[#502274]",
      iconColor: "text-[#502274]",
    },
    {
      icon: Share2,
      title: "Share Everywhere",
      description: "One link for all platforms",
      className: "bg-white dark:bg-lighterNavy",
      iconColor: "text-[#780016]",
      indicators: ["bg-[#D2E823]", "bg-[#E9C0E9]", "bg-[#780016]"],
    },
  ];

  const shufflePositions = () => {
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      for (let i = newPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
      }
      return newPositions;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(shufflePositions, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getGridPosition = (index: number) => {
    const row = Math.floor(positions[index] / 2);
    const col = positions[index] % 2;
    return { row, col };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % gridItems.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(interval);
  }, [gridItems.length]);

  return (
    <div className="max-w-[600px] mx-auto w-full">
      {/* Tablet and larger view */}
      <div className="hidden sm:block">
        <div className="relative grid h-[50vh] lg:h-[70vh] max-h-[520px] max-w-[600px] w-full grid-cols-2 gap-x-4 gap-y-4">
          {positions.map((_, index) => {
            const item = gridItems[index];
            const Icon = item.icon;
            const { row, col } = getGridPosition(index);

            return (
              <motion.div
                key={index}
                layout
                initial={false}
                animate={{
                  x: col * 100 + "%",
                  y: row * 100 + "%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
                className="absolute h-[calc(50%-0.5rem)] w-[calc(50%-0.5rem)]"
              >
                <div className="h-full w-full p-2">
                  <motion.div
                    layout
                    className={`h-full w-full rounded-2xl p-6 shadow-lg transition-colors ${item.className}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <Icon className={`mb-4 h-6 w-6 ${item.iconColor}`} />
                        <h3
                          className={`mb-2 text-lg font-bold ${item.textColor}`}
                        >
                          {item.title}
                        </h3>
                        <p className={`text-sm opacity-80 ${item.textColor}`}>
                          {item.description}
                        </p>
                      </div>

                      {item.progressBar && (
                        <div className="bg-gray-200 h-2 rounded-full">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-2 rounded-full bg-[#D2E823]"
                          />
                        </div>
                      )}

                      {item.indicators && (
                        <div className="flex space-x-2">
                          {item.indicators.map((color, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ height: 0 }}
                              animate={{ height: 32 }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              className={`w-1 rounded ${color}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="relative mx-auto block w-full  overflow-hidden sm:hidden">
        <motion.div
          className="flex"
          initial={false}
          animate={{ x: -carouselIndex * 100 + "%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {gridItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className={`aspect-[3/2] max-h-[250px] h-full w-full flex-shrink-0 rounded-2xl p-6 ${item.className}`}
              >
                <div className="flex h-full w-full flex-col justify-between">
                  <div>
                    <Icon className={`mb-4 h-6 w-6 ${item.iconColor}`} />
                    <h3 className={`mb-2 text-lg font-bold ${item.textColor}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm opacity-80 ${item.textColor}`}>
                      {item.description}
                    </p>
                  </div>

                  {item.progressBar && (
                    <div className="bg-gray-200 h-2 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 rounded-full bg-[#D2E823]"
                      />
                    </div>
                  )}

                  {item.indicators && (
                    <div className="flex space-x-2">
                      {item.indicators.map((color, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ height: 0 }}
                          animate={{ height: 32 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className={`w-1 rounded ${color}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default BentoGrid;
