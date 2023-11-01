
import MainNavBar from '../components/mainNavBar/mainNavBar';

import InicioSesion from '../components/InicioSesion/inicioSesion';

import './LoginAlone.css';

const LoginAlone = () => {



    return (
      <>
         <MainNavBar />
        <div className='welcome container-fluid d-flex flex-grow-1 flex-column'>
      <div className='row  d-flex flex-grow-1  align-items-center' >
        
        <div className='inicioSesionMobile col col-12 col-sm-12 col-md-8 col-lg-6 col-xxl-4 '>
          <InicioSesion />

        </div>
        </div>
        </div>
    </>
    )
    }
    
    export default LoginAlone ;