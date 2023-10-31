import 'popper.js/dist/umd/popper.min.js'; 
import './App.css';
import MainPage from './pages/mainPage';
import RegisterUserPage from './pages/RegisterUser/registerUserPage';
import LoginAlone from './pages/LoginAlone';

import Dashboard from './pages/Dashboard/dashboard';

import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
   
    </div>
  );
}

export default App;
