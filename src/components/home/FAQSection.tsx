"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Paragraph from "../text/Paragraph";
import Heading from "../text/Heading";
import StaggeredReveal from "../animation/StaggeredReveal";
import StaggeredRevealContainer from "../animation/StaggeredRevealContainer";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Getting started is a breeze! Sign up for a free account using your email, Google, or social login. Once you're in, you can quickly create your profile, add your links, and choose a theme that suits your style. No technical expertise required—just a few clicks, and you're ready to share your custom profile link with the world!",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, your data is our top priority. We use industry-standard encryption (HTTPS and SSL) to keep your information safe during transmission. Your data is stored securely on our servers, which are constantly monitored and updated to protect against vulnerabilities. Plus, we never share your data with third parties without your consent.",
    },
    {
      question: "Can I customize my profile?",
      answer:
        "Absolutely! We believe your profile should reflect your unique identity. Choose from a variety of professionally designed themes, customize colors, add your logo, and even upload your background images. Whether you're a creator, entrepreneur, or small business, our customization options make your profile stand out.",
    },
    {
      question: "How many links can I add?",
      answer:
        "With our free plan, you can add up to 5 links—perfect for showcasing your top content or platforms. Need more? Upgrade to our premium plan for unlimited links, advanced analytics, and priority support. There are no limits to how many updates or edits you can make, so your profile grows as your needs do.",
    },
    {
      question: "Do you offer analytics?",
      answer:
        "Yes, we provide in-depth analytics to help you make data-driven decisions. Track profile visits, monitor clicks on individual links, and see engagement trends over time. Gain insights into where your audience is coming from and what content they love most. Our analytics dashboard is intuitive and easy to use, even for beginners.",
    },
    {
      question: "Can I add links to videos or social media?",
      answer:
        "Absolutely! Whether it's a YouTube video, TikTok clip, Instagram post, or Twitter profile, you can add any type of link to your profile. You can also categorize links for easier navigation, so your visitors can quickly find what they're looking for.",
    },

    {
      question: "How much does it cost?",
      answer:
        "We offer a free plan that's packed with essential features like customizable themes, up to 5 links, and basic analytics. If you're ready to take it further, our premium plans start at just $9/month, unlocking unlimited links, advanced analytics, priority support, and team collaboration. Flexible billing options are available for your convenience.",
    },
    {
      question: "Can I monetize my profile?",
      answer:
        "Yes, you can! Add links to your shop, affiliate products, or subscription services like Patreon or Buy Me a Coffee. It's a great way to turn your profile into a revenue-generating tool while connecting with your audience.",
    },
  ];

  const toggleFAQ = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-12 px-4 py-16 md:px-12 lg:px-[5vw]">
      <Heading
        variant="h2"
        className="md:textxl text-center text-4xl lg:text-6xl"
      >
        Got <span className="text-blue">questions?</span>
      </Heading>

      <StaggeredRevealContainer className="mx-auto max-w-2xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <StaggeredReveal
              variants="fade in"
              key={index}
              className={`dark:bg-lighterNavy rounded-xl bg-blue p-6 shadow-sm backdrop-blur transition-all duration-300`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between"
              >
                <span className="text-base font-semibold text-white lg:text-lg">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <FaChevronUp className="text-white dark:text-white" />
                  ) : (
                    <FaChevronDown className="text-white" />
                  )}
                </motion.span>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                exit={{ height: 0, opacity: 0 }}
                className="dark:text-gray-300 overflow-hidden text-gray"
              >
                <Paragraph className="mt-4 text-white">{faq.answer}</Paragraph>
              </motion.div>
            </StaggeredReveal>
          );
        })}
      </StaggeredRevealContainer>
    </div>
  );
};

export default FAQSection;
