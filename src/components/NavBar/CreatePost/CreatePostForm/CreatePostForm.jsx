import React ,{useState} from 'react'
import {Form, Input,Button,message,Upload} from 'antd'
import {MailOutlined,LockOutlined,LoadingOutlined,PlusOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import PostFormImg from './PostFormImg/PostFormImg'
import { createPost } from '../../../../features/posts/postsSlice'

const CreatePostForm = () => {
    const dispatch = useDispatch()

    const [image, setImage] = useState([])

    const onFinish = (values) => {
        console.log(values);
        console.log(image);
        let formData = new FormData();
        formData.append("title", values.title)
        formData.append("body", values.body)
        if(image[0]){
          formData.append("img", image[0])
        }
        dispatch(createPost(formData))
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


  return (
    <Form
    name="createPost"
    className="createPost-form"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <PostFormImg setImage={setImage}/>
    <Form.Item
      name="title"
      rules={[{ required: true, message: 'Introduce un titulo' }]}
      style={{display:'flex',justifyContent:'center'}}
    >
      <Input prefix={<MailOutlined className="site-form-item-icon" style={{color:"gray"}} />} placeholder="Introduce un titulo"/>
    </Form.Item>
    <Form.Item
      name="body"
      rules={[{ required: true, message: 'Introduce un cuerpo' }]}
      style={{display:'flex',justifyContent:'center'}}
    >
      <Input.TextArea
      prefix={<LockOutlined
      className="site-form-item-icon"
      style={{color:"gray"}}/>}
      placeholder="Introduce un cuerpo"
      autoSize={{
        minRows: 2,
        maxRows: 6
      }}/>
    </Form.Item>
    <Form.Item >
    <Button style={{width:"100%"}} type="primary" htmlType="submit" className="login-form-button">
        Iniciar sesión
      </Button>
    </Form.Item>
  </Form>

  )
}

export default CreatePostForm