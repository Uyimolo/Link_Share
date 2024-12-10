import Modal from "@/components/Modal";
import Paragraph from "@/components/text/Paragraph";
import { ThumbnailIcon } from "@/types/types";
import { FaMagnifyingGlassArrowRight } from "react-icons/fa6";
import { RxReset } from "react-icons/rx";
import Button from "@/components/Button";
import TooltipComponent from "@/components/TooltipComponent";

const SelectIconModal = ({
  setSearchTerm,
  searchTerm,
  searchedIcons,
  showSearchedIcons,
  closeModal,
  handleIconSelection,
}: {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  searchedIcons: ThumbnailIcon[];
  showSearchedIcons: boolean;
  closeModal: () => void;
  handleIconSelection: (icon: string) => void;
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

        <Button
          variant="ghost"
          className="d ml-4 flex w-fit items-center gap-2 rounded p-2"
          onClick={() => handleIconSelection("default")}
        >
          <RxReset />
          Reset link icon
        </Button>

        {/* icons */}
        <div className="h-[60vh] overflow-auto rounded-xl p-4">
          {Object.entries(groupedByCategories).map(([category, items]) => (
            <div className="" key={category}>
              <Paragraph>{category}</Paragraph>

              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10">
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <TooltipComponent key={item.name}
                      className="w-10 p-0 sm:w-14"
                      triggerChildren={
                        <Icon className="text-2xl text-darkGray dark:text-lightestGray" />
                      }
                      content={item.name}
                      onClick={() => handleIconSelection(item.name)}
                    />
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
