import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/authSlice";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";

const Login = ({ setNeedSignUp }) => {
  const dispatch = useDispatch();

  const { loads } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div
      className="Login"
      style={{
        height: 585,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Iniciar sesión</h2>
      <Form
        name="login"
        className="login-form"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Input
            prefix={
              <MailOutlined
                className="site-form-item-icon"
                style={{ color: "gray" }}
              />
            }
            placeholder="Tu email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ display: "flex", justifyContent: "center" }}
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

        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loads.user}
          >
            Iniciar sesión
          </Button>
        </Form.Item>
        <Form.Item className="login-form--lastItem">
          <Button
            style={{ width: "100%", marginBottom: 0 }}
            type="default"
            className="login-form-button"
            onClick={() => setNeedSignUp(true)}
          >
            Crear cuenta
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
