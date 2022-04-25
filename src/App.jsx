import { Route, Routes } from "react-router-dom";
import { LandingPage, DetailBookPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/book/:id" element={<DetailBookPage />} />
    </Routes>
  );
}

export default App;
