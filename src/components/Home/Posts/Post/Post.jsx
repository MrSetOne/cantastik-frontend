import React, { useState } from 'react'
import { like , unlike, addComment } from '../../../../features/posts/postsSlice'
import { addLike , removeLike } from '../../../../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux";
import {HeartOutlined, HeartFilled, MessageOutlined, DoubleLeftOutlined, SendOutlined  } from '@ant-design/icons'
import {Avatar, Modal, Button, Input, Empty } from 'antd'

const Post = ({item}) => {
    const { user } = useSelector((state) => state.auth)
    const { posts} = useSelector((state)=>state.posts) //Esto lo puedo utilizar mas adelante para indicar que no hay ningun post (Ofrecer seguir a alguien)
    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleClose = () => {
      setIsModalVisible(false);
    };
  
    const doALike = async()=>{
      await dispatch(like(item._id))
      await dispatch(addLike(item._id))
    }

    const doAnUnlike = async()=>{
      await dispatch(unlike(item._id))
      await dispatch(removeLike(item._id));
    }

    const sendComment = async(e) =>{
      console.log(e);
      await e.preventDefault()
      await dispatch(addComment({i:item.i,postId:item._id,value:e.target[0].value}))
      e.target[0].value = ""
    }

      const comments = item.comments.map(element => {
        return (
          <div onClick={()=>{console.log(element._id)}} key={element._id} style={{display:'flex',gap:'20px', alignItems:'center', marginBottom:'10px'}}>
            {element.author.img?<Avatar src={`http://localhost:8080/porfile/${element.author.img}`}/>:<Avatar>{element.author.username.substring(0,1)}</Avatar>}
            <h3>{element.author.username}</h3>
            <p>{element.comment}</p>
          </div>)
      })



  return (
    <article className='Post' key={item._id}>
        {item.userId.img?<Avatar src={`http://localhost:8080/porfile/${item.userId.img}`}/>:<Avatar>{item.userId.username.substring(0,1)}</Avatar>}
        <h2>{item.userId.username}</h2>
        {item.img?<img src={`http://localhost:8080/postsImgs/${item.img}`}/>:null}
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        {user.likedPosts.includes(item._id)?<HeartFilled onClick={()=>doAnUnlike()} />:<HeartOutlined onClick={()=>doALike()}/>}
        <MessageOutlined onClick={()=>showModal()}/>
        <Modal
        title="Basic Modal"
        visible={isModalVisible} 
        onCancel={handleClose}
        footer={[
          <Button 
          key="back" 
          onClick={handleClose}
          type="primary"
          icon={<DoubleLeftOutlined />}
          className="paco"
          >
            Volver
          </Button>
        ]}
        >
          {item.comments.length !== 0?comments:<Empty description={<span>Nadie ha comentado aun en este post, <br></br> <b>¡Se el primero en hacerlo!</b></span>}/>}
          
          <form style={{display:'flex'}} onSubmit={(e)=>sendComment(e)}>
            <Input 
            placeholder="Escribe tu comentario" 
            bordered={false} 
            name="comment"
            prefix={<MessageOutlined/>}
            />
            <Button type="primary" icon={<SendOutlined />} htmlType="submit"/>
          </form>
      </Modal>
        
    </article>
  )
}

export default Post