import React, { useEffect, useState } from 'react';
import ProjectCard from './projectCard';
import './projectsContainerPage.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalAddProject from './modalAddProject';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProjectProfileFoto from './projectProfileFoto';
import Stack from '@mui/material/Stack';

const ProjectPage = (props) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

return(
<div className="pagerContainter">
    <div>
      <Stack direction="row" spacing={2} >
        <ProjectProfileFoto />
        <div className='project-Title'>
        {props.project.projectId} - {props.project.projectName}
        </div>
         
      </Stack>
     
    </div>
    
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
</div>
)

}

export default ProjectPage