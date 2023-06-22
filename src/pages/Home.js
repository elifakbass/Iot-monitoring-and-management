import React from 'react'
import AlarmCard from '../components/AlarmCard';
import CihazCard from '../components/CihazCard';
function Home() {

  return (
    <div className='home'>
      <div className='cardTenant'>
      <AlarmCard/>
      <CihazCard/>
      </div>
    </div>
  )
}

export default Home
