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
  NEW_COMPLETION_BEGIN,
  NEW_COMPLETION_SUCCESS,
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

import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userSchool: action.payload.school,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userSchool: '',
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userSchool: action.payload.school,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editStudentId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      studentEmail: '',
      parentFirstName: '',
      parentLastName: '',
      parentEmail: '',
      parentPhone: '',
      status: 'active',
    };

    return {
      ...state,
      ...initialState,
    };
  }

  // Completion Reducer

  if (action.type === NEW_COMPLETION_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === NEW_COMPLETION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  // Create student reducer

  if (action.type === CREATE_STUDENT_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_STUDENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Student Created!',
    };
  }
  if (action.type === CREATE_STUDENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_STUDENTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_STUDENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      students: action.payload.students,
      totalStudents: action.payload.totalStudents,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_STUDENT) {
    const student = state.students.find(
      student => student._id === action.payload.id
    );
    const {
      _id,
      firstName,
      lastName,
      birthDate,
      studentEmail,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentPhone,
      status,
    } = student;
    return {
      ...state,
      isEditing: true,
      editStudentId: _id,
      firstName,
      lastName,
      birthDate,
      studentEmail,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentPhone,
      status,
    };
  }
  if (action.type === DELETE_STUDENT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_STUDENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_STUDENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Student Updated!',
    };
  }
  if (action.type === EDIT_STUDENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest',
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
