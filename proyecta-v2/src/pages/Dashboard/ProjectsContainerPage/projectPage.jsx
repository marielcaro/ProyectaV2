import React, { useEffect, useState } from 'react';
import './projectsContainerPage.css'
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import EditProjectModal from './editProjectModal';
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
import DeleteModal from './deleteModal';
import greyIcon from '../../../assets/icons/grey.png'


const ProjectPage = (props) => {
    const [value, setValue] = React.useState('1');
    const [id,setId] = useState(props.project.id)
 const [image, setImage] = useState(props.project.fotoPerfil)
 const [dominantColor, setDominantColor] = useState(null);
 const [textColor, setTextColor] = useState(null);
 const [editFotoModalShow, setEditFotoModalShow] =useState(false);
 const [editInfoModalShow, setEditInfoModalShow] =useState(false);
 const [deleteModalShow, setDeleteModalShow] =useState(false);


 const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    const handleBackClick = () => {
      props.backTrack()
    }

    const handleEditFoto =()=>{
      setEditFotoModalShow(true)

    }

    const handleEditInfo =()=>{
      setEditInfoModalShow(true)

    }

    const handleDeleteModal =()=>{
      setDeleteModalShow(true)

    }

    const handleHideEditFoto =()=>{
      setEditFotoModalShow(false)
    }

       const handleHideEditInfo =()=>{
        setEditInfoModalShow(false)
    }

    const handleHideDeleteModal =()=>{
      setDeleteModalShow(false)
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
      if(image){
        extractColors(image)
        .then((color) => {setDominantColor(color[0])})
        .catch(console.error)
      }else{
        extractColors(greyIcon)
        .then((color) => {setDominantColor(color[0])})
        .catch(console.error)
      }
    

    },[image])

    useEffect(()=> {
      if(props.project.fotoPerfil){
        setImage(props.project.fotoPerfil)
      
      }
    },[props.project.fotoPerfil])
      
    useEffect(()=> {
      if(props.project.id)
      setId(props.project.id)
    },[props.project.id])

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
             {props.project.nombreProyecto}
            </div>
            <div className='project-Subtitle' style={{color: textColor }}>
             Resol. {props.project.nroResolucion}
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
          <EditProjectMenu   handleShowFoto={handleEditFoto} handleShowEditInfo={handleEditInfo} handleShowDelete={handleDeleteModal}/>


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
        <TabPanel value="1"><InformationProjectPage project={props.project} editLinks={(id,section, list) =>props.editLinks(id,section,list)}/></TabPanel>
        <TabPanel value="2">< MembersListPage projectId={props.project.id} members={props.project.integrantes}/></TabPanel>
  
      </TabContext>
    </Box>

   
    <DeleteModal show={deleteModalShow} projectId={id} handleHide={handleHideDeleteModal} deleteData={(id) => props.deleteProject(id)}/>
     <EditProjectModal show={editInfoModalShow} projectId={id}  project={props.project} handleHide={handleHideEditInfo} editInfo={(id,obj) => props.editInfo(id,obj)}  />
  <EditFotoModal show={editFotoModalShow}  fotoId={id} handleHide={handleHideEditFoto} editFoto={(id,img) => props.editFoto(id,img)}  />
</div>
)

}

export default ProjectPage