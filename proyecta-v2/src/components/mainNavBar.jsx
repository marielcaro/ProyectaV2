import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import icon from '../assets/icons/proyectaIcon.png';
import './mainNavBar.css';
const MainNavBar = () => {


return (
<Navbar className='mainNavBar'>
        <Container>
          <Navbar.Brand id='logo' href="#home">
            <img
              alt=""
              src={icon}
              width="36"
              height="36"
              className="d-inline-block align-top"
            />{' '}
            Proyecta
            
          </Navbar.Brand>

          <Button  variant="light">
            Acceder
          </Button>
        </Container>
</Navbar>
    
)
}

export default MainNavBar ;