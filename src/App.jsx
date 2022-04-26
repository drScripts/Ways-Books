import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  DetailBookPage,
  ComplainPage,
  ProfilePage,
  TransactionPage,
  AddBookPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/book/:id" element={<DetailBookPage />} />
      <Route path="/complain" element={<ComplainPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<TransactionPage />} />
      <Route path="/admin/complain" element={<ComplainPage isAdmin />} />
      <Route path="/admin/add-book" element={<AddBookPage />} />
    </Routes>
  );
}

export default App;
