import { Modal } from "antd";
import { useState } from "react";

import "./ProfileStats.scss";

const ProfileStats = ({ stats }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Peleate con el mapeo de los followers/following (No se poque pollas no funciona òÓ)

  return (
    <>
      <section className="ProfileStats">
        <div onClick={() => showModal("followers")}>
          <h3>Followers</h3>
          <h4>{stats.followers.length}</h4>
        </div>
        <div>
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
      >
        {/* {allFollowers} */}
      </Modal>
    </>
  );
};

export default ProfileStats;
