import { createContext, useCallback, useEffect, useReducer } from "react";
import API, { setAuthToken } from "../services";

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
    case "USER_UPDATE":
      return {
        ...state,
        ...payload,
      };
    case "SUCCESS_REGISTER":
    case "SUCCESS_LOGIN":
      const { token, user } = payload;
      localStorage.setItem("usrtkn", token);
      setAuthToken(token);
      return {
        ...state,
        user,
        isLogin: true,
        token,
      };
    case "USER_LOGOUT":
      localStorage.removeItem("usrtkn");
      localStorage.removeItem("path");
      setAuthToken(null);
      return {
        user: null,
        isLogin: false,
        cart: 0,
        token: null,
      };
    case "CART_INCREMENT":
      return {
        ...state,
        cart: state.cart + 1,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: payload?.cartCount,
      };
    default:
      break;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCart = useCallback(async () => {
    const { data } = await API.get("/carts");
    let count = 0;

    data?.data?.carts?.forEach((cart) => (count += cart?.qty));

    dispatch({
      type: "UPDATE_CART",
      payload: { cartCount: count },
    });
  }, []);

  useEffect(() => {
    if (state?.isLogin) {
      getCart();
    }
  }, [state?.isLogin, getCart]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
