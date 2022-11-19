import { FormRow, FormRowSelect, Alert } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/DashboardFormPage';

const AddStudent = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    firstName,
    lastName,
    birthDate,
    studentEmail,
    parentFirstName,
    parentLastName,
    parentEmail,
    parentPhone,
    status,
    statusOptions,
    clearValues,
    handleChange,
    createStudent,
    editJob,
  } = useAppContext();

  const handleSubmit = e => {
    e.preventDefault();

    if (!firstName || !lastName) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createStudent();
  };
  const handleJobInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit student' : 'add student'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* student firstname */}
          <FormRow
            type="text"
            labelText="Student's First Name"
            name="firstName"
            value={firstName}
            handleChange={handleJobInput}
          />
          {/* student lastname */}
          <FormRow
            type="text"
            labelText="Student's Last Name"
            name="lastName"
            value={lastName}
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type="date"
            labelText="Student's Birthday"
            name="birthDate"
            value={birthDate}
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type="text"
            labelText="Student's Email"
            name="studentEmail"
            value={studentEmail}
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type="text"
            labelText="Guardian's First Name"
            name="parentFirstName"
            value={parentFirstName}
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type="text"
            labelText="Guardian's Last Name"
            name="parentLastName"
            value={parentLastName}
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type="text"
            labelText="Guardian's Email"
            name="parentEmail"
            value={parentEmail}
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type="text"
            labelText="Guardian Phone Number"
            name="parentPhone"
            value={parentPhone}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            labelText="Student's"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={e => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddStudent;
