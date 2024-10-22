import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaFreeCodeCamp,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaPinterest,
  FaStackOverflow,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { FaHashnode, FaLink } from 'react-icons/fa6';
import { PiDevToLogo } from 'react-icons/pi';
import { SiCodewars, SiFrontendmentor } from 'react-icons/si';

export const options = [
  { value: 'github', label: 'Github', icon: FaGithub },
  {
    value: 'frontend mentor',
    label: 'Frontend Mentor',
    icon: SiFrontendmentor,
  },
  { value: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
  { value: 'medium', label: 'Medium', icon: FaMedium },
  { value: 'behance', label: 'Behance', icon: FaBehance },
  { value: 'dribbble', label: 'Dribbble', icon: FaDribbble },
  { value: 'pinterest', label: 'Pinterest', icon: FaPinterest },
  { value: 'facebook', label: 'Facebook', icon: FaFacebook },
  { value: 'twitter', label: 'Twitter', icon: FaTwitter },
  { value: 'instagram', label: 'Instagram', icon: FaInstagram },
  { value: 'twitch', label: 'Twitch', icon: FaTwitch },
  { value: 'youtube', label: 'YouTube', icon: FaYoutube },
  { value: 'dev.to', label: 'Dev.to', icon: PiDevToLogo },
  { value: 'code wars', label: 'Codewars', icon: SiCodewars },
  { value: 'freecodecamp', label: 'FreeCodeCamp', icon: FaFreeCodeCamp },
  { value: 'gitlab', label: 'Gitlab', icon: FaGitlab },
  { value: 'hashnode', label: 'HashNode', icon: FaHashnode },
  { value: 'stack overflows', label: 'Stack Overflow', icon: FaStackOverflow },
  { value: 'custom link', label: 'Custom Link', icon: FaLink },
];
