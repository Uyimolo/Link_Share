import Button from "@/components/Button";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
import { areLinksEqual} from "@/custom-hooks/useLinks";
import { LinkType } from "@/types/types";
import React, { RefObject } from "react";
import LinkCard from "./linkcard/LinkCard";
import Intro from "./Intro";
import { toast } from "sonner";
import Loading from "@/components/Loading";

const LinkTab = ({
  containerRef,
  links,
  setLinks,
  linksFromDb,
  saveLinks,
  loading,
}: {
    containerRef: RefObject<HTMLDivElement>;
    links: LinkType[];
    setLinks: (newLinks: LinkType[]) => void;
    linksFromDb: LinkType[];
    saveLinks: (newLinks: LinkType[]) => void;
    loading: boolean;
}) => {
  const { user } = useAuthContext();

  const handleAddNewLink = () => {
    const uniqueId = `${Math.floor(Date.now() + Math.random() * 10000)}`;
    const newLink = { id: uniqueId, url: "", title: "" };
    setLinks([...links, newLink]);

    // scroll down to the new link added
    setTimeout(() => {
      if (containerRef.current) {
        window.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleLinkUpdate = (updatedLink: LinkType) => {
    const updatedLinks = links.map((link) =>
      link.id === updatedLink.id ? updatedLink : link,
    );
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (linkId: string) => {
    const updatedLinks = links.filter((link) => link.id !== linkId);
    setLinks(updatedLinks);
  };

  const handleSaveLinks = () => {
    const validLinks = links.filter((link) => link.url && link.title);
    if (validLinks.length === links.length) {
      saveLinks(validLinks);
    } else {
      toast.warning("Please fill in all fields or remove incomplete links");
    }
    };
    
     if (!user || loading) {
       return (
         <div className="grid h-[80vh] w-full place-content-center rounded-t-xl bg-white">
           <Loading />
         </div>
       );
     }

  return (
    <div className="">
      <div className="rounded-t-xl bg-white p-6 md:p-10">
        <div className="space-y-2">
          <Heading variant="h1">Customize your links</Heading>
          <Paragraph>
            Add/edit/remove links below and then share with the world!
          </Paragraph>
        </div>

        <div className="sticky top-0 z-20 bg-white py-6">
          <Button variant="secondary" className="" onClick={handleAddNewLink}>
            + Add new link
          </Button>
        </div>

        {/* links */}
        {links.length > 0 ? (
          <div className="space-y-6">
            {links.map((link, index) => (
              <LinkCard
                index={index}
                key={link.id}
                link={link}
                updateLink={handleLinkUpdate}
                deleteLink={handleRemoveLink}
              />
            ))}
          </div>
        ) : (
          <Intro />
        )}
      </div>

      {/* save button */}
      <div className="sticky bottom-0 mt-1 flex w-full rounded-b-xl bg-white p-6 md:px-10">
        <Button
          className="ml-auto mr-0 md:w-fit"
          disabled={areLinksEqual(links, linksFromDb)}
          onClick={handleSaveLinks}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default LinkTab;
