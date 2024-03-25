import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Customer/Layout";
import Products from "../pages/Products";
import Error from "../pages/Error";

function UserRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customer" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default UserRoutes;
