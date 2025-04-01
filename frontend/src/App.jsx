import LogIn from "./pages/LogIn";
import Reg from "./pages/Reg";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/reg" element={<Reg />} />
      </Routes>
  );
}

export default App;
