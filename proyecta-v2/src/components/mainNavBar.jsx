import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import icon from '../assets/icons/proyectaIcon.png';
import './mainNavBar.css';
const MainNavBar = () => {


return (
<Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand id='logo' href="#home">
            <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <h3 className='NavBarTitle'>
                Proyecta
            </h3>
          
          </Navbar.Brand>
        </Container>
</Navbar>
    
)
}

export default MainNavBar ;