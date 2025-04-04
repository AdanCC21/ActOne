import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Reg from "./pages/Reg";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/register" element={<Reg />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
