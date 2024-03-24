import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import UserContext from "./contexts/userContext";
import UserRoutes from  './routes/UserRoutes';
import AdminRoutes from  './routes/AdminRoutes';
import AuthRoutes from  './routes/AuthRoutes';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState();
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user ? (user.role === 'customer' ? <UserRoutes /> : <AdminRoutes />) : <AuthRoutes />}
    </UserContext.Provider>
  );
}

export default App;
