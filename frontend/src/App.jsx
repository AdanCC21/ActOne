import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Reg from "./pages/Reg";
import WelcomeBack from "./pages/WelcomeBack";
import Edit from "./pages/Edit";
import Story from "./pages/Story";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/register" element={<Reg />} />
      
      <Route path="/welcome/:name" element={<WelcomeBack />} />
      <Route path="/home" element={<Home />} />
      <Route path="/story" element={<Story />} />
      
      <Route path="/edit/:title" element={<Edit />} />
    </Routes>
  );
}

export default App;
