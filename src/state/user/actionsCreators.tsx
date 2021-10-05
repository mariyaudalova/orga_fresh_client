import { Dispatch } from "redux";

import { User, ResponseState } from "../../common/types";
import { loginUser, logoutUser } from "./actions";

export const loginCreator =
  (user: ResponseState<User>) => (dispatch: Dispatch) => {
    dispatch(loginUser(user));
  };

export const logoutCreator = () => (dispatch: Dispatch) => {
  dispatch(logoutUser());
};
