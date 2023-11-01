import React, {useState, useEffect, useRef} from 'react';
import './fotoUploader.css';
import uploadIcon from "../../../assets/icons/upload.png"

const FotoUploader = (props) => {
 
    const convertToBase64 = (file) => {
        const reader = new FileReader()
           
        reader.readAsDataURL(file)
    
        reader.onload = () => {
         setBase(reader.result)
      
        return reader.result
        }
    }
    

    // const profile = useSelector((state) => state.profile.value)

  
    // const[image, setImage] = useState(null);
    const[previewUrl, setPreviewUrl] = useState(uploadIcon); 
    const[base, setBase] = useState(""); 

    // const dispatch = useDispatch()

    const handleFile = file => {
        const fileBase = convertToBase64 (file)

        setBase(fileBase)
    
        // dispatch (foto(base));
        setPreviewUrl(URL.createObjectURL(file));
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
        
            props.changeFoto(base)
            setPreviewUrl(base);
        }
    }, [base])

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


export default FotoUploader;