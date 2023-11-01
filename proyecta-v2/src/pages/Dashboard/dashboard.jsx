import "./dashboard.css";
import DashboardSideBar from "./dashboardSideBar/dashboardSideBar";

import DashboardNavBar from './DashboardNavBar/dashboardNavBar';
import { useState } from "react";
import { useSelector } from 'react-redux'

import TasksContainerPage from "./TasksContainerPage/tasksContainerPage"
import ProjectsContainerPage from "./ProjectsContainerPage/projectsContainerPage"
import CalendarContainerPage from "./CalendarContainerPage/calendarContainerPage"
import DashboardContainer from "./DashboardContainerPage/dashboardContainer"

const Dashboard = () => {

  const dashboardItem = useSelector((state) => state.dashboard.value)
  const [isRTL, setIsRTL] = useState(false);
   // handle on RTL change event
   const handleRTLChange = (e) => {
    setIsRTL(e.target.checked);
  };

  const changeContainerUI = () => {
    switch (dashboardItem) {
    case 'Dashboard':
      return   (<DashboardContainer />)
    break;
    case 'Projects':
      return (<ProjectsContainerPage />)
      break;
    case 'Tasks':
      return (<TasksContainerPage />)
    break;

    case 'Calendar':
      return (<CalendarContainerPage />)
      break;

};

};
    return(
        <>
        <DashboardNavBar/>

        <div style={{ display: 'flex', height: '100%', direction: isRTL ? 'rtl' : 'ltr', backgroundColor: '#F2F2F2'}}>
            <DashboardSideBar />

            <main className={`mainContainer ${dashboardItem === 'Dashboard' ? 'dashboardContainer' : ''}`}>
                <div className={`styleContainer ${dashboardItem === 'Projects' ? 'proyectoVisible' : ''} ${dashboardItem === 'Dashboard' ? 'dashboardContainer' : ''}`} >
                    {changeContainerUI()}
                </div>
            </main>
          
        </div>
        </>
    )
}

export default Dashboard;