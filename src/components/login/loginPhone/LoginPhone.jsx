import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import icon from '../../../assets/logo.png'
import cel from '../../../assets/phone.svg'
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../../../firebase/firebaseConfig'
import './style.scss'

const LoginPhone = () => {
  const [ind, setInd] = useState('+')
  const generateRecaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptch-container', {
        'size': 'invisible',
        'callback': () => {
        }
      }, auth)
    } catch (error) {
      console.log(error)
    }
  }
  const sendSms = (ind, number, recaptchaVerifier) => {
    signInWithPhoneNumber(auth, `${ind}${number}`, recaptchaVerifier)
      .then((response) => {
        window.confirmationResult = response,
          Swal.fire('Excelente', `Te enviaremos un mensaje para confirmar a  ${number}`, 'ok').then(() => {
            navigate('/verifycode')
          })
      })
      .catch((error) => {
        console.log(error)
        Swal.fire('Ops!', `Ocurrió un error al realizar tu solicitud ${error.message}`, 'error')
      })
  }
  const handleInput = ({ target }) => {
    setInd(target.value)
    if (target.value == '' || target.value.split('')[0] !== '+') {
      setInd('+')
    }
  }
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => {
    generateRecaptcha()
    const appVerifier = window.recaptchaVerifier;
    sendSms(data.ind, data.number, appVerifier)
  }

  return (
    <motion.section
      initial={{ translateX: '-400px' }}
      transition={{ duration: 1 }}
      animate={{ translateX: '0px' }}
      className='lPhone-container '>
      <article className='info-container '>
        <img src={icon} className='info-container__img ' alt="" />
        <h3 className='info-container__h3'> Iniciar con numero de telefono</h3>
        <p className='info-container__p'>Inicia seción con tu numero de telefono para empezar a hacer pedidos</p>
      </article>
      <form onSubmit={handleSubmit(onSubmit)} className='form '>
        <label className='inputs'>
          <img src={cel} alt="" />
          <input {...register('ind', { required: 'Es necesario un indicador de país', pattern: { value: /^[+0-9]{3}$/, message: 'Se necesita un identificador de país' } })} maxLength={3} className='area-code' type="text" value={ind} onInput={(e) => handleInput(e)} />
          <input {...register('number', { required: 'Ingrese algún número', pattern: { value: /^[0-9]{10}$/, message: 'Ingresa un número valido' } })} className='phone-number' maxLength={10} type="text" placeholder="Numero telefonico" />
        </label>
        <div className='wrong-container '>
          {errors.number ? <span className='wrong '>{errors.number.message}</span> : <></>}
          {errors.ind ? <span className='wrong'>{errors.ind.message}</span> : <></>}
        </div>
        <div className='the-links'>
          <p>
            También puedes
            <NavLink to='/loginwithemail' className='link '> ingresar con tu Correo y contraseña</NavLink>
          </p>
          <p>
            O si no popsees una cuenta
            <NavLink to='/register' className='link '> Registrarte</NavLink>
          </p>
        </div>
        <button className='form__btn '>Login</button>
      </form>

      <div id='recaptch-container'></div>

    </motion.section>
  )
}

export default LoginPhone