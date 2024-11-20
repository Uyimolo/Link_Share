import React from "react";
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import { useAnalytics } from "@/custom-hooks/useAnalytics";

const LinksTable = () => {
  const { linksWithAnalytics } = useAnalytics();

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      
      <DataTable columns={Columns} data={linksWithAnalytics} />
    </div>
  );
};

export default LinksTable;
