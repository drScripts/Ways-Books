import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  DetailBookPage,
  ComplainPage,
  ProfilePage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/book/:id" element={<DetailBookPage />} />
      <Route path="/complain" element={<ComplainPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin/complain" element={<ComplainPage isAdmin />} />
    </Routes>
  );
}

export default App;
