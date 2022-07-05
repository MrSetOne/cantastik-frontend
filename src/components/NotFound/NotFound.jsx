
import { Button , Result } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'

const NotFound = () => {

    const navigate =useNavigate()

    setTimeout(() => {
        navigate('/')
    }, 10000);


// * AHORA TENGO QUE HACER UN SETINTERVAL (CON DOS HUEVOS) PARA PONER UNA CUENTA ATRÁS (ACUERDATE DE CARGARTELO UNA VEZ SE REDIRIJA)


    return (
        <Result
            status="404"
            title="404"
            subTitle={<><p>Lo sentimos, la pagina que trata de visitar no existe :( <br></br> Te devolveremos al home en 10 segundos </p></>}
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}

// http://localhost:3000/profile/62bcc685a3afebe3269127a8

export default NotFound