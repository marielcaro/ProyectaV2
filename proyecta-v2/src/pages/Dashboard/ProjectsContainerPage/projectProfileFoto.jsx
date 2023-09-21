import React, { useState,useEffect } from 'react';

import './projectProfileFoto.css';

const ProjectProfileFoto = (props) => {
const [image, setImage ]=useState(props.image) 
  const [profileImage, setProfileImage] = useState(image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => { 
    setImage(props.image)
  
  },[props.image])

  useEffect(() => { 
    setProfileImage(image)
  
  },[image])

  return (
    <div className="user-profile">
      <div className="profile-image">
        <img src={profileImage} alt="Profile" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
    </div>
  );
};

export default ProjectProfileFoto;