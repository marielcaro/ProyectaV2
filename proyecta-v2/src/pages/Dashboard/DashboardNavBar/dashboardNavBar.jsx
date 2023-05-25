import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch } from 'react-redux'
import { access, exit } from '../../../features/login/loginAction'

import icon from '../../../assets/icons/proyect.png';
import notificacion from '../../../assets/icons/notificacion.png';
import './dashboardNavBar.css';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import image from '../../../assets/images/sampleImage.jpg';
import menu from '../../../assets/icons/menu.png';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

import { useState } from "react";
import {useFloating,  offset,  flip,  shift } from '@floating-ui/react';
import { useClick, useInteractions} from '@floating-ui/react';

import UserIconButton from './userIconButton';
import NotificationIconButton from './notificationsIconButton';


const DashboardNavBar = () => {

  const dispatch = useDispatch()
  const { toggleSidebar, collapseSidebar, broken, collapsed, toggled } = useProSidebar();
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

  const click = useClick(context);
 

  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
  ]);
  
  
  const HandleToggleCollapsed = (toggled, collapsed) => {
      if(broken === false){
        console.log(broken)
        collapseSidebar()
       
      
      }else{
        toggleSidebar()
      }
     
  }
return (
<Navbar className='DashboardNavBar shadow-sm'>
        <Container>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <div className='toggleButton'  checked={collapsed }  onClick={(toggled,collapsed) => HandleToggleCollapsed(toggled,collapsed)}>
            <img className='toggleImage' src={menu} alt='menu' /> 
          </div>
          <Navbar.Brand id='logoDashboard' href="#dashboard">
            <img
              alt=""
              src={icon}
              width="36"
              height="36"
              className="d-inline-block align-top"
            />{' '}
            Proyecta
            
          </Navbar.Brand>

          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        
            <NotificationIconButton />
            
            <UserIconButton />
          
          </Box>

        </Container>
</Navbar>
    
)
}

export default DashboardNavBar ;