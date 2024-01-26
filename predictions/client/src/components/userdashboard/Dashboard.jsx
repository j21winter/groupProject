import {useState} from 'react'

import DashboardLeft from './DashboardLeft'
import DashboardMid from './DashboardMid'
import DashboardRight from './DashboardRight'

const Dashboard = () => {

  
  return (
    <>
        <div className="row mx-auto" >

            <div className='col'><DashboardLeft /></div>
            <div className='col'><DashboardMid></DashboardMid></div>
            {/* <div className='col'><DashboardRight></DashboardRight></div> */}
            {/* having trouble with the axios call to map through leagues  */}
            
        </div>
    </>
  )
}

export default Dashboard