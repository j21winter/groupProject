import {useState} from 'react'

import DashboardLeft from './DashboardLeft'
import DashboardMid from './DashboardMid'
import DashboardRight from './DashboardRight'

const Dashboard = () => {

  
  return (
    <>
        <div className="row mx-auto p-5" >

            <div className='col'><DashboardLeft /></div>
            <div className='col'><DashboardMid></DashboardMid></div>
            <div className='col'><DashboardRight></DashboardRight></div>
            
        </div>
    </>
  )
}

export default Dashboard