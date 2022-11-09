import React, { useReducer, useContext } from 'react';

import reducer from './reducer';
import axios from 'axios';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_ERROR,
  GET_STUDENTS_BEGIN,
  GET_STUDENTS_SUCCESS,
  SET_EDIT_STUDENT,
  DELETE_STUDENT_BEGIN,
  EDIT_STUDENT_BEGIN,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userSchool = localStorage.getItem('school');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userSchool: userSchool || '',
  showSidebar: false,
  isEditing: false,
  editStudentId: '',
  position: '',
  company: '',
  gradeLevel: '',
  subject: '',
  statusOptions: ['active', 'not active', 'on leave'],
  status: 'active',
  students: [],
  totalStudents: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  authFetch.interceptors.request.use(
    config => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, school }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('school', school);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('school');
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, school, gradeLevel, subject } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, school, gradeLevel, subject, alertText },
      });
      addUserToLocalStorage({ user, token, school, gradeLevel, subject });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async currentUser => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);

      const { user, school, gradeLevel, subject, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, school, gradeLevel, subject, token },
      });
      addUserToLocalStorage({ user, school, gradeLevel, subject, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createStudent = async () => {
    dispatch({ type: CREATE_STUDENT_BEGIN });
    try {
      const {
        firstName,
        lastName,
        birthDate,
        studentEmail,
        parentFirstName,
        parentLastName,
        parentEmail,
        parentPhone,
        status,
      } = state;
      await authFetch.post('/students', {
        firstName,
        lastName,
        birthDate,
        studentEmail,
        parentFirstName,
        parentLastName,
        parentEmail,
        parentPhone,
        status,
      });
      dispatch({ type: CREATE_STUDENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      // If the error code = 401, then return the msg string from the data object inside the response
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_STUDENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // run the clearAlert function afterwards
    clearAlert();
  };

  const getStudents = async () => {
    const { page, search, searchStatus, sort } = state;

    let url = `/students?page=${page}&status=${searchStatus}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_STUDENTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { students, totalStudents, numOfPages } = data;
      dispatch({
        type: GET_STUDENTS_SUCCESS,
        payload: {
          students,
          totalStudents,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditStudent = id => {
    dispatch({ type: SET_EDIT_STUDENT, payload: { id } });
  };
  const editStudent = async () => {
    dispatch({ type: EDIT_STUDENT_BEGIN });

    try {
      const {
        firstName,
        lastName,
        birthDate,
        studentEmail,
        parentFirstName,
        parentLastName,
        parentEmail,
        parentPhone,
        status,
      } = state;
      await authFetch.patch(`/students/${state.editStudentId}`, {
        firstName,
        lastName,
        birthDate,
        studentEmail,
        parentFirstName,
        parentLastName,
        parentEmail,
        parentPhone,
        status,
      });
      dispatch({ type: EDIT_STUDENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_STUDENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteStudent = async studentId => {
    dispatch({ type: DELETE_STUDENT_BEGIN });
    try {
      await authFetch.delete(`/students/${studentId}`);
      getStudents();
    } catch (error) {
      logoutUser();
    }
  };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/students/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = page => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createStudent,
        getStudents,
        setEditStudent,
        deleteStudent,
        editStudent,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
