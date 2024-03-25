import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../components/Auth/Layout";
import Register from "../pages/Register";
function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="registration" element={<Register />} />
          <Route path="*" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AuthRoutes;
