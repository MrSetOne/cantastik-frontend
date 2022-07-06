import { Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import CreatePost from "./CreatePost/CreatePost";
import './NavBar.scss'
import NavBarMenu from "./NavBarMenu/NavBarMenu";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth)

  const [createPostVisible, setCreatePostVisible] = useState(false);


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
        ?<>
          <Button type="primary" onClick={()=>setCreatePostVisible(true)}>
            Crear Post
          </Button>
          <NavBarMenu/>
          <CreatePost visible={createPostVisible} setCreatePostVisible={setCreatePostVisible}/></>
        :null}
      </div>
    </nav>
  )
}

export default NavBar