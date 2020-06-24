import {
  LOGIN_START,
  LOGIN_SUCCESSS,
  LOGIN_FAILURE,
  ADD_STUDENT,
  Add,
} from "../actions";
const initalUser = {
  username: "",
  id: 0,
  subject: "",
  refresh: false,
};
const UserReducer = (state = initalUser, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state };
    case LOGIN_SUCCESSS:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        subject: action.payload.subject,
        refresh: !state.refresh,
      };
    case LOGIN_FAILURE:
      return { ...state };

    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
