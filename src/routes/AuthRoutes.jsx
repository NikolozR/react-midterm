import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import AuthLayout from "../components/Auth/AuthLayout";
import Register from "../pages/Register";
function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registration" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AuthRoutes;
