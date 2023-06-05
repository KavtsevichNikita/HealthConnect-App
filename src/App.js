import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./pages/Home/home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import DoctorForm from "./pages/DoctorForm/DoctorForm";

function App() {

  const { loading } = useSelector(state => state.loader)

  return (
    <div>
      { loading && <Spinner/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes> <Home/> </ProtectedRoutes>}/>
          <Route path="/profile" element={<ProtectedRoutes> <Profile/> </ProtectedRoutes>}/>
          <Route path="/apply-doctor" element={<ProtectedRoutes> <DoctorForm/> </ProtectedRoutes>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
