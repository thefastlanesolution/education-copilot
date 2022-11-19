import { useState } from 'react';
import { FormRow, Alert } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/DashboardFormPage';
const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [school, setSchool] = useState(user?.school);
  const [gradeLevel, setGradeLevel] = useState(user?.gradeLevel);
  const [subject, setSubject] = useState(user?.subject);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !lastName || !school) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, school, gradeLevel, subject });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>teacher profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="First Name"
            name="name"
            value={name}
            handleChange={e => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={e => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={e => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="school"
            value={school}
            handleChange={e => setSchool(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="Grade Level"
            name="gradeLevel"
            value={gradeLevel}
            handleChange={e => setGradeLevel(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="Subject's Taught"
            name="subject"
            value={subject}
            handleChange={e => setSubject(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
