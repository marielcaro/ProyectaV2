
import welcomeImg from  '../assets/images/teamwork1.png'
import MainNavBar from '../components/mainNavBar/mainNavBar';

import InicioSesion from '../components/InicioSesion/inicioSesion';
import { useSelector, useDispatch } from 'react-redux'

import './mainPage.css';

const MainPage = () => {

  const login = useSelector((state) => state.login.value)
  const dispatch = useDispatch()

    return (
      <>
         <MainNavBar />
        <div className='welcome container-fluid d-flex flex-grow-1 flex-column'>
      <div className='row  d-flex flex-grow-1  align-items-center' >
        <div className='portada col  col-12 col-sm-12 col-md-4  col-lg-6 col-xxl-8'>
          <div className='portadaPrincipal my-4'> 
               <h3> Investigación Colaborativa</h3>
               <h3> Universidad Nacional de Santiago del Estero </h3>
        </div>
        <div className='imagenPortada my-4'>
        <img src={welcomeImg} id='welcomeImg' className="img-fluid" alt="teamwork"/>

        </div>
        </div>
        <div className='inicioSesion col col-12 col-sm-12 col-md-8 col-lg-6 col-xxl-4 '>
          <InicioSesion />

        </div>
      </div>
  
    </div> 
    </>
    )
    }
    
    export default MainPage ;