import { Reorder } from "motion/react";
import LinkCard from "./linkcard/LinkCard";
import { LinkType } from "@/types/types";

type LinkCardContainerType = {
  links: LinkType[];
  setLinks: (newLinks: LinkType[]) => void;
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
      {links.map((link, index) => (
        <Reorder.Item key={link.id} value={link}>
          <LinkCard
            index={index}
            link={link}
            deleteLink={deleteLink}
            updateLink={updateLink}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default LinkCardContainer;
