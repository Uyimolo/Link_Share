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

  // Show a loading state if the user data is loading or user is not authenticated
  if (!user || loading) {
    return (
      <div className="px-4 lg:p-0">
        <div className="grid h-[80vh] w-full place-content-center rounded-xl bg-white dark:bg-black lg:h-screen lg:rounded-none">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 lg:p-0" ref={containerRef}>
      <div className="min-h-screen rounded-t-xl border border-transparent bg-white p-6 dark:border-lightestGray/50 dark:bg-black lg:rounded-none lg:border-none lg:pt-14">
        {/* Header */}
        <div className="space-y-2">
          <Heading variant="h1">Customize your links</Heading>
          <Paragraph>
            Add/edit/remove links below and then share with the world!
          </Paragraph>
        </div>

        {/* Add new link button */}
        <div className="sticky top-0 z-20 bg-white py-6 dark:bg-black">
          <Button variant="secondary" onClick={handleAddNewLink}>
            + Add new link
          </Button>
        </div>

        {/* Links container */}
        {links && links.length > 0 ? (
          <div className="mx-auto mt-1 space-y-6 lg:max-w-[700px]">
            <LinkCardContainer
              links={links}
              setLinks={setLinks}
              updateLink={handleLinkUpdate}
              deleteLink={handleRemoveLink}
            />
          </div>
        ) : (
          // Show intro if no links exist
          <Intro />
        )}

        {/* Large screen footer */}
        <div className="sticky bottom-0 hidden lg:block lg:pb-0">
          <div className="flex w-full border-t bg-white p-6 px-0 dark:bg-black">
            {!areLinksEqual(links, linksFromDb) && linksFromDb && (
              <Button variant="secondary" onClick={() => setLinks(linksFromDb)}>
                Undo changes
              </Button>
            )}
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

      {/* Mobile footer */}
      <div className="sticky bottom-0 border-t-2 bg-lightestGray pb-4 dark:bg-black lg:hidden lg:border-none lg:bg-white">
        <div className="mt-1 w-full space-y-2 rounded-b-xl border border-transparent bg-white p-6 dark:border-lightestGray/50 dark:bg-black">
          {!areLinksEqual(links, linksFromDb) && linksFromDb && (
            <Button variant="secondary" onClick={() => setLinks(linksFromDb)}>
              Undo changes
            </Button>
          )}
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
