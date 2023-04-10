import React, { useState } from 'react'
import Sliders from './sliders/Sliders';
import SlidersBtns from './slidersBtns/SlidersBtns';
import { motion } from 'framer-motion';
import './styles.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleError } from '../../../redux/actions/loginActions';
import { AiOutlineReload } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import hamburger from '../../../assets/hamburguer.svg'
import pizza from '../../../assets/pizza.svg'
import pancito from '../../../assets/panaderia.svg'
import sopas from '../../../assets/sopas.svg'


const btns = [
  { name: 'De todo', icon: '', key: '', value: null },
  { name: 'Fast Food', icon: hamburger, key: 'type', value: 1 },
  { name: 'Hamburguesas', icon: hamburger, key: 'type', value: 2 },
  { name: 'Pizza', icon: pizza, key: 'type', value: 3 },
  { name: 'Pan', icon: pancito, key: 'type', value: 4 },
  { name: 'Sopas', icon: sopas, key: 'type', value: 5 },
]
const Restaurants = () => {

  const [btnSelected, setbtnSelected] = useState({ key: '', v: null, current: 0 })
  const { user } = useSelector(store => store.login)
  const { restaurants, loading } = useSelector(store => store.restaurants)
  const navigate = useNavigate()
  const handleLocation = () => {
    navigate('/updatelocation')
  }

  return (
    <motion.section className='container-sec '
      initial={{ translateX: '-400px' }}
      transition={{ duration: 0.7 }}
      animate={{ translateX: '0px' }}
    >
      <figure onClick={handleLocation} className='ubication-btn'>
        <ImLocation className='ubication-icon' />
        <div>
          <h3>Entregar en</h3>
          <h4>{user.location ? user.location : ''}</h4>
        </div>
      </figure>
      <Sliders />
      <h2>Restaurantes y cafeterias</h2>
      <SlidersBtns set={setbtnSelected} value={btnSelected} btns={btns} />
      <section className='restaurants'>
        {restaurants.length == 0 ?
          <div className='restaurants-div'>
            <motion.figure
              initial={{ rotate: '0' }}
              transition={{ duration: 2.5 }}
              animate={{ rotate: '800deg' }}
              className='mt-24'>
              <AiOutlineReload className='reload' />
            </motion.figure>
          </div>
          :
          <></>
        }
      </section>
    </motion.section>
  )
}

export default Restaurants