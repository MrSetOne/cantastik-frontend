import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../features/auth/authSlice";
import cantastikGraff from "../../../assets/Cantastikgraff.png";
import "./SignUp.scss";

const SignUp = ({ setNeedSignUp }) => {
  const dispatch = useDispatch();
  const { loads } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    await dispatch(signup(values));
  };

  return (
    <article className="SignUp">
      <h2>Registrarse</h2>
      <Form
        name="signup"
        onFinish={onFinish}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        requiredMark={false}
      >
        <Form.Item
          className="SignUp__item"
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
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          className="SignUp__item"
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
            prefix={<MailOutlined className="site-form-item-icon" />}
          ></Input>
        </Form.Item>

        <Form.Item
          className="SignUp__item"
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Tu contraseña"
          />
        </Form.Item>
        <Form.Item
          className="SignUp__item"
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirma tu contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="SignUp-form-button"
            loading={loads.user}
          >
            Crear cuenta
          </Button>
        </Form.Item>
        <Form.Item className="signup-form--lastItem">
          <Button
            type="default"
            className="SignUp-form-button"
            onClick={() => setNeedSignUp(false)}
          >
            Iniciar sesion
          </Button>
        </Form.Item>
      </Form>
    </article>
  );
};

export default SignUp;
