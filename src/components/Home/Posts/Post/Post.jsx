import React, { useState } from 'react'
import { like , unlike, addComment } from '../../../../features/posts/postsSlice'
import { addLike , removeLike } from '../../../../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux";
import {HeartOutlined, HeartFilled, MessageOutlined, DoubleLeftOutlined, SendOutlined  } from '@ant-design/icons'
import {Avatar, Modal, Button, Input, Empty, Segmented } from 'antd'
import './Post.scss'
import { Link } from 'react-router-dom';

const Post = ({item}) => {
    const { user } = useSelector((state) => state.auth)
    // const { posts} = useSelector((state)=>state.posts) //Esto lo puedo utilizar mas adelante para indicar que no hay ningun post (Ofrecer seguir a alguien)
    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [show, setShow] = useState("comments")
    const [commentValue, setCommentValue] = useState("")

    const showModal = () => {
      setIsModalVisible(true)
    };
  
    const handleClose = () => {
      setIsModalVisible(false)
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
      const comment = commentValue
      await setCommentValue("")
      await dispatch(addComment({i:item.i,postId:item._id,value:comment}))
      e.target[0].value = ""
    }

      const comments = item.comments.map(element => {
        return (
          <div key={element._id}>
            <Link to={`/profile/${element.author._id}`}>
              {element.author.img?<Avatar src={`http://localhost:8080/porfile/${element.author.img}`}/>:<Avatar>{element.author.username.substring(0,1)}</Avatar>}
            </Link>
            <Link to={`/profile/${element.author._id}`}>
              <h3>{element.author.username}</h3>
            </Link>
            <p>{element.comment}</p>
          </div>)
      })

      const likes = item.likes.map(element => {
        return (
          <div style={{display:'flex', gap:'10px'}}>
            <Link to={`/profile/${element._id}`}>
              {element.img?<Avatar src={`http://localhost:8080/porfile/${element.img}`}/>:<Avatar>{element.username.substring(0,1)}</Avatar>}
            </Link>
            <Link to={`/profile/${element._id}`}>
              <h3>{element.username}</h3>
            </Link>
            <Button 
            key="back" 
            onClick={handleClose}
            type="primary"
            size='small'
            >Follow(NotWorking)</Button>
          </div>
        )
      })
      console.log(item.createdAt);

  return (
    <article className='Post' key={item._id}>
      <div className='Post__Author'>
        <Link to={`/profile/${item.userId._id}`} className='Post__Author--links'>
          {item.userId.img?<Avatar src={`http://localhost:8080/porfile/${item.userId.img}`}/>:<Avatar>{item.userId.username.substring(0,1)}</Avatar>}
          <h2>{item.userId.username}</h2>
        </Link>
        <Button type='primary' size='small'>Follow(NW)</Button>{/* HACER UNA VEZ IMPLEMENTADO EL SISTEMA DE FOLLOWS */}
      </div>
      {item.img?<img src={`http://localhost:8080/postsImgs/${item.img}`} className='Post__Img'/>:null}
      <div className='Post__Text'>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
      <div className='Post__Interactions'>
        <div className='Post__Interactions--Icons'>
          {user.likedPosts.includes(item._id)?<HeartFilled onClick={()=>doAnUnlike()} />:<HeartOutlined onClick={()=>doALike()}/>}
          <MessageOutlined onClick={()=>showModal()}/>
        </div>
        <div className='Post__Interactions--Info'>
          <p onClick={()=>showModal()} style={{cursor:"pointer"}}>{item.likes.length} Me gusta</p>
          <p onClick={()=>showModal()} style={{cursor:"pointer"}}>{item.comments.length} comentarios</p>
        </div>
      </div>
        <Modal
        title="Basic Modal"
        visible={isModalVisible} 
        onCancel={()=>handleClose()}
        className='Post__Modal'
        style={{ top: 20 }}
        footer={[
          <Button 
          key="back" 
          onClick={()=>handleClose()}
          type="primary"
          icon={<DoubleLeftOutlined />}
          >
            Volver
          </Button>
        ]}
        >
          <div className='Post__ModalItem'>
            <Segmented
              options={[
                {value:'comments', icon: <MessageOutlined/>},
                {value:'likes', icon: <HeartOutlined/>}
              ]}
              value={show}
              onChange={setShow}
            />
            {
              show==='comments'?    
                <div className='Post__ModalItem--comments'>        
                  {item.comments.length !== 0?
                    <div>
                      {comments}
                    </div>
                  :
                    <Empty 
                      description={
                        <span>Nadie ha comentado aun en este post,
                          <br/><b>¡Se el primero en hacerlo!</b>
                        </span>
                      }
                    />
                  }
                  <form style={{display:'flex'}} onSubmit={(e)=>sendComment(e)}>
                    <Input 
                      placeholder="Escribe tu comentario" 
                      bordered={false} 
                      name="comment"
                      value={commentValue}
                      onChange={(e)=>setCommentValue(e.target.value)}
                      prefix={<MessageOutlined/>}
                    />
                    <Button type="primary" icon={<SendOutlined />} htmlType="submit"/>
                  </form>
                </div>
              :
                <div style={{position:'relative',width:'100%',minHeight:'30vh'}}>
                  {item.likes.length !== 0?likes:<Empty description={<span>Nadie ha dado me gusta aun en este post, <br></br> <b>¡Se el primero en hacerlo!</b></span>}/>}       
                  {user.likedPosts.includes(item._id)
                    ?
                      <Button
                        style={{ position:'absolute',bottom:0, right:0}}
                        type="primary"
                        icon={<HeartFilled />}
                        onClick={()=>doAnUnlike()}
                      >
                        Quitar like
                      </Button>
                    :
                      <Button
                        style={{position:'absolute',bottom:0,right:0}}
                        type="primary"
                        icon={<HeartFilled />}
                        onClick={()=>doALike()}
                        >
                          Dar Like
                      </Button>
                    }
                </div>

            }
          </div>
        </Modal>        
    </article>
  )
}

export default Post