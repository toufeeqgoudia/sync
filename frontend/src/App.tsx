import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import RegCreateBoard from "./Pages/Register/RegCreateBoard";
import RegCreateList from "./Pages/Register/RegCreateList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <AuthProvider>
          <ProtectedRoute>
            <Routes>
              <Route path="/register/create-board" element={<RegCreateBoard />} />
              <Route path="/register/create-list" element={<RegCreateList />} />
            </Routes>
          </ProtectedRoute>
          </AuthProvider>
        }
      />
    </Routes>
  );
};

export default App;
