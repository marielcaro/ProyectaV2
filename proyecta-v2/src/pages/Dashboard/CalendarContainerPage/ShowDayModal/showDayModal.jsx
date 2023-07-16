import React from 'react';
import './showDayModal.css';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

const ShowDayModal = (props) => {

  const [isOpen, setIsOpen] = useState(props.showModal);

  console.log(isOpen)
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


return(
  <div>
  <div className="modal fade" show={isOpen.toString()} onHide={closeModal} id="ModalDay" tabindex="-1" aria-labelledby="ModalDay" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> "text"</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body px-4">
              Modal
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Cerrar</button>
              <button type="button" className="btn btn-primary">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    
   </div>
)

}

export default ShowDayModal;
