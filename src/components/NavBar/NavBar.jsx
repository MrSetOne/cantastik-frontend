import { useDispatch, useSelector } from "react-redux";
import { Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';



const NavBar = () => {

    const { user } = useSelector((state) => state.auth)










  return (
    <nav className="NavBar">
        {user?<Avatar>{user.username.substring(0,1)}</Avatar>:null}
        {user?<LogoutOutlined onClick={()=>console.log("holi")}/>:null}
    </nav>
  )
}

export default NavBar