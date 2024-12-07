import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-darkGray">
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
        <DropdownMenuItem onClick={() => deleteLink(link.id, user!.uid)}>
          Delete Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setShowAnalyticsModal(true)}>
          View link analytics
        </DropdownMenuItem>
        <DropdownMenuItem>Make link private</DropdownMenuItem>
      </DropdownMenuContent>
      <Modal
        isOpen={showAnalyticsModal}
        closeModal={() => setShowAnalyticsModal(false)}
        className="w-full px-4"
      >
        <LinkAnalytics link={link} />
      </Modal>
    </DropdownMenu>
  );
};

export default ActionsCell;
