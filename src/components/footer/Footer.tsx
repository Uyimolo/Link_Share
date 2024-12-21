import React from "react";
import Paragraph from "../text/Paragraph";
import Logo from "../brand/Logo";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button";
import { IconType } from "react-icons";
import { PiMailbox } from "react-icons/pi";
import cn from "@/utilities/cn";

const quickLinks = {
  title: "Explore",
  content: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Features",
      url: "/services", // Rename "Services" to "Features" for modern web terminology
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
};

const resources = {
  title: "Learn More",
  content: [
    {
      title: "Our Mission",
      url: "/our-why", // "Our Why" is clearer as "Our Mission"
    },
    {
      title: "Meet the Team",
      url: "/our-team", // Clarified as "Meet the Team"
    },
    {
      title: "FAQs",
      url: "/faqs",
    },
    {
      title: "Testimonials",
      url: "/our-testimonials", // Simplified to "Testimonials"
    },
  ],
};

const userLinks = {
  title: "Your Account",
  content: [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Create Account",
      url: "/register", // More actionable as "Create Account"
    },
    {
      title: "Sign In",
      url: "/login", // Matches modern phrasing
    },
  ],
};

const footerContent = [quickLinks, resources, userLinks];

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

type emailSubscriptionFieldData = {
  email: "string";
};

const emailSubscriptionField: Array<{
  name: keyof emailSubscriptionFieldData;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  icon?: IconType;
}> = [
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter email",
    required: true,
    icon: PiMailbox,
  },
];
const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const error = errors.email?.message;
  const Icon = emailSubscriptionField[0].icon;

  const onEmailSubscriptionSubmit = () => {
    console.log("Email subscription submitted");
    reset(); // Clear the form
  };

  return (
    <footer className="bg-blue dark:bg-deepNavy dark:border-t dark:border-white px-4 py-10  md:px-12 lg:px-[5vw]">
      <div className="space-y-10 border-t border-white py-10">
        <Logo showFullLogo variant="white" />

        <div className="grid gap-10 md:flex md:justify-between">
          {/* footer links and news letter */}

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex md:justify-between md:gap-12">
            {footerContent.map((section, index) => (
              <div className="space-y-2" key={index}>
                <Paragraph className="text-nowrap font-semibold text-white">
                  {section.title}
                </Paragraph>
                <ul className="space-y-1">
                  {section.content.map((sectionContent, index) => (
                    <li key={index}>
                      <Link
                        href={sectionContent.url}
                        className="text-sm text-white"
                      >
                        {sectionContent.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* news letter */}

          <div className="w-full max-w-[300px] space-y-4">
            <Paragraph className="font-semibol text-white">
              Subscribe to our newsletter and be the first to know about
              updates, tips, and exclusive features.
            </Paragraph>

            <form
              onSubmit={handleSubmit(onEmailSubscriptionSubmit)}
              className="bg-whit rounded-2xl"
            >
              <div className="items-end space-y-6">
                <div className="">
                  <label
                    className={cn(
                      "sr-only text-xs text-gray",
                      error && "text-red",
                    )}
                    htmlFor={emailSubscriptionField[0].name}
                  >
                    {emailSubscriptionField[0].label}
                  </label>

                  <div className="relative">
                    <Button className="absolute right-1 top-1 h-[calc(100%-8px)] w-fit rounded-l-none">
                      Subscribe
                    </Button>

                    <input
                      className={cn(
                        "w-full rounded-lg border border-lighterGray py-4 pl-10 pr-4 text-sm text-gray placeholder:text-sm placeholder:text-gray hover:border-blue",
                        error && "border-red",
                      )}
                      type="email"
                      {...register(emailSubscriptionField[0].name)}
                      placeholder={emailSubscriptionField[0].placeholder}
                    />

                    {emailSubscriptionField[0].icon && Icon && (
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray" />
                    )}

                    {error && (
                      <Paragraph
                        variant="small"
                        className="absolute -bottom-4 right-0 w-fit text-right text-white"
                      >
                        {error}
                      </Paragraph>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
