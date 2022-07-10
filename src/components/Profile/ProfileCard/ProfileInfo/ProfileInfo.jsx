import { Avatar, Button } from "antd";
import { useSelector } from "react-redux";
import "./ProfileInfo.scss";

const ProfileInfo = ({ info, setEdit }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="ProfileInfo">
      <div className="ProfileInfo__Top">
        {info.img ? (
          <Avatar
            size={100}
            src={`http://localhost:8080/porfile/${info.img}`}
          />
        ) : (
          <Avatar size={100}>{info.username.substring(0, 1)}</Avatar>
        )}
        <h2>{info.username}</h2>
        {info._id === user._id ? (
          <Button type="primary" onClick={() => setEdit(true)}>
            Editar perfil
          </Button>
        ) : (
          <Button type="primary">Follow(NW)</Button> //*AQUI VA UN BOOLEANO CON EL SISTEMA DE FOLLOW
        )}
      </div>
      <p>
        Aquí iría la descripcion que quisiera poner el usuario, esta
        funcionalidad un no está disponible en el backEnd
      </p>
    </section>
  );
};

export default ProfileInfo;
