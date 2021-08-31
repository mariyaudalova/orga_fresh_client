import { loginUser, logoutUser } from "./actions";
import { User, ResponseState } from "../../common/types";
import { Dispatch } from "redux";

export const loginCreator =
  (user: ResponseState<User>) => (dispatch: Dispatch) => {
    dispatch(loginUser(user));
  };

export const logoutCreator = () => (dispatch: Dispatch) => {
  dispatch(logoutUser());
};
