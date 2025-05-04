import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/NewUser/LogIn";
import Reg from "./pages/NewUser/Reg";
import WelcomeBack from "./pages/WelcomeBack";
import Edit from "./pages/Editor/Edit";
import Story from "./pages/Publication/Story";
import NotFound from "./pages/Error/NotFound";
import Focus from "./pages/Publication/Focus";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/register" element={<Reg />} />
      
      <Route path="/welcome/:name" element={<WelcomeBack />} />
      <Route path="/home" element={<Home />} />

      <Route path="/story/:id" element={<Story />} />
      <Route path="/story/:id/focus" element={<Focus />} />
      
      <Route path="/edit/:title" element={<Edit />} />
      
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default App;
