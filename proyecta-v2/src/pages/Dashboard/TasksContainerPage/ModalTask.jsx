import React from 'react';
import './tasksContainerPage.css';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import image from '../../../assets/images/project-management.png'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicDatePicker from '../../../components/DatePicker/DatePicker';

const ModalTask = (props) => {
const members = props.taskData.taskMembers;

    return (

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"> {props.taskData.taskName}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body px-4">
          <Stack spacing={4}  sx={{padding: '4px'}}>
             <TextField id="projectName" label="Proyecto" variant="standard" />
             <BasicDatePicker label="Fecha de Finalización"/>
             <TextField id="taskDetail" multiline label="Descripción" variant="standard" />
             <Autocomplete
                    multiple
                    id="tags-standard"
                    options={members}
                    getOptionLabel={(option) => option.label}
                    defaultValue={[members[0]]}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Integrantes"
                        placeholder="Añadir..."
                    />
                    )}
      />
             <TextField id="taskAuthor" label="Creador" value={props.taskData.taskAuthor} variant="standard"></TextField>
          </Stack>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
   
    )
}

export default ModalTask;