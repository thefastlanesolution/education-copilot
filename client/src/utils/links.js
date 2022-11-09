import { IoHome, IoColorWand } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'Dashboard', path: '/', icon: <IoHome /> },
  { id: 2, text: 'Workshop', path: 'all-students', icon: <IoColorWand /> },
  // {
  //   id: 5,
  //   text: 'Email Generator',
  //   path: 'parent-emails',
  //   icon: <ImProfile />,
  // },
  // {
  //   id: 6,
  //   text: 'Lesson Planner',
  //   path: 'lesson-planner',
  //   icon: <ImProfile />,
  // },
  // { id: 3, text: 'add student', path: 'add-student', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
