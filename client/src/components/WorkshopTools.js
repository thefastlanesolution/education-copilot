import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Student from './Tool';
import Wrapper from '../assets/wrappers/WorkshopTools';
import PageBtnContainer from './PageBtnContainer';
import { ImMagicWand } from 'react-icons/im';

const JobsContainer = () => {
  const {
    getStudents,
    students,
    isLoading,
    page,
    totalStudents,
    search,
    searchStatus,
    sort,
    numOfPages,
  } = useAppContext();
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, [page, search, searchStatus, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (students.length === 0) {
    return (
      <Wrapper>
        <h2>No students to display...</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <div className="pageheader">
        {<ImMagicWand className="historyicon" />} Workshop Tools
      </div>
      <Wrapper>
        <h5>
          {totalStudents} tool{students.length > 1 && 's'} found
        </h5>
        <div className="jobs">
          {students.map(student => {
            return <Student key={student._id} {...student} />;
          })}
        </div>
        {/* {numOfPages > 1 && <PageBtnContainer />} */}
      </Wrapper>
    </>
  );
};

export default JobsContainer;
