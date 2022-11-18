import { IoHome, IoColorWand } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'Dashboard', path: '/', icon: <IoHome /> },
  { id: 2, text: 'Workshop', path: 'all-students', icon: <IoColorWand /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
