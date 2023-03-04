import UserMenu from './userMenu';
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

import { foto, initial } from '../../../features/profileImage/profileAction'

const UserIconButton = () => {

  const profile = useSelector((state) => state.profile.value)

  const dispatch = useDispatch()

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
        <>
         <Avatar  ref={refs.setReference} {...getReferenceProps()} className="AvatarButton" alt="Orianna Queen" src={profile.payload === undefined ? "Orianna Queen" : profile.payload}/>
            {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content',
          }}
          {...getFloatingProps()}
        >
          <UserMenu />


        </div>
      )}

  </>
    )
}

export default UserIconButton