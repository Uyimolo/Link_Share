import React from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { useAnalytics } from "@/custom-hooks/useAnalytics";
import Heading from "@/components/text/Heading";

const LinksTable = () => {
  const { linksWithAnalytics } = useAnalytics();

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      
      <DataTable columns={columns} data={linksWithAnalytics} />
    </div>
  );
};

export default LinksTable;
