"use client";

import { LinkWithAnalytics } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import Paragraph from "@/components/text/Paragraph";
import { useLinkContext } from "@/context/LinkContext";
import Modal from "@/components/Modal";
import ClickTrendsChart from "../ClickTrendsChart";
import { useState } from "react";
import TopClicksByCountries from "../TopClicksByCountries";
import { PiDevices } from "react-icons/pi";
import { FaEarthOceania, FaEye } from "react-icons/fa6";
import LinkAnalytics from "./LinkAnalytics";

export const columns: ColumnDef<LinkWithAnalytics>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="border"
        >
          Link Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const link = row.original;
      const Icon = link.icon;

      console.log(link);
      return (
        <div className="flex items-center gap-2">
          {Icon ? (
            <Icon style={{ color: link.color }} className="text-lg" />
          ) : (
            <FaEarthOceania
              style={{ color: link.color ? link.color : "#633CFF" }}
              className="text-lg"
            />
          )}
          <Paragraph className="capitalize">{link.title}</Paragraph>
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="border"
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "clickCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="border"
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastClickDate",
    header: "Last Clicked on",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const link = row.original;
      const { user } = useAuthContext();
      const { deleteLink } = useLinkContext();
      const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

      const mobilePercentage = Math.round(
        (link.deviceType.mobile / link.clickCount) * 100,
      );
      const desktopPercentage = Math.round(
        (link.deviceType.desktop / link.clickCount) * 100,
      );

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => deleteLink(link.id, user!.uid)}>
              Delete Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowAnalyticsModal(true)}>
              View link analytics
            </DropdownMenuItem>
            <DropdownMenuItem>Make link private</DropdownMenuItem>
          </DropdownMenuContent>
          {showAnalyticsModal && (
            <Modal
              closeModal={() => setShowAnalyticsModal(false)}
              className="p-4"
            >
              <LinkAnalytics
                mobilePercentage={mobilePercentage}
                desktopPercentage={desktopPercentage}
                uniqueVisitorsCount={link.uniqueVisitors.length}
                clickLocations={link.clickLocations}
                clickTrendChartData={link.clickTrendsChartData}
              />
            </Modal>
          )}
        </DropdownMenu>
      );
    },
  },
];
