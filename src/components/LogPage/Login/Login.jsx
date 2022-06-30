import { Button,  Form, Input } from 'antd';
import {useDispatch} from 'react-redux'
import { login } from '../../../features/auth/authSlice'


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
    <div className='Login' style={{width:'min(500px,100%)', padding:'30px'}}>
            <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
        labelCol={{span: 0, offset: 0}}
        style={{display:'flex',justifyContent:'center'}}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        labelCol={{span: 0, offset: 0}}
        style={{display:'flex',justifyContent:'center'}}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Login