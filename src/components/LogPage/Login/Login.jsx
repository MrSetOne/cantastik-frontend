import { Button,  Form, Input } from 'antd';
import {useDispatch} from 'react-redux'
import { login } from '../../../features/auth/authSlice'
import {MailOutlined,LockOutlined } from '@ant-design/icons'
import { changeNeedSignUp } from "../../../features/interface/interfacesSlice";



const Login = () => {

  const dispatch = useDispatch();  


    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(login(values))
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  
  return (
    <div className='Login' style={{width:'min(500px,100%)', padding:'30px', backgroundColor:"#D4D4D4"}}>
            <Form
      name="login"
      className="login-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
        style={{display:'flex',justifyContent:'center'}}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" style={{color:"gray"}} />} placeholder="Tu email"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        style={{display:'flex',justifyContent:'center'}}
      >
        <Input.Password prefix={<LockOutlined  className="site-form-item-icon" style={{color:"gray"}}/>} placeholder="Tu contraseña"/>
      </Form.Item>

      <Form.Item >
      <Button style={{width:"100%"}} type="primary" htmlType="submit" className="login-form-button">
          Iniciar sesión
        </Button>
      </Form.Item>
      <Form.Item >
      <Button style={{width:"100%"}} type="default" className="login-form-button" onClick={()=>dispatch(changeNeedSignUp())}>
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Login