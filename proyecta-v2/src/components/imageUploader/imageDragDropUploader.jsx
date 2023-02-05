
import { FileUploader } from "react-drag-drop-files";
import React, {useState, useEffect} from 'react';

import './imageDragDropUploader.css';



const ImageDragDropUploader = () => {

   
  const [file, setFile] = useState(null);
 
  const fileTypes = ["JPG", "PNG", "GIF"];

 
//   const [image, setImage] = useState ();
    const [imageURL, setImageURL] = useState ();
   

        const ImageComponent = () => {
            if(file !== null) {
                return (<img src= {imageURL} />);

            }else{
                return ("Tocar Aquí");
            }
        }

        const boxBeforeImage = <div className='boxImage'> {ImageComponent}</div>

    useEffect (() =>{
        if (!file) {
            setImageURL(undefined)
            return
        }
    
            const newImageUrl = URL.createObjectURL(file);
            setImageURL (newImageUrl);
 
        
            return () => URL.revokeObjectURL(newImageUrl)
        }, [file])
    


        const handleChange = (file) => {
            setFile(file);
          };
        
       
    
  return (
    <div>
    
    <FileUploader  children={boxBeforeImage} handleChange={handleChange} name="file" types={fileTypes} />
   <ImageComponent />
    </div>
  );

}

export default ImageDragDropUploader;