"use client";

import { LinkWithAnalytics } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionCell from "@/components/admin/analytics/analytics-table/ActionCell";
import { Button } from "@/components/ui/button";
import Paragraph from "@/components/text/Paragraph";
import { FaEarthOceania } from "react-icons/fa6";

export const Columns: ColumnDef<LinkWithAnalytics>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="border dark:border-white dark:text-white"
        >
          Link Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const link = row.original;
      const Icon = link.icon;

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
          <Paragraph className="dark capitalize">{link.title}</Paragraph>
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
          className="border dark:border-white dark:text-white"
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
          className="border dark:border-white dark:text-white"
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
    cell: ({ row }) => <ActionCell link={row.original} />,
  },
];
