import React from 'react'
import './Card.css'
const HomeCard = ({loading}) => {
  return (
    <div className='card home-product'>
      <p>{loading}</p>
    </div>
  )
}

export default HomeCard
