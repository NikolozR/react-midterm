import { Link } from "react-router-dom"
import { useContext } from "react"
import Button from '../Button'
import UserContext from "../../contexts/userContext"
import '../../styles/Header.scss'


function Header() {
    const {user, setUser} = useContext(UserContext)

    const handleLogOut = () => {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('refresh_token')
        sessionStorage.removeItem('user')
        setUser(null)
    }

  return (
    <header>
        <nav>
            <div className="container">
                <ul>
                    <li>
                        <Link to="/customer/products">
                            Products
                        </Link>
                    </li>
                    <li>
                        <p>{user.name}</p>
                        <img src={user.avatar} className="avatar" alt="Avatar" />
                    </li>
                    <li>
                        <Link to="/">
                            <Button onClick={handleLogOut}>Log out</Button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header