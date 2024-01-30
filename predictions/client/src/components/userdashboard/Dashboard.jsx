
import Header from '../Header'
import DashboardLeft from './DashboardLeft'
import DashboardMid from './DashboardMid'
import DashboardRight from './DashboardRight'


const Dashboard = () => {

  
  return (
    <>
      <div>
        <Header />
        <div className="d-flex mx-auto p-5" style={{backgroundColor : "#38003c"}} >

            <div className='col-3 text-start '><DashboardLeft /></div>
            <div className='col-6 text-center'><DashboardMid></DashboardMid></div>
            <div className='col-3 text-end'><DashboardRight></DashboardRight></div>
            
        </div>
      </div>
    </>
  )
}

export default Dashboard