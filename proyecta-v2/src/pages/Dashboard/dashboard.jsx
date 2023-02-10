import "./dashboard.css";
import DashboardSideBar from "./dashboardSideBar/dashboardSideBar";


import DashboardNavBar from './DashboardNavBar/dashboardNavBar';

const Dashboard = () => {
    return(
        <>
        <DashboardNavBar/>

        <div className='registerUser container-fluid  d-flex flex-grow-1 flex-column'>
            <DashboardSideBar />
        </div>
        </>
    )
}

export default Dashboard;