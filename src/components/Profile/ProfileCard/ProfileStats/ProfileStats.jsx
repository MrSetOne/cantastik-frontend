import { Avatar, Button, Empty, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  removeLike,
  doAFollow,
  doAnUnfollow,
} from "../../../../features/auth/authSlice";

import "./ProfileStats.scss";
const API_URL = process.env.REACT_APP_API_URL;

const ProfileStats = ({ stats }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showable, setShowable] = useState("followers");

  console.log(stats);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const showModal = async (content) => {
    await setShowable(content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const allFollowers = stats.followers.map((element) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {element.img ? (
          <Avatar src={`${API_URL}/porfile/${element.img}`} />
        ) : (
          <Avatar>{element.username.substring(0, 1)}</Avatar>
        )}
        <h1 style={{ flex: 1 }}>{element.username}</h1>
        {element._id === user._id ? null : user.following.some(
            (objetive) => objetive._id === element._id
          ) ? (
          <Button
            style={{ width: "min-content", marginRight: "4rem" }}
            size="small"
            onClick={() => dispatch(doAnUnfollow(element._id))}
          >
            Dejar se seguir
          </Button>
        ) : (
          <Button
            style={{ width: "min-content", marginRight: "4rem" }}
            type="primary"
            size="small"
            onClick={() => {
              dispatch(doAFollow(element._id));
            }}
          >
            Seguir
          </Button>
        )}
      </div>
    );
  });

  // ! EL state.FROM ES EL DUEÑO DEL PERFIL!

  const allFollowing = stats.following.map((element) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {element.img ? (
          <Avatar src={`${API_URL}/porfile/${element.img}`} />
        ) : (
          <Avatar>{element.username.substring(0, 1)}</Avatar>
        )}
        <h1 style={{ flex: 1 }}>{element.username}</h1>
        <Button type="primary">FollowSys</Button>
      </div>
    );
  });
  return (
    <>
      <section className="ProfileStats">
        <div onClick={() => showModal("followers")}>
          <h3>Followers</h3>
          <h4>{stats.followers.length}</h4>
        </div>
        <div onClick={() => showModal("following")}>
          <h3>Following</h3>
          <h4>{stats.following.length}</h4>
        </div>
        <div>
          <h3>Posts</h3>
          <h4>{stats.posts.length}</h4>
        </div>
      </section>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="primary" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        {showable === "followers" ? (
          stats.followers.length !== 0 ? (
            allFollowers
          ) : (
            <Empty />
          )
        ) : stats.following.length !== 0 ? (
          allFollowing
        ) : (
          <Empty />
        )}
      </Modal>
    </>
  );
};

export default ProfileStats;
