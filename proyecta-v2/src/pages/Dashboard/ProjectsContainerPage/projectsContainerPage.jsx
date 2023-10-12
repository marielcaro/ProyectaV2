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
        let card = projectList.find( x => x.projectId === parseInt(id) || x.projectId === id)
        setSelectedCard(card);
    }

    const handleBackTrack = () =>{
        setShowList(true)
        setSelectedCard(null);
    }

    const handleEditLinks = (id,section, linkList) =>{
        let aux = [...projectList]
        let py = projectList.find( x => x.projectId === parseInt(id) || x.projectId === id)
        let pyIndex = projectList.findIndex( x => x.projectId === parseInt(id) || x.projectId === id)
        py[section] = linkList;
        aux[pyIndex]= py
        setProjectList(aux)
    }

    const handleEditData = (id, obj) => {
        let aux = [...projectList]
        let py = projectList.find( x => x.projectId === parseInt(id) || x.projectId === id)
        let pyIndex = projectList.findIndex( x => x.projectId === parseInt(id) || x.projectId === id)
        py.projectName = obj.projectName;
        py.description = obj.description;
        // py.tags = obj.tags;

        aux[pyIndex]= py
        setProjectList(aux)
    }

    const handleDeleteData = (id) => {
        let aux = [...projectList]
        let py = projectList.find( x => x.projectId === parseInt(id)|| x.projectId === id )
        let pyIndex = projectList.findIndex( x => x.projectId === parseInt(id) || x.projectId === id)
       
        aux = aux.slice(0, pyIndex).concat(aux.slice(pyIndex + 1));
        setProjectList(aux)
        setShowList(true)

    }

    const handleEditFotoData = (id, img) =>{
        let aux = [...projectList]
        let py = projectList.find( x => x.projectId === parseInt(id) || x.projectId === id)
        let pyIndex = projectList.findIndex( x => x.projectId === parseInt(id) || x.projectId === id)
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
        <ProjectPage project={selectedCard} backTrack={handleBackTrack} deleteProject={(id)=>handleDeleteData(id)} editFoto={(id,img) => handleEditFotoData(id,img)} editInfo= {(id,obj) => handleEditData(id,obj)} editLinks={(id,section, list) =>handleEditLinks(id,section,list)} />}
     </div>
     )

}

export default ProjectsContainerPage