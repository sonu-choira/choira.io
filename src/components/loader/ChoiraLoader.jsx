import React from 'react'
import Loader from '../../assets/gifs/loading.gif';
import './loader.css';

export const ChoiraLoader = () => {
  return (
    <div className='parent'>
      <div className='child'><img src={Loader} alt="choira loading"/></div>
    </div>
  )
}