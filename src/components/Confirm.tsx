import React from "react";
import Paragraph from "./text/Paragraph";
import Button from "./Button";
import Modal from "./Modal";
import { ConfirmProps } from "@/types/types";
import cn from "@/utilities/cn";

const Confirm = ({
  isOpen = false,
  rejectAction,
  acceptAction,
  header,
  content,
  variant = "normal",
}: ConfirmProps) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="w-fit max-w-md space-y-6 rounded-md bg-white p-4 shadow-2xl shadow-black/50 dark:bg-gray">
        <Paragraph
          className={cn(
            "text-lg font-semibold",
            variant === "serious" && "text-red",
          )}
        >
          {header}
        </Paragraph>
        <Paragraph>{content}</Paragraph>

        <div className="flex justify-end space-x-2">
          <Button
            className="w-fit px-4 py-2"
            onClick={() => {
              acceptAction;
              rejectAction(true);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="secondary"
            className="w-fit px-4 py-2"
            onClick={() => rejectAction(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
