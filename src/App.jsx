import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import AdminMiddleware from "./middleware/AdminMiddleware";
import AuthMiddleware from "./middleware/AuthMiddleware";
import MainMiddleware from "./middleware/MainMiddleware";
import {
  LandingPage,
  DetailBookPage,
  ComplainPage,
  ProfilePage,
  TransactionPage,
  AddBookPage,
  ListBookPage,
  CartPage,
  EditProfile,
  ComplainAdminPage,
  HistoryTransactionPage,
} from "./pages";
import API, { setAuthToken } from "./services";

if (localStorage.getItem("usrtkn")) {
  setAuthToken(localStorage.getItem("usrtkn"));
}

function App() {
  const { pathname } = useLocation();

  if (pathname !== "/") {
    localStorage.setItem("path", pathname);
  }

  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    const checkProfile = async () => {
      const { data, status } = await API.get("/profile").catch(
        (err) => err.response
      );
      // console.clear();

      if (status === 200) {
        const user = data?.data?.user;
        const token = localStorage.getItem("usrtkn");

        dispatch({
          type: "SUCCESS_LOGIN",
          payload: { user, token },
        });
      } else {
        setAuthToken(null);
      }
    };
    checkProfile();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainMiddleware />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route element={<AuthMiddleware />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/book/:id" element={<DetailBookPage />} />
        <Route path="/complain" element={<ComplainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path={"/profile/edit"} element={<EditProfile />} />
        <Route
          path="/history-transaction"
          element={<HistoryTransactionPage />}
        />
      </Route>
      <Route path="/admin" element={<AdminMiddleware />}>
        <Route index element={<TransactionPage />} />
        <Route path="/admin/complain" element={<ComplainAdminPage />} />
        <Route path="/admin/books" element={<ListBookPage />} />
        <Route path="/admin/add-book" element={<AddBookPage />} />
      </Route>
    </Routes>
  );
}

export default App;
