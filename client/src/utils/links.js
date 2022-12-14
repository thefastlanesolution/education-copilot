import { IoHome, IoColorWand } from 'react-icons/io5';
import { ImProfile, ImHistory } from 'react-icons/im';

const links = [
  { id: 1, text: 'Dashboard', path: '/', icon: <IoHome /> },
  { id: 2, text: 'Workshop', path: 'workshop', icon: <IoColorWand /> },
  { id: 3, text: 'History', path: 'creations', icon: <ImHistory /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  // { id: 5, text: 'creations', path: 'creations', icon: <ImHistory /> },
];

export default links;
