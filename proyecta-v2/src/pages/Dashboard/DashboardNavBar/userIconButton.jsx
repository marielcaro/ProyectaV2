import UserMenu from './userMenu';

import axios from 'axios';

import { useDispatch } from 'react-redux'

import './dashboardNavBar.css';

import Avatar from '@mui/material/Avatar';

import { useEffect, useState } from "react";
import {useFloating,  offset,  flip,  shift } from '@floating-ui/react';
import { useClick, useInteractions} from '@floating-ui/react';
import {useDismiss} from '@floating-ui/react'
import ErrorToast from '../../../components/Toast/ErrorToast';
import { foto } from '../../../features/profileImage/profileAction'

const UserIconButton = () => {

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [userInfo, setUserInfo] = useState(null);
  const [profile, setProfile] = useState("");
  
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');

      // Obtiene el userName almacenado en localStorage
    const userId = localStorage.getItem('userId');

    const url = `${apiEndpoint}/User/user-info-by-id/${userId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      setUserInfo(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error interno, Usuario no encontrado")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Usuario no encontrado")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchFotoProfile = async () => {
    try {
    const token = localStorage.getItem('token');

    const url = `${apiEndpoint}/Perfil/InfoResume/${userInfo.perfilId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      localStorage.setItem('perfilId', userInfo.perfilId);
      setProfile(response.data.fotoPerfil); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error interno, Usuario no encontrado")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Usuario no encontrado")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };
  
  // const profile = useSelector((state) => state.profile.value)

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

    useEffect(() =>{
      if(profile){
        dispatch (foto(profile));
      }
    },[profile])

    useEffect(()=> {
      if(userInfo){
        fetchFotoProfile()
      }

    },[userInfo]);

    useEffect(() => {
      fetchUserInfo()
    },[])

    return (
        <>
         <Avatar  ref={refs.setReference} {...getReferenceProps()} className="AvatarButton" alt="Orianna Queen" src={profile === undefined ? "Orianna Queen" : profile}/>
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
          <UserMenu />


        </div>
      )}

  </>
    )
}

export default UserIconButton