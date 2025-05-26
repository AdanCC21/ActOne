import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/User/LogIn";
import Reg from "./pages/User/Reg";
import WelcomeBack from "./pages/WelcomeBack";
import Edit from "./pages/Editor/Edit";
import Story from "./pages/Publication/Story";
import NotFound from "./pages/Error/NotFound";
import Focus from "./pages/Publication/Focus";
import Profile from "./pages/User/Profile";
import GenericError from "./pages/Error/GenericError";
import { useContext } from "react";
import { ThemeContext } from "./context/AppContext";

function App() {
  const {lightMode, setTheme} = useContext(ThemeContext)

  return (
    <div className={`${lightMode? 'text-black':'text-white'}`}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/profile/:mark" element={<Profile />} />
        <Route path="/welcome/:name" element={<WelcomeBack />} />

        <Route path="/story/:id" element={<Story />} />
        <Route path="/story/:id/focus" element={<Focus />} />

        <Route path="/edit/:title" element={<Edit />} />

        <Route path="/404" element={<NotFound />} />
        <Route path="/error" element={<GenericError />} />
      </Routes>
    </div>
  );
}

export default App;
