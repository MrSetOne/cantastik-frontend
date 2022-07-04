import React, {useState} from 'react'
import {HeartOutlined, HeartFilled, MessageOutlined, DoubleLeftOutlined, SendOutlined  } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Modal , Segmented, Comment, Avatar , Divider , Input , Button} from 'antd'


const PhotoPost = ({post}) => {
    const { user } = useSelector((state) => state.auth)

    console.log(post);

    const [isModalVisibleUser, setIsModalVisibleUser] = useState(false);
  
    const showModal = () => {
      setIsModalVisibleUser(true);
    };
  
    const handleOk = () => {
      setIsModalVisibleUser(false);
    };
  
    const handleCancel = () => {
      setIsModalVisibleUser(false);
    };

    const [value, setValue] = useState("comments")

    const allComments = post.comments.map(comment => {
      return(
        <>
          <Comment
            author={comment.author.username}
            avatar={comment.author.img?<Avatar src={`http://localhost:8080/porfile/${comment.author.img}`}/>:<Avatar>{comment.author.username.substring(0,1)}</Avatar>}
            content={comment.comment}
          />
          <Divider style={{margin:'0'}}/>
        </>
      )
    })
  
  return (
    <div>
    <div onClick={()=>showModal()} className='PhotoPost' key={post._id} style={{backgroundImage:`url("http://localhost:8080/postsImgs/${post.img}")`, width:'200px', height:'200px',backgroundSize:'cover', justifySelf:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div>
          {user.likedPosts.includes(post._id)?<HeartFilled style={{color:'white'}}/>:<HeartOutlined style={{color:'white'}}/>}
          <p style={{color:'white'}}>{post.likes.length}</p>
        </div>
        <div>
          <MessageOutlined style={{color:'white'}}/>
          <p style={{color:'white'}}>{post.comments.length}</p>
        </div>
    </div>
        <Modal
        style={{minHeight:'80vh'}}
        width={'min(95vw,1300px)'}
        title={
          <div style={{display:'flex', alignItems:"center",gap:'10px'}}>
            {post.userId.img?<Avatar src={`http://localhost:8080/porfile/${post.userId.img}`}/>:<Avatar>{post.userId.username.substring(0,1)}</Avatar>}
            <h2 style={{marginBottom:0}}>{post.userId.username}</h2>
          </div>
          
        }
        visible={isModalVisibleUser} 
        onOk={()=>handleOk()} 
        onCancel={handleCancel}
        >
          <div style={{display:"flex",minHeight:'30vh'}}>
            <div style={{flex:1}}>
              <img src={`http://localhost:8080/postsImgs/${post.img}`} alt={post.title} style={{width:'100%'}} />
            </div>
            <div style={{width:'300px',display:'flex',flexDirection:'column',alignItems:'center'}}>
              <Segmented
                options={[
                  {value:'comments', icon: <MessageOutlined/>},
                  {value:'likes', icon: <HeartOutlined/>}
                ]}
                value={value}
                onChange={setValue}
              />
              <div style={{padding:'10px',position:'relative', height:'100%'}}>
                {value==='comments'?allComments:<h1>Holi</h1>}
                <form style={{display:'flex', position:'absolute',width:'100%',bottom:0}} onSubmit={{/*(e)=>sendComment(e)*/}}>
                  <Input 
                  placeholder="Escribe tu comentario" 
                  bordered={false} 
                  name="comment"
                  prefix={<MessageOutlined/>}
                  />
                  <Button type="primary" icon={<SendOutlined />} htmlType="submit"/>
                </form>
              </div>
            </div>
          </div>

        </Modal>
        </div>
  )
}

export default PhotoPost