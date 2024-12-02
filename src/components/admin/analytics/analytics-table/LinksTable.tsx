import React from "react";
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import { useAnalytics } from "@/custom-hooks/useAnalytics";

const LinksTable = () => {
  const { linksWithAnalytics } = useAnalytics();

  return <DataTable columns={Columns} data={linksWithAnalytics} />;
};

export default LinksTable;
