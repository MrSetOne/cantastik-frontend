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
    <div className="Login">
      <h2>Iniciar sesión</h2>
      <Form
        name="login"
        className="login__form"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="login__formItem"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Tu email"
          />
        </Form.Item>

        <Form.Item
          className="login__formItem"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Tu contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button
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
