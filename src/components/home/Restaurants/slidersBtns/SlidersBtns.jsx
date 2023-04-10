import React from 'react'
import { motion } from 'framer-motion';
import './styles.scss'



const SlidersBtns = ({ set, value, btns }) => {
  return (
        <motion.div className='Ftype-container'>
            <motion.div className='slider-2' drag='x' dragConstraints={{right: 10, left:-400}}>
            {btns.map((it, ind)=>(
                <motion.div key={ind} onClick={()=> set({key: it.key, v: it.value, current: ind})} whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.8 }} className={`${value.current === ind ? 'btn-active' : ''} item-btn`}>
                <h3>{it.name}</h3> {it.icon !== '' ? <img src={it.icon} className='' /> : <></>}
                </motion.div>
            ))}
            </motion.div>
        </motion.div>
  )
}

export default SlidersBtns

