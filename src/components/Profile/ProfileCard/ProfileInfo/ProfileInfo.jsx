import { Avatar, Button } from "antd";
import { useSelector } from "react-redux";

const ProfileInfo = ({ info, setEdit }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="ProfileInfo">
      {info.img ? (
        <Avatar src={`http://localhost:8080/porfile/${info.img}`} />
      ) : (
        <Avatar>{info.username.substring(0, 1)}</Avatar>
      )}
      {info._id === user._id ? (
        <Button type="primary" onClick={() => setEdit(true)}>
          Editar perfil
        </Button>
      ) : (
        <Button type="primary">Follow(NW)</Button> //*AQUI VA UN BOOLEANO CON EL SISTEMA DE FOLLOW
      )}
      <h2>{info.username}</h2>
      <p>
        Aquí iría la descripcion que quisiera poner el usuario, esta
        funcionalidad un no está disponible en el backEnd
      </p>
    </section>
  );
};

export default ProfileInfo;
