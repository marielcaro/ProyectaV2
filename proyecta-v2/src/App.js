import logo from './logo.svg';
import './App.css';
import MainNavBar from './components/mainNavBar/mainNavBar';
import MainPage from './pages/mainPage';
import RegisterUserPage from './pages/RegisterUser/registerUserPage';

import Dashboard from './pages/Dashboard/dashboard';
function App() {
  return (
    <div className="App">
      {/* <MainNavBar /> */}
  
      <Dashboard />
    {/* <RegisterUserPage/> */}
      {/* <MainPage /> */}
    </div>
  );
}

export default App;
