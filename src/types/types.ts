export type LinkType = {
  id: string;
  url: string;
  title: string;
};

export type LinkCardProps = {
  index: number;
  link: LinkType;
  updateLink: (link: LinkType) => void;
  deleteLink: (link: LinkType) => void;
};

export type ProfileFormData = {
  profilePicture: File;
  firstName: string;
  lastName: string;
  email?: string;
};

export type ProfileDetails = {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email?: string;
};