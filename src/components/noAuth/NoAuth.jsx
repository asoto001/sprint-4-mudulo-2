import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserAltSlash } from "react-icons/fa";

const NoAuth = () => {
    const navigate = useNavigate()
  return (
    <section >
        <section >
        <div >
        <FaUserAltSlash />
        <h2 >No has iniciado seción</h2>
        </div>
        <article >
        <button onClick={()=> navigate('/login')}>Login</button>
        <button onClick={()=> navigate(-1)} >Back</button>
        </article>
        </section>
    </section>
  )
}

export default NoAuth