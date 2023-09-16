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
        let card = projectList.find( x => x.projectId === parseInt(id))
        setSelectedCard(card);
    }

    const handleBackTrack = () =>{
        setShowList(true)
        setSelectedCard(null);
    }

    const handleEditFotoData = (id, img) =>{
        let aux = [...projectList]
        let py = projectList.find( x => x.projectId === parseInt(id))
        let pyIndex = projectList.findIndex( x => x.projectId === parseInt(id))
        py.icon = img
        aux[pyIndex]= py
        setProjectList(aux)

    }
    const addProjectMethod = (obj) =>{
        let aux = [...projectList]
        aux.push(obj)
        setProjectList(aux)
    }

    useEffect(() => {
        if(selectedCard){
            setShowList(false)
        }

    },[selectedCard])

    return(
        <div>
        {showList ? <SelectProjectPage projectList={projectList} handleClickProject={(id) => handleClickProject(id)} addProject={(obj) => addProjectMethod(obj)}/> : 
        <ProjectPage project={selectedCard} backTrack={handleBackTrack} editFoto={(id,img) => handleEditFotoData(id,img)} />}
     </div>
     )

}

export default ProjectsContainerPage