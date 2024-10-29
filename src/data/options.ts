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
  { value: 'github', label: 'Github', icon: FaGithub, color: '#1A1A1A' },
  {
    value: 'frontend mentor',
    label: 'Frontend Mentor',
    icon: SiFrontendmentor,
    color: '#FFFFFF',
  },
  { value: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: '#2D68FF' },
  { value: 'medium', label: 'Medium', icon: FaMedium, color: '#BEBEBE' },
  { value: 'behance', label: 'Behance', icon: FaBehance, color: '#0056FF' },
  { value: 'dribbble', label: 'Dribbble', icon: FaDribbble, color: '#B8509A' },
  {
    value: 'pinterest',
    label: 'Pinterest',
    icon: FaPinterest,
    color: '#E60023',
  },
  { value: 'facebook', label: 'Facebook', icon: FaFacebook, color: '#2442AC' },
  { value: 'twitter', label: 'Twitter', icon: FaTwitter, color: '#43B7E9' },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    color: '#FD2AB6',
  },
  { value: 'twitch', label: 'Twitch', icon: FaTwitch, color: '#EE3FC8' },
  { value: 'youtube', label: 'YouTube', icon: FaYoutube, color: '#EE3939' },
  { value: 'dev.to', label: 'Dev.to', icon: PiDevToLogo, color: '#333333' },
  { value: 'code wars', label: 'Codewars', icon: SiCodewars, color: '#8A1A50' },
  {
    value: 'freecodecamp',
    label: 'FreeCodeCamp',
    icon: FaFreeCodeCamp,
    color: '#302267',
  },
  { value: 'gitlab', label: 'Gitlab', icon: FaGitlab, color: '#EB4925' },
  { value: 'hashnode', label: 'HashNode', icon: FaHashnode, color: '#0330D1' },
  {
    value: 'stack overflows',
    label: 'Stack Overflow',
    icon: FaStackOverflow,
    color: '#EC7100',
  },
  {
    value: 'custom link',
    label: 'Custom Link',
    icon: FaLink,
    color: '#EE3939',
  },
];
