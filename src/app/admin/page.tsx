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
import Intro from "@/components/admin/links/Intro";
import { areLinksEqual, useLinkContext } from "@/context/LinkContext";
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
      <div className="px-4 lg:p-0">
        <div className="grid h-[80vh] w-full place-content-center rounded-xl bg-white lg:h-screen lg:rounded-none">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 lg:p-0" ref={containerRef}>
      <div className="min-h-screen rounded-t-xl bg-white p-6 dark:bg-gray lg:rounded-none lg:pt-14 lg:dark:bg-darkGray">
        <div className="space-y-2">
          <Heading variant="h1">Customize your links</Heading>
          <Paragraph>
            Add/edit/remove links below and then share with the world!
          </Paragraph>
        </div>

        <div className="sticky top-0 z-20 bg-white py-6 dark:bg-gray lg:dark:bg-darkGray">
          <Button variant="secondary" className="" onClick={handleAddNewLink}>
            + Add new link
          </Button>
        </div>

        {/* links */}

        {links && links?.length > 0 ? (
          <div className="mt-1 space-y-6">
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

        <div className="sticky bottom-0 hidden lg:block lg:pb-0">
          <div className="w-full border-t bg-white p-6 pr-0 dark:bg-gray lg:dark:bg-darkGray">
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
      </div>

      {/* save button */}
      <div className="sticky bottom-0 border-t-2 bg-lightestGray pb-4 dark:bg-darkGray lg:hidden lg:border-none lg:bg-white">
        <div className="mt-1 w-full rounded-b-xl bg-white p-6 dark:bg-gray md:px-10 lg:px-6">
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
    </div>
  );
};

export default Dashboard;
