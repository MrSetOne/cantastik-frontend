import { DoubleRightOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, wellcomeEnd } from "../../../../features/auth/authSlice";
import PostFormImg from "../../../NavBar/CreatePost/CreatePostForm/PostFormImg/PostFormImg";
import { motion } from "framer-motion";

const InitialConfig = () => {
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let formData = new FormData();
    formData.append("bio", values.bio);
    if (image[0]) {
      formData.append("img", image[0]);
    }
    await dispatch(updateUser(formData));
    await dispatch(wellcomeEnd());
    await setImage([]);
    setImageUrl("");
    await form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <motion.div
      style={{
        backgroundColor: "white",
        width: "min(70rem,95vw)",
        padding: "4rem",
        borderRadius: ".5rem",
      }}
      className="InitialConfig"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        -INTRODUCE TUS DATOS-
      </h2>
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
          label="Imagen de perfil"
          labelAlign="left"
          style={{ alignItems: "center" }}
          labelCol={{ span: 10 }}
        >
          <PostFormImg
            setImage={setImage}
            image={image}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </Form.Item>
        <Form.Item label="Bio" name="bio">
          <TextArea
            placeholder={"Añade una bio"}
            autoSize={{ minRows: 3, maxRows: 5 }}
            maxLength={140}
            showCount={true}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              icon={<DoubleRightOutlined />}
            >
              Enviar
            </Button>
          </div>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default InitialConfig;
