import logo from './logo.svg';
import './App.css';
import MainNavBar from './components/mainNavBar';
import MainPage from './pages/mainPage';
import RegisterUserPage from './pages/RegisterUser/registerUserPage';
function App() {
  return (
    <div className="App">
      <MainNavBar />
    
    <RegisterUserPage/>
      {/* <MainPage /> */}
    </div>
  );
}

export default App;
