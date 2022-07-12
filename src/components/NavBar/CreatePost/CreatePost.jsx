import { DoubleLeftOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import CreatePostForm from "./CreatePostForm/CreatePostForm";

const CreatePost = ({ visible, setCreatePostVisible }) => {
  const handleCancel = () => {
    setCreatePostVisible(false);
  };

  return (
    <Modal
      visible={visible}
      title="Nuevo Post"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} icon={<DoubleLeftOutlined />}>
          Volver
        </Button>,
      ]}
    >
      <CreatePostForm setCreatePostVisible={setCreatePostVisible} />
    </Modal>
  );
};

export default CreatePost;
