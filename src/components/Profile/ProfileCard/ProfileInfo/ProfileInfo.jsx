import { Avatar, Button } from "antd";
import { useSelector } from "react-redux";
import "./ProfileInfo.scss";
import FollowBtn from "../../../Sys/FollowBtn/FollowBtn";

const ProfileInfo = ({ info, setEdit }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="ProfileInfo">
      <div className="ProfileInfo__Top">
        <div className="ProfileInfo__Top--user">
          {info.img ? (
            <Avatar size={100} src={info.img} />
          ) : (
            <Avatar size={100} style={{ fontSize: "4rem" }}>
              {info.username.substring(0, 1)}
            </Avatar>
          )}
          <h2>{info.username}</h2>
        </div>
        {info._id === user._id ? (
          <Button type="primary" onClick={() => setEdit(true)}>
            Editar perfil
          </Button>
        ) : (
          <FollowBtn dest={info._id} />
        )}
      </div>
      <p>{info.bio}</p>
    </section>
  );
};

export default ProfileInfo;
