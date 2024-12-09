import Modal from "@/components/Modal";
import Paragraph from "@/components/text/Paragraph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { thumbnailIcons } from "@/data/thumbnailIcons";
import { ThumbnailIcon } from "@/types/types";
import { FaMagnifyingGlassArrowRight } from "react-icons/fa6";

const SelectIconModal = ({
  setSearchTerm,
  searchTerm,
  searchedIcons,
  showSearchedIcons,
  closeModal,
}: {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  searchedIcons: ThumbnailIcon[];
  showSearchedIcons: boolean;
  closeModal: () => void;
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value)
    setSearchTerm(event.target.value.trim());
  };

  const groupedByCategories = searchedIcons.reduce<
    Record<string, ThumbnailIcon[]>
  >((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Modal
      isOpen={showSearchedIcons}
      closeModal={closeModal}
      className="cursor-default"
    >
      <div className="cursor-default rounded-xl bg-white pb-8 dark:bg-darkGray">
        {/* search input */}
        <div className="sticky top-0 rounded-xl bg-white p-4 dark:bg-darkGray">
          <FaMagnifyingGlassArrowRight className="text-gray-white absolute left-7 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            className="border-gray-300 focus:ring-blue-500 w-full rounded-xl border bg-lightestGray py-2 pl-10 pr-4 focus:outline-none focus:ring-2 dark:text-gray placeholder:dark:text-gray"
            placeholder="Search icons here"
            onChange={handleSearchChange}
            autoFocus
            value={searchTerm}
          />
        </div>

        {/* icons */}
        <div className="h-[60vh] overflow-auto rounded-xl p-4">
          {Object.entries(groupedByCategories).map(([category, items]) => (
            <div className="">
              <Paragraph>{category}</Paragraph>

              <div className="grid grid-cols-5 md:grid-cols-10">
                {items.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger className="grid aspect-square w-10 place-content-center rounded-xl hover:bg-lightestGray dark:hover:bg-black md:w-14">
                          <Icon className="text-xl text-darkGray dark:text-lightestGray md:text-2xl" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <Paragraph>{item.name}</Paragraph>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SelectIconModal;
