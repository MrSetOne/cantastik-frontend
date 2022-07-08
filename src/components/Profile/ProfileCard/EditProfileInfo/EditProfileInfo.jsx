import { Form, Input, Button, Space } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import PostFormImg from "../../../NavBar/CreatePost/CreatePostForm/PostFormImg/PostFormImg";
import { updateUser } from "../../../../features/auth/authSlice";

const EditProfileInfo = ({ setEdit }) => {
  const { user } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const onFinish = async (values) => {
    let formData = new FormData();
    formData.append("username", values.username);
    // formData.append("body", values.body);
    if (image[0]) {
      formData.append("img", image[0]);
    }
    await dispatch(updateUser(formData));
    await setImage([]);
    setImageUrl("");
    await form.resetFields();
    await setEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="EditProfileInfo" style={{ backgroundColor: "white" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        requiredMark={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <PostFormImg
          setImage={setImage}
          image={image}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Siempre tienes que tener un username" },
          ]}
          initialValue={user.username}
        >
          <Input placeholder={user.username} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Space style={{ justifyContent: "flex-end" }}>
            <Button type="primary" onClick={() => setEdit(false)}>
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditProfileInfo;
