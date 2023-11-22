import React, {useState, useEffect, useRef} from 'react';
import './imageUploader.css';
import { useSelector, useDispatch } from 'react-redux'
import { foto } from '../../features/profileImage/profileAction'



const ImageUploader = ({ initialImage }) => {
 
    const convertToBase64 = (file) => {
        const reader = new FileReader()
           
        reader.readAsDataURL(file)
    
        reader.onload = () => {
         setBase(reader.result)
      
        return reader.result
        }
    }
    

    const profile = useSelector((state) => state.profile.value)

  
    // const[image, setImage] = useState(null);
    const[previewUrl, setPreviewUrl] = useState(initialImage || ''); //useState(profile); 
    const[base, setBase] = useState(""); 

    const dispatch = useDispatch()

    const handleFile =async file => {
            //    const fileBase = convertToBase64 (file)
            // if (file.size > 64 * 1024) {
            //     // Si el archivo es mayor a 64 KB, muestra un mensaje de error
            //     alert('Sube una imagen menor a 64 KB');
            //     return; // Sale de la función sin procesar el archivo
            // }
            // Crear una función para comprimir la imagen
            const compressImage = async image => {
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    console.log('image')

                    img.onload = () => {
                        const maxWidth = 300; // Ancho máximo deseado
                        const maxHeight = 300; // Altura máxima deseada

                        let width = img.width;
                        let height = img.height;

                        // Redimensionar la imagen si excede el tamaño máximo
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;

                        ctx.drawImage(img, 0, 0, width, height);

                        // Convertir la imagen del canvas a base64
                        canvas.toBlob(
                            blob => {
                                const reader = new FileReader();
                                reader.readAsDataURL(blob);
                                reader.onloadend = () => {
                                    resolve(reader.result);
                                };
                            },
                            'image/jpeg',
                            0.7 // Calidad de compresión (0.7 es un buen valor)
                        );
                    };
                        console.log(img.sizes);
                    img.onerror = error => reject(error);

                    img.src = URL.createObjectURL(image);
                });
            };

            try {
                console.log('image')

                const compressedImageBase64 = await compressImage(file);
                setBase(compressedImageBase64);
                dispatch(foto(compressedImageBase64));
                setPreviewUrl(compressedImageBase64);
            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
            }

        // setBase(fileBase)
        // dispatch (foto(base));
        // setPreviewUrl(URL.createObjectURL(file));
    }

   

    const fileInput = useRef(null);

    const handleDragOver = event => {
        event.preventDefault();
    }
    const handleOnDrop = event => {
        event.preventDefault(); 
        event.stopPropagation(); 
       
        let imageFile = event.dataTransfer.files[0];
        handleFile(imageFile);
    }


    React.useEffect(()=> {
        if(base !== ""){
        
            dispatch (foto(base));
            setPreviewUrl(base);
        }
    }, [base, dispatch])

return (

    <div className="wrapper">
        <div 
          className="drop_zone"
          style={ {backgroundImage: `url(${previewUrl})`}}
          onDragOver = {handleDragOver}
          onDrop = {handleOnDrop}
          onClick = { () => fileInput.current.click()}
        > 
   
         <div className='imageBox'>
                   <p>Arrastrar y soltar imagen aquí...</p>
          </div> 
          <input 
           type="file" 
           accept='image/*' 
           ref={fileInput} hidden 
           onChange={e => handleFile(e.target.files[0])}
          />
          </div >
       
       
   </div>
)

}


export default ImageUploader;