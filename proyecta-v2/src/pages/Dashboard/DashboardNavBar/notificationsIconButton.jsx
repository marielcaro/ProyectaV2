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
import {useDismiss} from '@floating-ui/react'

import NotificationsList from './notificationsList';
const NotificationIconButton = () => {
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
    

    return (
        <div>
        <div ref={refs.setReference} {...getReferenceProps()}  className='iconButton position-relative'> 
        <span className="dotBadge position-absolute  translate-middle p-1 bg-danger border border-light rounded-circle">
          <span className="visually-hidden">New alerts</span>
        </span>
      </div>

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

<NotificationsList/>
        </div>
        )}

        </div >

    )
    
}

export default NotificationIconButton