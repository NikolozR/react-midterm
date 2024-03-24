import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
function AuthRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}>

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AuthRoutes