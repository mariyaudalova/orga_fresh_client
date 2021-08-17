import { User, ResponseState } from "../../common/types";

export const loginUser = (user: ResponseState<User>) => {
  return {
    type: "LOGIN",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};
