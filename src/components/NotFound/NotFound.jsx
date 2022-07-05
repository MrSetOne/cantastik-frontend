
import { Button , Result } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'

const NotFound = () => {

    const navigate =useNavigate()

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

export default NotFound