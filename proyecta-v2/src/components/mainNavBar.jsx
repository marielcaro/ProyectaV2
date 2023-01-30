import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch } from 'react-redux'
import { access, exit } from '../features/login/loginAction'

import icon from '../assets/icons/proyectaIcon.png';
import './mainNavBar.css';
const MainNavBar = () => {

  const dispatch = useDispatch()

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

          <Button onClick={() => dispatch(access())}  variant="light">
            Acceder
          </Button>
        </Container>
</Navbar>
    
)
}

export default MainNavBar ;