import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import Button from "../Button";

function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header>
      <nav>
        <div className="container">
          <ul>
            <li>
              <Link to="/admin/products">Products</Link>
              <Link to={"/admin/addProduct"}>Add Product</Link>
            </li>
            <li>
              <Link to="/">
                <Button className={"logout"} onClick={handleLogOut}>
                  Log out
                </Button>
              </Link>
              <div className="user">
                <p>{user.name}</p>
                <img src={user.avatar} className="avatar" alt="Avatar" />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
