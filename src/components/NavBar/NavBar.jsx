import { useDispatch, useSelector } from "react-redux";
import { Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../features/auth/authSlice'

const NavBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  return (
    <nav className="NavBar" style={{display:"flex"}}>
        <h2>Cantastik</h2>
        {user
        ?<>
          <Avatar>{user.username.substring(0,1)}</Avatar>
          <LogoutOutlined onClick={()=> dispatch(logout())}/>
        </>
        :null}
    </nav>
  )
}

export default NavBar