import React, {useState, useEffect, useRef} from 'react';
import './imageUploader.css';

import uploadIcon from "../../assets/icons/upload.png"

const ImageUploader = () => {
    
    const[image, setImage] = useState(null);
    const[previewUrl, setPreviewUrl] = useState(uploadIcon); 
    const handleFile = file => {
        //you can carry out any file validations here...
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    const fileInput = useRef(null);

    const handleDragOver = event => {
        event.preventDefault();
    }
    const handleOnDrop = event => {
        //prevent the browser from opening the image
        event.preventDefault(); 
        event.stopPropagation(); 
        //let's grab the image file
        let imageFile = event.dataTransfer.files[0];
        handleFile(imageFile);
    }



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
                   <p>Arrastrar y soltar imagen aquí ...</p>
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