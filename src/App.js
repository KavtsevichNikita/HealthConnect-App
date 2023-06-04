import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./pages/Home/home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
