import './registerUserPage.css';

import Stack from '@mui/material/Stack';
import ImageUploader from '../../components/imageUploader/imageUploader';
import { useEffect, useState } from 'react';
import BasicDatePicker from '../../components/DatePicker/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import dayjs from 'dayjs';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import fullname from '../../assets/icons/name.png'
import nrodni from '../../assets/icons/nrodni.png'

import career from '../../assets/icons/career.png'
import graduado from '../../assets/icons/grado.png'
import subject from '../../assets/icons/subject.png'
import university from '../../assets/icons/university.png'
import user from '../../assets/icons/user.png'
import key from '../../assets/icons/key.png'
import email from '../../assets/icons/mail.png'
import repeat from '../../assets/icons/repeat.png'
import ErrorToast from '../../components/Toast/ErrorToast';
import { useSelector, useDispatch } from 'react-redux'
import { init, login} from '../../features/login/loginAction'
import SuccessToast from '../../components/Toast/SuccessToast';

import MainNavBar from '../../components/mainNavBar/mainNavBar';

const RegisterUserPage = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile.value)

  const [grado, setGrado] = useState('');
  const [gradoOptions, setGradoOptions] = useState([]);
  const [fecNac, setFecNac] = useState('');
  const [repeatedPass, setRepeatedPass] =useState("");
  const [usernameError, setUsernameError] = useState(''); // Estado para el mensaje de error del username

  const [passwordValidationMessage, setPasswordValidationMessage] = useState(''); // Estado para el mensaje de validación
  const [allFieldsCompleted, setAllFieldsCompleted] = useState(false); // Estado para rastrear la completitud de campos
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    dni: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    carreraProfesional: '',
    universidad: '',
    categoria: '',
    fotoPerfil: '',
    principalArea: '',
    username: '',
  });
  // Función para verificar la contraseña
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordValidationMessage('La contraseña debe ser mayor a 8 dígitos y tener al menos un número, una mayúscula y un símbolo');
    } else {
      setPasswordValidationMessage('');
    }
  };

 // Función para verificar si todos los campos están completos
 const checkAllFieldsCompleted = () => {
  const {
    email,
    dni,
    nombreCompleto,
    carreraProfesional,
    universidad,
    principalArea,
    username,
    password
  } = formData;

  const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

  if (
    email !== '' &&
    dni !== '' &&
    nombreCompleto !== '' &&
    fecNac !== '' &&
    carreraProfesional !== '' &&
    universidad !== '' &&
    grado !== '' &&
    profile.payload !== '' &&
    principalArea !== '' &&
    username !== '' &&
    password !== '' &&
    passwordPattern.test(password) &&
    repeatedPass !== '' &&
    repeatedPass === password &&
    !usernameError
  ) {
    setAllFieldsCompleted(true);
  } else {
    setAllFieldsCompleted(false);
  }
};


const handleChangeRepeatPass = (e) => {
  setRepeatedPass(e.currentTarget.value);
}



  const handleDateChange = (date) => {
    setFecNac(dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))
  }

  const handleInputChange = (e) => {
    const { id, value } = e.currentTarget;
    if(id === 'password'){
      validatePassword(value)
    }

        // Validación para el campo "Username"
        if (id === 'username') {
          if (value.length < 6) {
            setUsernameError('El username debe tener al menos 6 caracteres.');
          } else {
            setUsernameError(''); // Borra el mensaje de error si la validación es correcta
          }
        }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleChange = (event) => {
    setGrado(event.target.value);
  };

   // Función para obtener las opciones de "último grado alcanzado" desde el servidor.
   const fetchGradoOptions = async () => {
    try {
      const token = localStorage.getItem('token');
   
      const response = await axios.get(`${apiEndpoint}/Categorias/GetAll`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });

      setGradoOptions(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
          {
            ErrorToast("Acceso no Autorizado")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error en la solicitud")
            }else if(error.response.status === 404){
              ErrorToast("No existen grados académicos ingresados")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
    }
  };

  const registerUserClick = async () => {
    if(repeatedPass ===formData.password ){
      const requestData = {
        email: formData.email,
        password: formData.password,
        perfilModel: {
          dni: formData.dni,
          nombreCompleto: formData.nombreCompleto,
          fechaNacimiento: fecNac,
          carreraProfesional: formData.carreraProfesional,
          universidad: formData.universidad,
          fotoPerfil: profile.payload,
          principalArea: formData.principalArea,
          categoria: grado
        },
        username: formData.username,
      };

      try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${apiEndpoint}/Authentication/registro`, requestData,{
          headers: {
            Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
          },
        });
        if (response.status === 200) {
          // Registro exitoso
          SuccessToast("Usuario Registrado con éxito!! Bienvenido");
          
        }
        dispatch(login());

        // Realiza las acciones que desees después del registro exitoso, como redireccionar a una página de inicio de sesión, mostrar un mensaje de éxito, etc.
      } catch (error) {
         if(error.response.status === 401)
          {
            ErrorToast("Usuario o Contraseña incorrectos, por favor verifique los datos ingresados")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error interno, Usuario no encontrado")
            }else if(error.response.status === 404){
              ErrorToast("Error interno, Usuario no encontrado")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
    
      } 


    } else{
      alert("Contraseñas no coincidentes");
    }
   
  }
  useEffect(() => {
    checkAllFieldsCompleted();
  }, [formData, repeatedPass,profile, fecNac,grado]);

  // Llama a la función para obtener las opciones de grado cuando el componente se monta.
  useEffect(() => {
    fetchGradoOptions();
  }, []);

    return (
      <>
               <MainNavBar />

        <div className='registerUser container-fluid  d-flex flex-grow-1 flex-column'>
      <div className='row  registerUserRow d-flex  flex-grow-1  align-items-center' >
      <div className='registerPage col  col-12 '>
                <div className="card">
                <IconButton onClick={() => dispatch(init())}  className="backButton" aria-label="back">
              <ArrowBackIcon />
            </IconButton>
                <div className="card-body py-5">
                    <h5 className="card-title my-3">¡Bienvenid@!</h5>
                    <h6 className="card-subtitle mb-5  text-muted">
                     <p>¡Qué bueno tenerte a bordo! </p> 
                      <p>Quisiéramos saber un poco más sobre vos:</p> </h6>
                      <div className="container">
                        <div className="row d-flex  my-3 justify-content-evenly">
                          <div className="formColumn col  col-12 col-sm-12 col-md-4  col-lg-4 col-xl-4">
                                  <Stack spacing={2}>
                                    <div>
                                      <p style={{marginBottom:0}}>Subí una foto para tu perfil de usuario:</p>
                                    <ImageUploader />
                                    </div>
                                  
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={fullname} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="nombreCompleto" label="Nombre y Apellido Completo" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                   
                                    
                                  </Stack>
                          </div>
                          <div className="formColumn col col-12 col-sm-12 col-md-4  col-lg-4 col-xl-4">
                          <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={nrodni} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="dni" label="Número de documento" type="number" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                  <BasicDatePicker id='fechaNacimiento' label="Fecha de Nacimiento" changeHandler={(date) => handleDateChange(date)}/>
                                  
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={subject} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="principalArea" label="Principal Área de Investigación" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={career} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="carreraProfesional" label="Carrera Universitaria" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                
                                   
                                          <img className='icons' src={graduado} height="24" width="24" alt="Grado" />
                                          <div className='selectorContainer'>
                                          <FormControl variant="standard" sx={{ m: 1 , minWidth: '100%' }}>
                                      <InputLabel id="demo-simple-select-standard-label">Último grado alcanzado</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={grado}
                                        onChange={handleChange}
                                        label="Último grado alcanzado"
                                      >
                                        <MenuItem value="">
                                          <em>Último grado alcanzado</em>
                                        </MenuItem>
                                        {gradoOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.nombreCategoria} {/* Asume que "nombre" es el nombre del grado. */}
                                            </MenuItem>
                                          ))}
                                      </Select>
                                      </FormControl>
                                      </div>

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={university} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="universidad" label="Universidad" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                    </Stack>
                          </div>

                          <div className="formColumn col col-12 col-sm-12 col-md-4  col-lg-4 col-xl-4">
                          <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={email} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="email" label="Correo electrónico" type="email" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                                                  
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={user} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="username" label="Nombre de Usuario" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                    {/* Mensaje de error del campo "Username" */}
                                {usernameError && (
                                  <div style={{ color: 'red' }}>{usernameError}</div>
                                )}

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={key} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="password" label="Contraseña" type="password" variant="standard" onChange={handleInputChange}/>

                                    </Box>
                                      {/* Mensaje de validación de contraseña */}
                                      <p style={{ color: 'red' }}>{passwordValidationMessage}</p>

                                    
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={repeat} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="repeat-password" label="Confirmar Contraseña"  type="password" variant="standard" onChange={handleChangeRepeatPass}/>

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <button type="button" className="createBtn shadow-sm  btn btn-primary px-4 rounded-pill  " disabled={!allFieldsCompleted} onClick={registerUserClick}>Crear Cuenta</button>
                                    </Box>
                                    </Stack>
                          </div>
                        </div>
                        </div>
                  </div>
          </div>

        </div>

       
      </div>
  
    </div> 
    </>
    )
    }
    
    export default RegisterUserPage ;