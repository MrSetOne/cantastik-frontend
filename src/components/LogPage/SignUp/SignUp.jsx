import { Button, Form, Input, notification } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeNeedSignUp } from "../../../features/interface/interfacesSlice";
import { signup, resetNotif } from "../../../features/auth/authSlice";
import "./SignUp.scss";
import { useEffect } from "react";

const SignUp = () => {
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(signup(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
      setTimeout(() => {
        dispatch(resetNotif());
      }, 2000);
    }
    if (isSuccess) {
      notification.success({
        message: "¡Ya casi estamos!",
        description: message,
      });
      dispatch(changeNeedSignUp());
      setTimeout(() => {
        dispatch(resetNotif());
      }, 2000);
    }
  }, [isError, isSuccess, message]);

  return (
    <article className="SignUp">
      <h2>Registrarse</h2>
      <Form
        name="signup"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        requiredMark={false}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "El nombre de usuario es obligatorio",
            },
          ]}
        >
          <Input
            placeholder="Tu nombre de usuario"
            prefix={
              <UserOutlined
                className="site-form-item-icon"
                style={{ color: "gray" }}
              />
            }
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "El correo electronico es obligatorio",
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="Tu correo"
            prefix={
              <MailOutlined
                className="site-form-item-icon"
                style={{ color: "gray" }}
              />
            }
          ></Input>
        </Form.Item>

        <Form.Item
          name="password"
          label="Constraseña"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ color: "gray" }}
              />
            }
            placeholder="Tu contraseña"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Repite contraseña"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ color: "gray" }}
              />
            }
            placeholder="Confirma tu contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Crear cuenta
          </Button>
        </Form.Item>
        <Form.Item className="signup-form--lastItem">
          <Button
            style={{ width: "100%" }}
            type="default"
            className="login-form-button"
            onClick={() => dispatch(changeNeedSignUp())}
          >
            Iniciar sesion
          </Button>
        </Form.Item>
      </Form>
    </article>
  );
};

export default SignUp;
