import { Button,  Form, Input } from 'antd';
import {MailOutlined,LockOutlined,UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { changeNeedSignUp } from "../../../features/interface/interfacesSlice";




const SignUp = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const dispatch = useDispatch()
  return (
    <article className='SignUp' style={{width:'min(500px,100%)', padding:'30px', backgroundColor:"#D4D4D4"}}>
        <Form
        name='signup'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item
          label="Username"
          name="Username"
          rules={[
            {
              required: true,
              message: 'El nombre de usuario es obligatorio',
            },
          ]}
          >
            <Input
            placeholder='Tu nombre de usuario'
            prefix={
              <UserOutlined
              className="site-form-item-icon"
              style={{color:"gray"}}
              />}
            />
          </Form.Item>
          <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'El correo electronico es obligatorio',
              type: 'email'
            },
          ]}
          >
            <Input
            placeholder='Tu correo'
            prefix={
              <MailOutlined
              className="site-form-item-icon"
              style={{color:"gray"}}
              />}
            >
            </Input>
          </Form.Item>
          

          <Form.Item
          name="password"
          label="Constraseña"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
          >
            <Input.Password 
            prefix={
              <LockOutlined
              className="site-form-item-icon"
              style={{color:"gray"}}
              />}
              placeholder="Tu contraseña"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Repite contraseña"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
            prefix={
              <LockOutlined
              className="site-form-item-icon"
              style={{color:"gray"}}
              />}
              placeholder="Confirma tu contraseña"
            />
          </Form.Item>
          <Form.Item >
            <Button style={{width:"100%"}} type="primary" htmlType="submit" className="login-form-button">
                Crear cuenta
              </Button>
            </Form.Item>
            <Form.Item >
            <Button style={{width:"100%"}} type="default" className="login-form-button" onClick={()=>dispatch(changeNeedSignUp())}>
                Iniciar sesion
              </Button>
            </Form.Item>





        </Form>
    </article>
  )
}

export default SignUp