import { User, ResponseState } from "../../common/types";

const initialState = {
  isLoading: false,
  error: "",
  data: null,
};

interface Action {
  type: string;
  payload: ResponseState<User>;
}

interface State {
  data: User | null;
}

const login = (state: State, action: Action) => {
  return { ...state, ...action.payload };
};

export const userState = (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return login(state, action);
    case "LOGOUT":
      return { ...state, data: null };
    default:
      return state;
  }
};
