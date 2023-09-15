import React, { useEffect, useState } from 'react';
import SelectProjectPage from './selectProjectPage';
import './projectsContainerPage.css'
import data from "./mockDataProject.json"
import ProjectPage from './projectPage';


const ProjectsContainerPage = () => {
    const [projectList, setProjectList] = useState(data.projects);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showList, setShowList] = useState(true);
    const handleClickProject = (id) => {
        let card = data.projects.find( x => x.projectId === parseInt(id))
        setSelectedCard(card);
    }

    const handleBackTrack = () =>{
        setShowList(true)
        setSelectedCard(null);
    }

    useEffect(() => {
        if(selectedCard){
            setShowList(false)
        }

    },[selectedCard])

    return(
        <div>
        {showList ? <SelectProjectPage projectList={projectList} handleClickProject={(id) => handleClickProject(id)}/> : <ProjectPage project={selectedCard} backTrack={handleBackTrack} />}
     </div>
     )

}

export default ProjectsContainerPage