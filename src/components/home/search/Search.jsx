import React from 'react'
import { BsSearch } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import './style.scss'



const Search = () => {

const {register, handleSubmit, watch} = useForm()
const onSubmit = (data) =>{
  console.log(data)
  
}
  return (
    <motion.section className='search-sec'
      initial={{ translateX: '-400px' }}
      transition={{ duration: 0.7 }}
      animate={{ translateX: '0px' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='input-container'>
          <div className='div'>
          <BsSearch />
          <input {...register('name')}  type="text" className='input ' placeholder='Busca un platillo' />
          </div>

          <button type='submit'></button>
         
        </label>
      </form>
      
      
    </motion.section>
  )
}

export default Search