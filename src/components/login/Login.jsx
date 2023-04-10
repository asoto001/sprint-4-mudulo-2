import React, { useState } from 'react'
import img1 from '../../assets/cel.svg'
import img2 from '../../assets/man.svg'
import img3 from '../../assets/car.svg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.scss'

const imgs = [
  {
    img: img1,
    info: 'Elige que quieres comer, de nuestra selecion de restaurantes'
  },
  {
    img: img2,
    info: 'Elige donde quieres recivir tu pedido indicandolo en el mapa'
  },
  {
    img: img3,
    info: 'Lo entregaremos lo mas rapido posible'
  }
]

const Login = () => {
  const { isLogged } = useSelector(store => store.login)
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      if (isLogged) {
        navigate('/restaurants')
      } else {
        navigate('/loginPhone')
      }
    }
  }
  const variants = {
    enter: { x: 1000 },
    center: { x: 0 },
    exit: { x: -1000 },
  };
  return (
    <section className='app-description '>
      <div className='imgs '>
        <motion.img
          key={step}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{ type: "spring", stiffness: 300, damping: 100 }}
           src={imgs[step].img} alt="" />
        <p >{imgs[step].info}</p>
      </div>
      <figure className='slider-comtainer '>
        <span onClick={() => setStep(0)} className={`counters  ${step == 0 ? 'chosen' : ' unchosen'}  `}></span>
        <span onClick={() => setStep(1)} className={`counters  ${step == 1 ? ' chosen' : ' unchosen'} `}></span>
        <span onClick={() => setStep(2)} className={`counters  ${step == 2 ? ' chosen' : ' unchosen'} `}></span>
      </figure>
      <button onClick={handleNext} className='btn-next'>Next</button>
    </section>
  )
}

export default Login