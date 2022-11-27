import { IoHome, IoColorWand } from 'react-icons/io5';
import { ImProfile, ImHistory } from 'react-icons/im';

const links = [
  { id: 1, text: 'Dashboard', path: '/', icon: <IoHome /> },
  { id: 2, text: 'Workshop', path: 'workshop-tools', icon: <IoColorWand /> },
  { id: 4, text: 'History', path: 'history', icon: <ImHistory /> },
  { id: 3, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
