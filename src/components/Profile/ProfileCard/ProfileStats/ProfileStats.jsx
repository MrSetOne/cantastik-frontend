import { DoubleLeftOutlined } from "@ant-design/icons";
import { Avatar, Button, Empty, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import FollowBtn from "../../../Sys/FollowBtn/FollowBtn";

import "./ProfileStats.scss";

const ProfileStats = ({ stats }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showable, setShowable] = useState("followers");

  const { user } = useSelector((state) => state.auth);

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
          <Avatar src={element.img} />
        ) : (
          <Avatar>{element.username.substring(0, 1)}</Avatar>
        )}
        <h1 style={{ flex: 1 }}>{element.username}</h1>
        {element._id === user._id ? null : <FollowBtn dest={element._id} />}
      </div>
    );
  });

  const allFollowing = stats.following.map((element) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {element.img ? (
          <Avatar src={element.img} />
        ) : (
          <Avatar>{element.username.substring(0, 1)}</Avatar>
        )}
        <h1 style={{ flex: 1 }}>{element.username}</h1>
        {element._id === user._id ? null : <FollowBtn dest={element._id} />}
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
        title={showable}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            type="primary"
            onClick={handleCancel}
            icon={<DoubleLeftOutlined />}
          >
            Volver
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
