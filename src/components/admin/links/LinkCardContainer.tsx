import { AnimatePresence, Reorder } from "motion/react";
import LinkCard from "./linkcard/LinkCard";
import { LinkType } from "@/types/types";

type LinkCardContainerType = {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[] | null>>;
  deleteLink: (id: string) => void;
  updateLink: (link: LinkType) => void;
};

const LinkCardContainer = ({
  links,
  setLinks,
  deleteLink,
  updateLink,
}: LinkCardContainerType) => {
  const handleReorder = (newOrder: LinkType[]) => {
    setLinks(newOrder);
  };

  return (
    <Reorder.Group
      axis="y"
      values={links}
      onReorder={handleReorder}
      className="space-y-4"
    >
      <AnimatePresence>
        {links.map((link, index) => (
          <LinkCard
            key={link.id}
            index={index}
            link={link}
            deleteLink={deleteLink}
            updateLink={updateLink}
            setLinks={setLinks}
            links={links}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default LinkCardContainer;
