import { Modal , Button} from "antd"
import CreatePostForm from "./CreatePostForm/CreatePostForm";

const CreatePost = ({visible, setCreatePostVisible}) => {

    console.log(visible)

    const handleCancel = () => {
        setCreatePostVisible(false);
      };
    
  return (
    <Modal
    visible={visible}
    title="Title"
    onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={handleCancel}>
        Volver
      </Button>
    ]}
  >
    <CreatePostForm/>
  </Modal>
  )
}

export default CreatePost