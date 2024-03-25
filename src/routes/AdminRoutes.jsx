import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '../components/Admin/Layout';
import Products from '../pages/Products';
import Product from '../pages/Product';
import Error from '../pages/Error';

function AdminRoutes() {    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AdminRoutes