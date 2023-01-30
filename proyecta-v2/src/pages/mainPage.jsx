import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import welcomeImg from  '../assets/images/teamwork1.png'

import InicioSesion from '../components/InicioSesion/inicioSesion';

import './mainPage.css';

const MainPage = () => {


    return (
        <div className='welcome container-fluid d-flex flex-grow-1 flex-column'>
      <div className='row  d-flex flex-grow-1  align-items-center' >
        <div className='portada col  col-12 col-sm-12 col-md-4  col-lg-6 col-xl-6'>
          <div className='portadaPrincipal my-4'> 
               <h3> Investigación Colaborativa</h3>
               <h3> Universidad Nacional de Santiago del Estero </h3>
        </div>
        <div className='imagenPortada my-4'>
        <img src={welcomeImg} id='welcomeImg' className="img-fluid" alt="teamwork"/>

        </div>
        </div>
        <div className='inicioSesion col col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 '>
          <InicioSesion />

        </div>
      </div>
  
    </div> 
    )
    }
    
    export default MainPage ;