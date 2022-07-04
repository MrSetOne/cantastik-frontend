import { Avatar } from 'antd'

const ProfileInfo = ({info}) => {
  return (
    <section className="ProfileInfo">
        {info.img?<Avatar src={`http://localhost:8080/porfile/${info.img}`}/>:<Avatar>{info.username.substring(0,1)}</Avatar>}
        <h2>{info.username}</h2>
        <p>Aquí iría la descripcion que quisiera poner el usuario, esta funcionalidad un no está disponible en el backEnd</p>
    </section>
  )
}

export default ProfileInfo