import { IoHome, IoColorWand, IoCalendar } from 'react-icons/io5';
import { ImProfile, ImHistory } from 'react-icons/im';

const links = [
  { id: 1, text: 'Dashboard', path: '/', icon: <IoHome /> },

  {
    id: 2,
    text: 'unit planner',
    path: 'unit-planner',
    icon: <IoCalendar />,
  },
  { id: 3, text: 'Workshop', path: 'workshop', icon: <IoColorWand /> },
  { id: 4, text: 'History', path: 'creations', icon: <ImHistory /> },
  { id: 5, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
