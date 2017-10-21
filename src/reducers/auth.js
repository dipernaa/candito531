import { LOGIN } from '../constants/actionTypes';

export const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.request:
      return {
        ...state,
        isLoading: true
      };

    case LOGIN.failure:
      return {
        ...state,
        isLoading: false
      };

    case LOGIN.success:
      return {
        ...state,
        user: action.data.user,
        isLoggedIn: true,
        isLoading: false
      };

    default:
      return state;
  }
};
