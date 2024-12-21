"use client";
import Button from "@/components/Button";
import Heading from "@/components/text/Heading";
import Paragraph from "@/components/text/Paragraph";
import { useAuthContext } from "@/context/AuthContext";
import { LinkType } from "@/types/types";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import useConfirmPageLeave from "@/custom-hooks/useConfirmPageLeave";
import Intro from "@/components/admin/links/Intro";
import { areLinksEqual, useLinkContext } from "@/context/LinkContext";
import LinkCardContainer from "@/components/admin/links/LinkCardContainer";
import Confirm from "@/components/Confirm";

const Dashboard = () => {
  const { links, setLinks, linksFromDb, saveLinks, loading, isLinksSaving } =
    useLinkContext();
  const { user } = useAuthContext();
  const [showUndoConfirmation, setShowUndoConfirmation] =
    useState<boolean>(false);

  // Confirm before leaving if there are unsaved changes to links
  useConfirmPageLeave(!areLinksEqual(links, linksFromDb));

  // Ref to scroll to the container when a new link is added
  const containerRef = useRef<HTMLDivElement>(null);

  // Add a new link with a unique ID
  const handleAddNewLink = () => {
    const uniqueId = `${Math.floor(Date.now() + Math.random() * 10000)}`;
    const newLink = {
      id: uniqueId,
      url: "",
      title: "",
      isVisible: true,
      icon: "",
    };
    if (links) {
      setLinks([...links, newLink]);
    }

    // Scroll to the newly added link
    setTimeout(() => {
      if (containerRef.current) {
        window.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Update a specific link in the local state
  const handleLinkUpdate = (updatedLink: LinkType) => {
    const updatedLinks = links?.map((link) =>
      link.id === updatedLink.id ? updatedLink : link,
    );
    if (updatedLinks) {
      setLinks(updatedLinks);
    }
  };

  // Remove a link from the local state
  const handleRemoveLink = (linkId: string) => {
    const updatedLinks = links?.filter(
      (link) => link.id !== linkId,
    ) as LinkType[];
    setLinks(updatedLinks);
  };

  // Save links to the database after validating input
  const handleSaveLinks = () => {
    const validLinks = links?.filter((link) => link.url && link.title);
    if (validLinks && validLinks.length === links?.length) {
      saveLinks(validLinks);
    } else {
      toast.warning("Please fill in all fields or remove incomplete links");
    }
  };

  const handleUndoChanges = () => {
    setLinks(linksFromDb);
    setShowUndoConfirmation(false)
  };

  // Show a loading state if the user data is loading or user is not authenticated
  if (!user || loading) {
    return (
      <div className="px-4 lg:p-0">
        <div className="grid h-[80vh] w-full place-content-center rounded-xl bg-white dark:bg-deepNavy lg:h-screen lg:rounded-none">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 lg:p-0" ref={containerRef}>
      <div className="lg:min-h-screen rounded-t-xl border border-transparent bg-white p-6 dark:border-lightestGray/50 dark:bg-transparent lg:rounded-none lg:border-none lg:pt-14">
        {/* Header */}
        <div className="space-y-2">
          <Heading variant="h1">Customize your links</Heading>
          <Paragraph>
            Add/edit/remove links below and then share with the world!
          </Paragraph>
        </div>

        {/* Add new link button */}
        <div className="sticky top-0 z-[1] bg-white py-6 dark:bg-deepNavy">
          <Button variant="secondary" onClick={handleAddNewLink}>
            + Add new link
          </Button>
        </div>

        {/* Links container */}
        {links && links.length > 0 ? (
          <div className="lg:max-w-[700px mx-auto mt-1 space-y-6">
            <LinkCardContainer
              links={links}
              linksFromDb={linksFromDb}
              setLinks={setLinks}
              updateLink={handleLinkUpdate}
              deleteLink={handleRemoveLink}
            />
          </div>
        ) : (
          // Show intro if no links exist
          <Intro />
        )}
      </div>

      {/* footer */}
      {linksFromDb?.length !== 0 && links?.length !== 0 && (
        <div className="sticky bottom-0 border-t bg-lightestGray pb-4 dark:bg-deepNavy lg:border-none lg:bg-white lg:pb-0">
          <div className="mt-1 flex w-full flex-col gap-2 rounded-b-xl border border-transparent bg-white p-6 dark:border-lighterGray/30 dark:bg-deepNavy sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:rounded-none lg:border-x-0 lg:border-b-0">
            {!areLinksEqual(links, linksFromDb) && linksFromDb && (
              <Button
                variant="secondary"
                className="sm:w-fit"
                onClick={() => setShowUndoConfirmation(true)}
              >
                Undo changes
              </Button>
            )}
            <Button
              className="ml-auto mr-0 sm:w-fit"
              disabled={areLinksEqual(links, linksFromDb) && !isLinksSaving}
              onClick={handleSaveLinks}
              loading={isLinksSaving}
            >
              Save links
            </Button>
          </div>
        </div>
      )}
      <Confirm
        variant="serious"
        isOpen={showUndoConfirmation}
        acceptAction={handleUndoChanges}
        rejectAction={() => setShowUndoConfirmation(false)}
        header="Confirm Undo Changes"
        content="Are you sure you want to undo changes to your link collection? All unsaved edits will be lost."
      />
    </div>
  );
};

export default Dashboard;
