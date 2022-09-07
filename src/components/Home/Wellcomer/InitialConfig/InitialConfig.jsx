import { DoubleRightOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, wellcomeEnd } from "../../../../features/auth/authSlice";
import PostFormImg from "../../../NavBar/CreatePost/CreatePostForm/PostFormImg/PostFormImg";
import { motion } from "framer-motion";
import "./InitialConfig.scss";

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

  return (
    <motion.div
      className="InitialConfig"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>-INTRODUCE TUS DATOS-</h2>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        labelWrap={true}
        initialValues={{ remember: true }}
        requiredMark={false}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item style={{ alignItems: "center" }} labelCol={{ span: 10 }}>
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
          <div className="InitialConfig__submit">
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
