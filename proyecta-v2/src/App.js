import 'popper.js/dist/umd/popper.min.js'
;
 
import logo from './logo.svg';
import './App.css';
import MainNavBar from './components/mainNavBar/mainNavBar';
import MainPage from './pages/mainPage';
import RegisterUserPage from './pages/RegisterUser/registerUserPage';
import LoginAlone from './pages/LoginAlone';

import Dashboard from './pages/Dashboard/dashboard';

import { useSelector, useDispatch } from 'react-redux'
import { access, exit,  init } from './features/login/loginAction'

function App() {
  const login = useSelector((state) => state.login.value)

  const dispatch = useDispatch()

  const Page  = () => {
    switch (login) {
      case 'Login':
        return   (<LoginAlone />)
      break;
      case 'Access':
        return   (<Dashboard />)
      break;
      case 'Exit':
        return (<MainPage />)
        break;
     
      case 'Initial':
        return (<MainPage />)
        break;

         case 'Register':
        return (<RegisterUserPage />)
        break;

        case 'Create':
          return (<MainPage />)
          break;
        case 'Recover':
          return (<MainPage />)
        break;

  };

  }

  return (
    <div className="App">
      {Page()}
      
  
      {/* <Dashboard /> */}
    {/* <RegisterUserPage/> */}
   
    </div>
  );
}

export default App;
