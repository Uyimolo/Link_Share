"use client";
import Button from "@/components/Button";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
import { LinkType } from "@/types/types";
import { useRef } from "react";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import useConfirmPageLeave from "@/custom-hooks/useConfirmPageLeave";
import LinkCard from "@/components/admin/links/linkcard/LinkCard";
import Intro from "@/components/admin/links/Intro";
import { areLinksEqual, useLinkContext } from "@/context/LinkContext";
import { Reorder } from "motion/react";
import LinkCardContainer from "@/components/admin/links/LinkCardContainer";

const Dashboard = () => {
  const { links, setLinks, linksFromDb, saveLinks, loading, isLinksSaving } =
    useLinkContext();

  const { user } = useAuthContext();
  // Ask for user confirmation before reloading or leaving page if there are unsaved link changes.
  useConfirmPageLeave(!areLinksEqual(links, linksFromDb));
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddNewLink = () => {
    const uniqueId = `${Math.floor(Date.now() + Math.random() * 10000)}`;
    const newLink = { id: uniqueId, url: "", title: "" };
    if (links) {
      setLinks([...links, newLink]);
    }

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
    const linkToUpdate = links?.map((link) =>
      link.id === updatedLink.id ? updatedLink : link,
    );

    if (linkToUpdate) {
      setLinks(linkToUpdate);
    }
  };

  const handleRemoveLink = (linkId: string) => {
    const updatedLinks = links?.filter(
      (link) => link.id !== linkId,
    ) as LinkType[];

    setLinks(updatedLinks);
  };

  // SAVE LINKS TO DB (THIS IS THE TRUE SAVE THE REST ARE TO UPDATE THE LOCAL STATE)
  const handleSaveLinks = () => {
    const validLinks = links?.filter((link) => link.url && link.title);
    if (validLinks && validLinks?.length === links?.length) {
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
    <div className="" ref={containerRef}>
      <div className="rounded-t-xl bg-white p-6 md:p-10">
        <div className="space-y-2">
          <Heading variant="h1">Customize your links</Heading>
          <Paragraph>
            Add/edit/remove links below and then share with the world!
          </Paragraph>
        </div>

        <div className="stick top-0 z-20 bg-white py-6">
          <Button variant="secondary" className="" onClick={handleAddNewLink}>
            + Add new link
          </Button>
        </div>

        {/* links */}

        {links && links?.length > 0 ? (
          <div className="space-y-6">
            {/* <Reorder.Group values={links} onReorder={setLinks}>
              {links.map((link, index) => (
                <Reorder.Item key={link} value={link} className="my-4 relative">
                  <LinkCard
                    index={index}
                    key={link.id}
                    link={link}
                    updateLink={handleLinkUpdate}
                    deleteLink={handleRemoveLink}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group> */}
            <LinkCardContainer
              links={links}
              setLinks={setLinks}
              updateLink={handleLinkUpdate}
              deleteLink={handleRemoveLink}
            />
          </div>
        ) : (
          <Intro />
        )}
      </div>

      {/* save button */}
      <div className="sticky bottom-0 mt-1 flex w-full rounded-b-xl bg-white p-6 md:px-10">
        <Button
          className="ml-auto mr-0 md:w-fit"
          disabled={areLinksEqual(links, linksFromDb) && !isLinksSaving}
          onClick={handleSaveLinks}
          loading={isLinksSaving}
        >
          Save links
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
