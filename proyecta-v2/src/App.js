import 'popper.js/dist/umd/popper.min.js'; 
import './App.css';
import MainPage from './pages/mainPage';
import RegisterUserPage from './pages/RegisterUser/registerUserPage';
import LoginAlone from './pages/LoginAlone';

import Dashboard from './pages/Dashboard/dashboard';

import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const login = useSelector((state) => state.login.value)
  const isMobile = window.innerWidth < 768; // Define el ancho que consideras como mobile


  const Page  = () => {
        if (isMobile && login === 'Recover') {
          return <LoginAlone />;
        } else {
        switch (login) {
          case 'Login':
            return   (<LoginAlone />)
          case 'Access':
            return   (<Dashboard />)
          
          case 'Exit':
            return (<MainPage />)
        
          case 'Initial':
            return (<MainPage />)

            case 'Register':
            return (<RegisterUserPage />)
            

            case 'Create':
              return (<MainPage />)
            case 'Recover':
              return (<MainPage />)
            default:
              break;

      };
    }

  }

  return (
    <div className="App">
      {Page()}
      <ToastContainer />
   
    </div>
  );
}

export default App;
