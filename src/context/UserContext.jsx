import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  user: null,
  isLogin: false,
  cart: 0,
  token: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SUCCESS_LOGIN":
      break;

    default:
      break;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
