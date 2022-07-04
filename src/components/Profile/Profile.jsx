import React, { useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'
import { getById } from '../../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from './ProfileCard/ProfileCard'
import ProfilePosts from './ProfilePosts/ProfilePosts'


const Profile = () => {

    const {id} = useParams()

    const { userDisplayed:target, isLoading } = useSelector((state)=>state.users)
    const [load, setLoad] = useState(false)

    const dispatch = useDispatch()

    const loadInfo = async() =>{
      await dispatch(getById(id))
      setLoad(true)
    }

    useEffect(()=>{
      loadInfo()
    },[])


    if(load){
      return (
        <section className='Profile'>
            <ProfileCard target={target}/>
            <ProfilePosts posts={target.postIds}/>
        </section>
      )
    } else {
      return <h1>cargando...</h1>
    }
}

export default Profile