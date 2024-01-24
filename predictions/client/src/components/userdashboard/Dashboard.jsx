import React from 'react'
import DashboardLeft from './DashboardLeft'
import DashboardMid from './DashboardMid'
import DashboardRight from './DashboardRight'

const Dashboard = () => {
  return (
    <>
        <div className="container">
            <DashboardLeft></DashboardLeft>
            <DashboardMid></DashboardMid>
            <DashboardRight></DashboardRight>
        </div>
    </>
  )
}

export default Dashboard