
import './inicioSesion.css';
import * as React from 'react';

import Acceder from './acceder.jsx';
import CrearCuenta from './crearCuenta.jsx';
import RecuperarCuenta from './recuperarCuenta';
import { useSelector, useDispatch } from 'react-redux'

const InicioSesion = () => {

  const login = useSelector((state) => state.login.value)

  console.log(login);
  const changeCardUI = () => {
          switch (login) {
            case 'Login':
              return   (<Acceder />)
           
            case 'Access':
        return   (<Acceder />)
     
      case 'Exit':
        return (<Acceder />)
       
          case 'Create':
            return (<CrearCuenta />)
           
          case 'Recover':
            return (<RecuperarCuenta />)
         

          case 'Initial':
            return (<Acceder />)
          default:
            break;

      };

  };

    return (
    
      <div className='box d-flex  mx-auto my-1  px-4  align-items-center  '>
   
          {changeCardUI()}
        </div>
    
    )
    }
    
    export default InicioSesion ;