import { Form, Input, Button, Space } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import PostFormImg from "../../../NavBar/CreatePost/CreatePostForm/PostFormImg/PostFormImg";
import { updateUser } from "../../../../features/auth/authSlice";
import { DoubleLeftOutlined, UploadOutlined } from "@ant-design/icons";

const EditProfileInfo = ({ setEdit }) => {
  const { user } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const { TextArea } = Input;

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
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        labelWrap={true}
        initialValues={{ remember: true }}
        requiredMark={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label=" "
          labelAlign="left"
          style={{ alignItems: "center" }}
          colon={false}
          labelCol={{ span: 10 }}
        >
          <PostFormImg
            setImage={setImage}
            image={image}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Siempre tienes que tener un username" },
          ]}
          initialValue={user.username}
        >
          <Input placeholder={user.username} />
        </Form.Item>{" "}
        <Form.Item
          label="Bio"
          name="bio"
          rules={[
            { required: true, message: "Siempre tienes que tener un username" },
          ]}
          initialValue={user.username}
        >
          <TextArea placeholder={user.username} />
        </Form.Item>
        <Form.Item noStyle={false} className={"EditProfileInfo--Btns"}>
          <Button
            type="danger"
            onClick={() => setEdit(false)}
            icon={<DoubleLeftOutlined />}
          >
            Back
          </Button>
          <Button type="primary" htmlType="submit" icon={<UploadOutlined />}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditProfileInfo;
