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
                        <Link to="/">
                            <Button className={'logout'} onClick={handleLogOut}>Log out</Button>
                        </Link>
                        <p>{user.name}</p>
                        <img src={user.avatar} className="avatar" alt="Avatar" />
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header