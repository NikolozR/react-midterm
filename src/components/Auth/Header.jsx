import Button from "../Button";
import { Link } from "react-router-dom";
import '../../styles/Header.scss'
function Header() {
  return (
    <header>
      <nav>
        <div className="container">
            <ul>
                <li>
                    <Link to="/">
                        <Button className={'sign-in-btn'}>
                            Sign In
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/registration">
                        <Button className={'register-btn'}>
                            Register
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
