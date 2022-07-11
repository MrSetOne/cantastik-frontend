import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost, deletePost } from "../../../features/posts/postsSlice";

const EditPostDetail = ({ title, body, _id, setEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { TextArea } = Input;
  const [value, setValue] = useState("");

  const onFinish = async (data) => {
    await dispatch(updatePost({ data, _id }));
    setEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteThisPost = async () => {
    await dispatch(deletePost(_id));
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="EditPostDetail">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
              Submit
            </Button>
            <Button type="danger" onClick={() => deleteThisPost()}>
              Eliminar Post
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPostDetail;
