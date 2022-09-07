import { Button, Form, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost, deletePost } from "../../../features/posts/postsSlice";
import "./EditPostDetail.scss";

const EditPostDetail = ({ title, body, _id, setEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { TextArea } = Input;

  const onFinish = async (data) => {
    await dispatch(updatePost({ data, _id }));
    setEdit(false);
  };

  const deleteThisPost = async () => {
    await dispatch(deletePost(_id));
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="EditPostDetail">
      <div>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "2.5rem" }}
        >
          <Form.Item label="Titulo" name="title" initialValue={title}>
            <Input />
          </Form.Item>
          <Form.Item label="Cuerpo" name="body" initialValue={body}>
            <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Modificar
              </Button>
              <Button type="danger" onClick={() => deleteThisPost()}>
                Eliminar Post
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditPostDetail;
