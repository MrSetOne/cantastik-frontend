import React, { useEffect , useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { getById } from '../../features/users/usersSlice'
import { getPosts, getPostsByAuthor } from '../../features/posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from './ProfileCard/ProfileCard'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import { Button , Result } from 'antd'

const Profile = () => {
  
  const {id} = useParams()
  
  const { userDisplayed:target} = useSelector((state)=>state.users)
  const { posts } = useSelector((state)=>state.posts)
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    
    const loadInfo = async() =>{
      setLoad(false)
      await dispatch(getById(id))
      await dispatch(getPostsByAuthor(id))
      // if(!target.username){
      //   dispatch(getPosts())
      // }
      // * DE MOMENTO SE QUEDA AQUÍ, NO ENTIENDO PORQUÉ LO PUSE
      await setLoad(true)
    }

    useEffect(()=>{
      loadInfo()
    },[]) 

    useEffect(()=>{
        loadInfo()
      },[id])      
      
      if(load){
        if(!target.username){
          setTimeout(() => {
            navigate('/')
        }, 10000);
          return (
            <Result
            status="404"
            title="404"
            subTitle={<><p>Lo sentimos, la pagina que trata de visitar no existe :( <br></br> Te devolveremos al home en 10 segundos </p></>}
            extra={<Button type="primary" onClick={()=>navigate('/')}>Home</Button>}
          />
          )
        }
        console.log(`Load es: ${load}, se ejecuta todo`);
        return (
          <section className='Profile'>
            <ProfileCard target={target}/>
            <ProfilePosts posts={posts}/>
        </section>
      )
    } else {
      console.log(`Load es: ${load}, no se ejecuta nada`);
      return <h1>cargando...</h1>
    }
  }

  export default Profile