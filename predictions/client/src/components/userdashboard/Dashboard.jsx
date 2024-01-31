
import Header from '../Header'
import DashboardLeft from './DashboardLeft'
import DashboardMid from './DashboardMid'
import DashboardRight from './DashboardRight'
import {useEffect}  from 'react'
import axios from 'axios'


const Dashboard = () => {
    // const allLeagues = () => {
    //     axios.get("http://localhost:8000/api/allLeagues")
    //     .then(res => {
    //         setLeagues(res.data.allLeagues.filter(league => league.user === user._id));
    //         console.log("LEAGUES", leagues)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // };
    
    //   useEffect(() => {
    //     allLeagues()
    //   }, []);
  
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