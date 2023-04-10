import React from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../../firebase/firebaseConfig'
import { logOutAsync } from '../../../redux/actions/loginActions'
import { CiUser } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.scss'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogOut = () => {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cerrar',
      cancelButtonText: 'Permanecer'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOutAsync())
        navigate('/')
      }
    }
    )
  }
  return (
    <>
      <section className='profile-sec'>
        <figure className='profile-figure'>
          <img className='profile-img' src={auth.currentUser?.photoURL} alt="" />
          <h1>{auth.currentUser?.displayName}</h1>
        </figure>
        <section className='btns-sec'>
          <div className='btn-container'>
            <span className='btns'><CiUser className='icon' /> Editar perfil</span>
            <IoIosArrowForward className='icon' />
          </div>
          <div className='btn-container'>
            <span onClick={handleLogOut} className='btns'><CiUser className='icon' /> Cerrar seción</span>
          </div>
        </section>
      </section>
    </>
  )
}

export default Profile