import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, Dropdown, Space } from 'antd';
import { LogoutOutlined , UserOutlined , DownOutlined, ToolOutlined} from '@ant-design/icons';
import { logout } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'
import './NavBar.scss'


const NavBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <nav className="NavBar">
      <div className="NavBar__bar">
        {user?
          <Link to={'/'}>
            <h2>Cantastik</h2>
          </Link>
          :
          <h2>Cantastik</h2>
        }
        {user
        ?<div>
          <Dropdown
          overlay={
            <Menu
            items={[
              {
                key: '1',
                label: (
                  <Link to={`/profile/${user._id}`}>
                    Mi perfil
                  </Link>
                ),
                icon: <UserOutlined />,
              },
              {
                key: '2',
                label: (
                  <Link to={`/profile/${user._id}`}>
                    Editar perfil
                  </Link>
                ),
                icon: <ToolOutlined />,
                disabled: true,
              },
              {
                key: '3',
                label: (
                  <span onClick={()=> dispatch(logout())}>
                    Cerrar sesión
                  </span>                  ),
                icon: <LogoutOutlined/>
              }
            ]}/>
          } 
          trigger={['click']}
          placement="bottomRight">
            <a onClick={e => e.preventDefault()}>
              <Space>
                {user.img?<Avatar src={`http://localhost:8080/porfile/${user.img}`}/>:<Avatar>{user.username.substring(0,1)}</Avatar>}
                <DownOutlined style={{color:'black'}} />
              </Space>
            </a>
          </Dropdown>
        </div>
        :null}
      </div>
    </nav>
  )
}

export default NavBar