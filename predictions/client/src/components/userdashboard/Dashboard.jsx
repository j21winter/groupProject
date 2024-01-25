import {useState} from 'react'

import DashboardLeft from './DashboardLeft'
import DashboardMid from './DashboardMid'
import DashboardRight from './DashboardRight'

const Dashboard = () => {

  // Errors
  const [errors, setErrors] = useState({
    leagues : {
      league_name: ""
    },
    
  })
  return (
    <>
        <div className="container">
            <DashboardLeft errors={errors} setErrors={setErrors}/>
            <DashboardMid></DashboardMid>
            <DashboardRight></DashboardRight>
        </div>
    </>
  )
}

export default Dashboard