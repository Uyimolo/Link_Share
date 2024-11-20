import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkWithAnalytics } from "@/types/types";
import { useAuthContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";
import { MoreHorizontal } from "lucide-react";
import Modal from "@/components/Modal";
import LinkAnalytics from "./LinkAnalytics";
import { Button } from "@/components/ui/button";

interface ActionsCellProps {
  link: LinkWithAnalytics;
}

const ActionsCell: FC<ActionsCellProps> = ({ link }) => {
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
        <Modal closeModal={() => setShowAnalyticsModal(false)} className="p-4">
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
};

export default ActionsCell;
