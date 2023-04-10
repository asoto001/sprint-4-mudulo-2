import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { createUserWithEmailAndPasswordAsync, updateProfileAsync } from '../../../redux/actions/loginActions'
import { fileUpload } from '../../../services/service'
import { motion } from 'framer-motion'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebase/firebaseConfig'
import './style.scss'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, loading } = useSelector(store => store.login)
    const [updateUser, setupdateUser] = useState(false)
    const onSubmit = async (data) => {
        const photo = data.photo[0] ? await fileUpload(data.photo[0]) : '';
        const user = {
            name: data.name,
            email: data.email,
            password: data.password,
            photo: photo,
            location: data.location,
            birthday: data.birthday
        }
        if (updateUser) {
            dispatch(updateProfileAsync(user));
        } else {
            dispatch(createUserWithEmailAndPasswordAsync({...user, phone: data.number}))
        }

    }
    useEffect(() => {
        onAuthStateChanged(auth, (user => {
            if (user) {
                setupdateUser(true)
            }
        }))
    }, [])
    useEffect(() => {
        if (error.status) {
            Swal.fire('Ops!', `Ocurrió un error al procesar la solicitud ${error.message}`)
        } else if (error.status === false) {
            Swal.fire('Exito!', `El usuario ha sido creado exitosamente`).then(() => {
                navigate('/restaurants')
            })
        }
    }, [error])
    
    return (
        <motion.section
            initial={{ translateX: '-400px' }}
            transition={{ duration: 1 }}
            animate={{ translateX: '0px' }}
            className='register-container'>
            <h1 className='register-container__h1'>Crea tu cuenta</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form flex'>
                <div className='div'>
                    <label className='input-labels-nc'>
                        <h4 className='text'>NOMBRE</h4>
                        <input {...register('name')} className='inputs' type="text" />
                    </label>
                    <label className='input-labels-nc'>
                        <h4 className='text'>CORREO ELECTRONICO</h4>
                        <input {...register('email')} className='inputs' type="text" />
                    </label>
                    {!updateUser ?
                        <label className='input-labels-nc'>
                            <h4 className='text'>NUMERO DE CELULAR</h4>
                            <input {...register('number')} className='inputs' type="text" />
                        </label> : <></>   
                }
                    <label className='input-labels-nc'>
                        <h4 className='text'>CONTRASEÑA</h4>
                        <input {...register('password')} className='inputs' type="password" />
                    </label>
                    <label className='input-labels-pdb'>
                        <h4 className='text'>FOTO DE PERFIL</h4>
                        <input {...register('photo')} className='input-photo p-1 outline-none text-transparent ' type="file" />
                    </label>
                    <label className='input-labels-pdb'>
                        <h4 className='text'>DIRECCION</h4>
                        <input {...register('location')} type="text" />
                    </label>
                    <label className='input-labels-pdb'>
                        <h4 className='text'>FECHA DE NACIMIENTO</h4>
                        <input {...register('birthday')} className='inputs' type="text" />
                    </label>
                </div>
                <button disabled={loading} type='submit' className='form__btn'>Registrate</button>
            </form>
        </motion.section>
    )
}

export default Register