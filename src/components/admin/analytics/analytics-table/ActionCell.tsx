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
import Confirm from "@/components/Confirm";

interface ActionsCellProps {
  link: LinkWithAnalytics;
}

const ActionsCell: FC<ActionsCellProps> = ({ link }) => {
  const { user } = useAuthContext();
  const { deleteLink } = useLinkContext();
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dark:bg-deepNavy">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          <DropdownMenuItem onClick={() => setShowDeleteConfirmation(true)}>
            Delete Link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowAnalyticsModal(true)}>
            View link analytics
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Make link private</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal
        isOpen={showAnalyticsModal}
        closeModal={() => setShowAnalyticsModal(false)}
        className="w-screen px-4 pt-5"
      >
        <LinkAnalytics link={link} />
      </Modal>

      <Confirm
        isOpen={showDeleteConfirmation}
        rejectAction={() => setShowDeleteConfirmation(false)}
        acceptAction={() => deleteLink(link.id, user!.uid)}
        header="Delete Link"
        content="Deleting this link will also remove all associated analytics data. Are you sure you want to proceed? You can undo this action before saving."
        variant="serious"
      />
    </>
  );
};

export default ActionsCell;
