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
import EditIcon from '@mui/icons-material/Edit';
import { extractColors } from 'extract-colors'
import {useFloating,  offset,  flip,  shift } from '@floating-ui/react';
import { useClick, useInteractions} from '@floating-ui/react';
import {useDismiss} from '@floating-ui/react'
import EditProjectMenu from './editProjectMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import InformationProjectPage from './informationProjectPage.jsx'
import MembersListPage from './membersListPage';
import EditFotoModal from './editFotoModal';

const ProjectPage = (props) => {
    const [value, setValue] = React.useState('1');
 const [image, setImage] = useState(props.project.icon)
 const [dominantColor, setDominantColor] = useState(null);
 const [textColor, setTextColor] = useState(null);
 const [editFotoModalShow, setEditFotoModalShow] =useState(false);

 const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    const handleBackClick = () => {
      props.backTrack()
    }

    const handleEditFoto =()=>{
      setEditFotoModalShow(true)
    }

    const handleHideEditFoto =()=>{
      setEditFotoModalShow(false)
    }

    const [isOpen, setIsOpen] = useState(false);

    const {x, y, strategy, refs, context} = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement:'bottom-end',
        middleware: [offset({
        mainAxis: 10,
        alignmentAxis: 1,
      }), shift()],
    });
  
    const dismiss = useDismiss(context);
    const click = useClick(context);
   
  
    const {getReferenceProps, getFloatingProps} = useInteractions([
      click, dismiss
    ]);

    const getContrast = (color) => {
      const rgb = color.match(/\d+/g);
      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return brightness >= 128 ? 'black' : 'white';
    };

    useEffect(() => {
      extractColors(image)
      .then((color) => {setDominantColor(color[0])})
      .catch(console.error)

    },[image])

    useEffect(()=> {
      if(props.project.icon)
        setImage(props.project.icon)
    },[props.project.icon])
      


    useEffect(()=> {
      if(dominantColor)
          setTextColor(getContrast(`rgb(${dominantColor?.red}, ${dominantColor?.green}, ${dominantColor?.blue})`))
    },[dominantColor])
   
    
return(
<div className="pagerContainter">

     <div className="titleBox" style={{background:  `rgb(${dominantColor?.red}, ${dominantColor?.green}, ${dominantColor?.blue}) `}}>
      <div className="row">
          <Stack className="col" direction="row" spacing={2} >
            <ProjectProfileFoto image={image} />
            <Stack className="titleStack" >
            <div className='project-Title' style={{color: textColor }}>
             {props.project.projectName}
            </div>
            <div className='project-Subtitle' style={{color: textColor }}>
             Resol. {props.project.resolucion}
            </div>
            </Stack>
          </Stack>
        
          <div className="col" style={{ position: 'relative' }}>
          <Tooltip title="Volver atrás">
          <Fab
            className="backSelectButton"
            onClick={handleBackClick}
            style={{
              background: 'white',
              color: 'black',
              position: 'absolute',
              top: '16px',
              right: '8px',
              zIndex: 2,
            }}
          >
            <ArrowBackIcon  />
          </Fab>
          </Tooltip>
          <Fab
          ref={refs.setReference} {...getReferenceProps()}
            className="editProjectButton"
            style={{
              background: 'white',
              color: 'orange',
              position: 'absolute',
              bottom: '16px',
              right: '8px',
              zIndex: 2,
            }}
          >
            <EditIcon />
          </Fab>
          {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content',
            zIndex: 3
          }}
          {...getFloatingProps()}
        >
          <EditProjectMenu   handleShowFoto={handleEditFoto}/>


        </div> )}
        </div>
        </div>
        </div> 
   
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"   variant="scrollable"
  scrollButtons
  allowScrollButtonsMobile centered>
            <Tab label="Información General" value="1" />
            <Tab label="Integrantes" value="2" />
          
          </TabList>
        </Box>
        <TabPanel value="1"><InformationProjectPage project={props.project} /></TabPanel>
        <TabPanel value="2">< MembersListPage members={props.project.allProjectMembers}/></TabPanel>
  
      </TabContext>
    </Box>

  <EditFotoModal show={editFotoModalShow}  handleHide={handleHideEditFoto} editFoto={(id,img) => props.editFoto(id,img)}  />
</div>
)

}

export default ProjectPage