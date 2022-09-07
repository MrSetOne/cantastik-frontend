import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import {
  MailOutlined,
  LockOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import PostFormImg from "./PostFormImg/PostFormImg";
import { createPost, getPosts } from "../../../../features/posts/postsSlice";

const CreatePostForm = ({ setCreatePostVisible }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loads } = useSelector((state) => state.posts);

  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const onFinish = async (values) => {
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    if (image[0]) {
      formData.append("img", image[0]);
    }
    await dispatch(createPost(formData));
    await setImage([]);
    setImageUrl("");
    await form.resetFields();
    await dispatch(getPosts());
    setCreatePostVisible(false);
  };

  return (
    <Form
      form={form}
      name="createPost"
      className="createPost-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item>
        <PostFormImg
          setImage={setImage}
          image={image}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </Form.Item>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Introduce un titulo" }]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Input placeholder="Introduce un titulo" />
      </Form.Item>
      <Form.Item
        name="body"
        rules={[{ required: true, message: "Introduce un cuerpo" }]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Input.TextArea
          prefix={
            <LockOutlined
              className="site-form-item-icon"
              style={{ color: "gray" }}
            />
          }
          placeholder="Introduce un cuerpo"
          autoSize={{
            minRows: 2,
            maxRows: 6,
          }}
        />
      </Form.Item>
      <Form.Item noStyle={true}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ width: "50%" }}
            type="primary"
            htmlType="submit"
            loading={loads.createPost}
          >
            Publicar
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreatePostForm;
