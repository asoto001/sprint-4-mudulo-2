import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithEmail } from '../../../redux/actions/loginActions'
import Swal from 'sweetalert2'
import './style.scss'


const LoginWithEmail = () => {
    const { error, user, loading } = useSelector(store => store.login)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = (data) => {
        dispatch(loginWithEmail(data))
    }
    useEffect(() => {
        if (error.status) {
            Swal.fire({
                icon: 'error',
                title: 'O no!, ha ocurrido un error o un campo no esta rellenado correctamente',
                text: 'Intenta nuevamente'
            })
        } else if (error.status === false) {
            Swal.fire({
                icon: '',
                title: 'Inicio de seción Exitoso',
                text: `Bienvenido ${user.name}`
            }).then(() => {
                navigate('/restaurants')
            })
        }
    }, [error])

    return (
        <>
            <motion.section
                initial={{ translateX: '-400px' }}
                transition={{ duration: 1 }}
                animate={{ translateX: '0px' }}
                className='login-container '>
                <h1 className='login-container__h1 font-bold text-3xl'>Inicia seción</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                    <div className='form__div'>
                        <label className='labels'>
                            <h4 className='labels__h4'>Correo electronico</h4>
                            <input {...register('email')} className='inputs' type="text" />
                        </label>
                        <label className='labels'>
                            <h4 className='labels__h4'>Contraseña</h4>
                            <input {...register('password')} className='inputs' type="password" />
                        </label>
                    </div>

                    <span>¿Aún no tienes cuenta? Puedes <NavLink to='/register' className='links'>Crear una</NavLink></span>

                    <span>Tambien puedes <NavLink to='/loginPhone' className='links'>Iniciar seción con numero de telefono</NavLink></span>

                    <button disabled={loading} type='submit' className={`form__btn ${loading ? ' wrong' : ''}`}>Iniciar seción</button>
                </form>
            </motion.section>

        </>
    )
}

export default LoginWithEmail