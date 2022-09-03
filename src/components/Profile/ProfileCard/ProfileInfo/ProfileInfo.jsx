import { Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileInfo.scss";
import { doAFollow, doAnUnfollow } from "../../../../features/auth/authSlice";
import FollowBtn from "../../../Sys/FollowBtn/FollowBtn";

const API_URL = process.env.REACT_APP_API_URL;

const ProfileInfo = ({ info, setEdit }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <section className="ProfileInfo">
      <div className="ProfileInfo__Top">
        {info.img ? (
          <Avatar size={100} src={info.img} />
        ) : (
          <Avatar size={100} style={{ fontSize: "4rem" }}>
            {info.username.substring(0, 1)}
          </Avatar>
        )}
        <h2>{info.username}</h2>
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
