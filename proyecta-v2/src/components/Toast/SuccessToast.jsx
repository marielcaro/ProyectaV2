import { toast } from 'react-toastify';

const SuccessToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000, // Cerrar el toast automáticamente después de 5 segundos
  });
};

export default SuccessToast;