import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, Dropdown, Space } from 'antd';
import { LogoutOutlined , UserOutlined , DownOutlined, ToolOutlined} from '@ant-design/icons';
import { logout } from '../../../features/auth/authSlice'
import { Link } from 'react-router-dom'


const NavBarMenu = () => {
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    return (
        <div>
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
    )
}

export default NavBarMenu