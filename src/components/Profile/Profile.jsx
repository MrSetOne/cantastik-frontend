import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { getById } from '../../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from './ProfileCard/ProfileCard'


const Profile = () => {

    const {id} = useParams()

    const { userDisplayed:target } = useSelector((state)=>state.users)

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getById(id))
    },[])

    console.log(target);

  return (
    <section className='Profile'>
        <ProfileCard target={target}/>
    </section>
  )
}

export default Profile