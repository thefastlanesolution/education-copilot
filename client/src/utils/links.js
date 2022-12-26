import { IoHome, IoColorWand } from 'react-icons/io5';
import { ImProfile, ImHistory } from 'react-icons/im';

const links = [
  { id: 1, text: 'Dashboard', path: '/', icon: <IoHome /> },
  // { id: 5, text: 'Unit Planner', path: 'unit-planner', icon: <IoColorWand /> },
  { id: 2, text: 'Workshop', path: 'workshop', icon: <IoColorWand /> },
  { id: 3, text: 'History', path: 'creations', icon: <ImHistory /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
