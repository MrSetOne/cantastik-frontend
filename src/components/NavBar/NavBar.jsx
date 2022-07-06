import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import './NavBar.scss'
import NavBarMenu from "./NavBarMenu/NavBarMenu";

const NavBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <nav className="NavBar">
      <div className="NavBar__bar" style={{width:user?"min(95vw, 130rem)":"95vw"}}>
        {user?
          <Link to={'/'}>
            <h2>Cantastik</h2>
          </Link>
          :
          <h2>Cantastik</h2>
        }
        {user
        ?<NavBarMenu/>
        :null}
      </div>
    </nav>
  )
}

export default NavBar