
import './inicioSesion.css';
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Acceder from './acceder.jsx';
import CrearCuenta from './crearCuenta.jsx';
import RecuperarCuenta from './recuperarCuenta';
import { useSelector, useDispatch } from 'react-redux'
import { access, recover, exit, create, init } from '../../features/login/loginAction'

const InicioSesion = () => {

  const login = useSelector((state) => state.login.value)
  const dispatch = useDispatch()

  console.log(login);
  const changeCardUI = () => {
          switch (login) {
          case 'Access':
            return   (<Acceder />)
          break;
          case 'Create':
            return (<CrearCuenta />)
            break;
          case 'Recover':
            return (<RecuperarCuenta />)
          break;

          case 'Initial':
            return (<Acceder />)
            break;

      };

  };

    return (
    
      <div className='box d-flex  mx-auto my-4  p-5 align-items-center  '>
   
          {changeCardUI()}
        </div>
    
    )
    }
    
    export default InicioSesion ;