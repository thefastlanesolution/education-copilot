import React, { useReducer, useContext } from 'react';

import reducer from './reducer';
import axios from 'axios';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  TOGGLE_SIDEBAR,
  CLEAR_VALUES,
  CREATE_STUDENT_BEGIN,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_ERROR,
  GET_STUDENTS_BEGIN,
  GET_STUDENTS_SUCCESS,
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
        console.log('401 Error');
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

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // Creates a Student in the MongoDB Database
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
      console.log('Error getting students');
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        clearValues,
        createStudent,
        getStudents,
        toggleSidebar,
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
