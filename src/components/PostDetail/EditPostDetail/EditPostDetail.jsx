import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../features/posts/postsSlice";

const EditPostDetail = ({ title, body, _id, setEdit }) => {
  const dispatch = useDispatch();

  const { TextArea } = Input;
  const [value, setValue] = useState("");

  const onFinish = async (data) => {
    await dispatch(updatePost({ data, _id }));
    setEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
      >
        <Form.Item label="Titulo" name="title" initialValue={title}>
          <Input />
        </Form.Item>
        <Form.Item label="Cuerpo" name="body" initialValue={body}>
          <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPostDetail;
