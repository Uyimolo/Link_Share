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
import { deleteLink } from "@/services/firestoreService";
import Paragraph from "@/components/text/Paragraph";

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
      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon style={{ color: link.color }} className="text-lg" />}
          <Paragraph>{link.title}</Paragraph>
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
            <DropdownMenuItem onClick={() => deleteLink(user?.uid, link.id)}>
              Delete Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View link analytics</DropdownMenuItem>
            <DropdownMenuItem>Make link private</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
