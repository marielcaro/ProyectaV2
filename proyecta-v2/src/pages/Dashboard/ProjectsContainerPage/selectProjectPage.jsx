import React, { useEffect, useState } from 'react';
import ProjectCard from './projectCard';
import './projectsContainerPage.css'

const SelectProjectPage = () => {

    return(
     <div className="projectCardList">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
     </div>
     )

}

export default SelectProjectPage