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
import TestEditor from "./pages/Editor/TestEditor";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Reg />} />
      <Route path="/profile/:mark" element={<Profile />} />
      <Route path="/welcome/:name" element={<WelcomeBack />} />

      <Route path="/story/:id" element={<Story />} />
      <Route path="/story/:id/focus" element={<Focus />} />

      <Route path="/edit/:title" element={<Edit />} />
      <Route path="/test" element={<TestEditor />} />

      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default App;
