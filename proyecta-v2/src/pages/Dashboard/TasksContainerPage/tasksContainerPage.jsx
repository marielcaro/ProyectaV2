
import './tasksContainerPage.css'
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Taskboard from './Taskboard';
import Grid from '@mui/material/Unstable_Grid2';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const TasksContainerPage = () => {
  const projects =['Proyecto 1','Proyecto 2','Proyecto 3','Proyecto 4'];

  const [project, setProject] = React.useState('');

  const items = (elements) => {
    let listItem = [];

        for(var i=0;i<elements.length;i++){
          // push the component to elements!
          listItem.push( <MenuItem value={i}> {elements[i]} </MenuItem>);
    }

    return listItem;
}

  const theme = createTheme({
    palette: {
      primary: {
        light: '#EB5401',
        main: '#EB5401',
        dark: ' #EB5401',
        contrastText: '#ffffff',
      },
    },
  });
  const handleChange = (event) => {
    setProject(event.target.value);
  };
    return(
        <div>

            <div  className="selectProjectBar mb-3 p-2 shadow-sm">
           
                  <Box sx={{ minWidth: 120 }}>
                  <Grid container spacing={2}>
                    <Grid xs={8}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Seleccionar Proyecto ...</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={project}
                          label="Seleccionar Proyecto ..."
                          onChange={handleChange}
                        >
                            {items(projects)}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid className="gridButton py-2" xs={4}>
                      <ThemeProvider theme={theme}>
                        <Button className="newTask ms-0 my-2" variant="contained" color="primary"> <AddIcon sx={{ color: grey[50] }}/>Nueva Tarea</Button>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
          </Box>
        
            </div>
            
            <div>
              <Taskboard />
            </div>
   
         </div>
     )
}

export default TasksContainerPage