import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const refreshToken = async () => {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const perfilId = localStorage.getItem('perfilId');
  
    if (!token || !refreshToken) {
      // No hay token de acceso o token de renovación disponibles.
      return null;
    }
  
    const tokenData = jwtDecode(token);
    const currentTime = Date.now() / 1000;
  
    if (tokenData.exp > currentTime) {
      // El token de acceso aún no ha expirado.
      return token;
    }
  
    // El token de acceso ha expirado, intenta renovarlo.
    const response = await axios.post(`${apiEndpoint}/Authentication/refresh-token`, {
      Username: perfilId,
      RefreshToken: refreshToken,
    });
  
    if (response.data && response.data.token) {
      // Actualiza el token de acceso y almacenamiento local.
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    }
  
    // La renovación del token no tuvo éxito.
    return null;
  };

  export { refreshToken };