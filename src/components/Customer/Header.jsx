import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../../contexts/userContext"
import '../../styles/Header.scss'


function Header() {
    const {user} = useContext(UserContext)

  return (
    <header>
        <nav>
            <div className="container">
                <ul>
                    <li>
                        <Link to="/">
                            Products
                        </Link>
                    </li>
                    <li>
                        <p>{user.name}</p>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header