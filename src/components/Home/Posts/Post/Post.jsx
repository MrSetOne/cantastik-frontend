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

    console.log(item)

    const [isModalVisibleComments, setIsModalVisibleComments] = useState(false);
    const [isModalVisibleLikes, setIsModalVisibleLikes] = useState(false)

    const showModal = (type) => {
      if(type==="comments"){
        setIsModalVisibleComments(true);
      } else if("likes"){
        setIsModalVisibleLikes(true)
      }
    };
  
    const handleClose = (type) => {
      if(type === "comments"){
        setIsModalVisibleComments(false);
      } else if(type === "likes"){
        setIsModalVisibleLikes(false)
      }
    };
  
    const doALike = async()=>{
      await dispatch(like({postId:item._id, i:item.i}))
      await dispatch(addLike(item._id))
    }

    const doAnUnlike = async()=>{
      await dispatch(unlike({postId:item._id, i:item.i}))
      await dispatch(removeLike(item._id));
    }

    const sendComment = async(e) =>{
      await e.preventDefault()
      await dispatch(addComment({i:item.i,postId:item._id,value:e.target[0].value}))
      e.target[0].value = ""
    }

      const comments = item.comments.map(element => {
        return (
          <div key={element._id} style={{display:'flex',gap:'20px', alignItems:'center', marginBottom:'10px'}}>
            {element.author.img?<Avatar src={`http://localhost:8080/porfile/${element.author.img}`}/>:<Avatar>{element.author.username.substring(0,1)}</Avatar>}
            <h3>{element.author.username}</h3>
            <p>{element.comment}</p>
          </div>)
      })

      const likes = item.likes.map(element => {
        return (
          <div style={{display:'flex', gap:'10px'}}>
            {element.img?<Avatar src={`http://localhost:8080/porfile/${element.img}`}/>:<Avatar>{element.username.substring(0,1)}</Avatar>}
            <h3>{element.username}</h3>
            <Button 
            key="back" 
            onClick={handleClose}
            type="primary"
            size='small'
            >Follow(NotWorking)</Button>
          </div>
        )
      })

  return (
    <article className='Post' key={item._id}>
        {item.userId.img?<Avatar src={`http://localhost:8080/porfile/${item.userId.img}`}/>:<Avatar>{item.userId.username.substring(0,1)}</Avatar>}
        <h2>{item.userId.username}</h2>
        {item.img?<img src={`http://localhost:8080/postsImgs/${item.img}`}/>:null}
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <div style={{display:'flex', gap:'20px'}}>
          <div>
            {user.likedPosts.includes(item._id)?<HeartFilled onClick={()=>doAnUnlike()} />:<HeartOutlined onClick={()=>doALike()}/>}
            <p onClick={()=>showModal("likes")} style={{cursor:"pointer"}}>{item.likes.length}</p>
          </div>
          <div>
            <MessageOutlined onClick={()=>showModal("comments")}/>
            <p onClick={()=>showModal("comments")} style={{cursor:"pointer"}}>{item.comments.length}</p>
          </div>
        </div>
        <Modal
        title="Basic Modal"
        visible={isModalVisibleComments} 
        onCancel={()=>handleClose("comments")}
        footer={[
          <Button 
          key="back" 
          onClick={()=>handleClose("comments")}
          type="primary"
          icon={<DoubleLeftOutlined />}
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
      <Modal
      title="Likes"
      visible={isModalVisibleLikes}
      onCancel={()=>handleClose("likes")}
      footer={[
        <Button 
        key="back" 
        onClick={()=>handleClose("likes")}
        type="primary"
        icon={<DoubleLeftOutlined />}
        >Volver</Button>
      ]}
      >
        {item.comments.length !== 0?likes:<Empty description={<span>Nadie ha dado me gusta aun en este post, <br></br> <b>¡Se el primero en hacerlo!</b></span>}/>}

      </Modal>
        
    </article>
  )
}

export default Post