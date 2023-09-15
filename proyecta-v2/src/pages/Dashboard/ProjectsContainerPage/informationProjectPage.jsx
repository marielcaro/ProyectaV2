import React, { useEffect, useState } from 'react';
import './informationProjectPage.css'
import Stack from '@mui/material/Stack';
import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const InformationProjectPage = (props) => {


return(
    <div className="infoProjectContainer">
        <div className="Description">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <h4 className='titleDesc'> Descripción:</h4>
         
        </div>     
            <div className="descriptionText"> 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
            <hr></hr>
        </div>
        <div className="linksToDocumentationProject">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <h4 className='titleDesc'> Documentación del Proyecto:</h4>      
        <IconButton aria-label="Editar" color="primary">
            <EditIcon />
          </IconButton>
        </div> 
            <div className="linksProject"> 
           Aquí podés encontrar más información respecto al proyecto:
            </div>
            <div className="linkListContainer">
                <ul>
                    <li><a href="./">Documento de Resolución</a></li>
                    <li><a href="./">Documento de Presentación</a></li>
                    <li><a href="./">Informe</a></li>
                </ul>
            </div>
            <hr></hr>
        </div>
        <div className="repositorios">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <h4 className='titleDesc'> Repositorios:</h4>
        </div>
            <div className="containerRepositorios">
        <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} style={{
        width: '100%', // Ocupa todo el ancho disponible
        justifyContent: 'space-between', // Distribuye elementos equitativamente
      }}>
        <Card className="shadow" style={{width:'100%', position: 'relative'}}>
        <IconButton
    aria-label="Editar"
    color="primary"
    style={{
      position: 'absolute',
      bottom: '5px', // Ajusta la distancia desde la parte inferior
      right: '5px', // Ajusta la distancia desde la derecha
    }}
  >
    <EditIcon />
  </IconButton>
            <Card.Body>
                <Card.Title className="repoTitle">Bibliografía</Card.Title>
                <Card.Text>
                    <div className="linkListContainer">
                    <ul>
                        <li><a href="./">Libro 1</a></li>
                        <li><a href="./">Libro 2</a></li>
                        <li><a href="./">Libro 3</a></li>
                    </ul>
                </div>
                </Card.Text>
            </Card.Body>
         </Card>
         <Card className="shadow" style={{width:'100%', position: 'relative'}}>
        <IconButton
    aria-label="Editar"
    color="primary"
    style={{
      position: 'absolute',
      bottom: '5px', // Ajusta la distancia desde la parte inferior
      right: '5px', // Ajusta la distancia desde la derecha
    }}
  >
    <EditIcon />
  </IconButton>
            <Card.Body>
                <Card.Title className="repoTitle">Laboratorio</Card.Title>
                <Card.Text>
                    <div className="linkListContainer">
                    <ul>
                        <li><a href="./">Libro 1</a></li>
                        <li><a href="./">Libro 2</a></li>
                        <li><a href="./">Libro 3</a></li>
                    </ul>
                </div>
                </Card.Text>
            </Card.Body>
         </Card>
         <Card className="shadow" style={{width:'100%', position: 'relative'}}>
        <IconButton
    aria-label="Editar"
    color="primary"
    style={{
      position: 'absolute',
      bottom: '5px', // Ajusta la distancia desde la parte inferior
      right: '5px', // Ajusta la distancia desde la derecha
    }}
  >
    <EditIcon />
  </IconButton>
         <Card.Body>
                <Card.Title className="repoTitle">Producciones</Card.Title>
                <Card.Text>
                    <div className="linkListContainer">
                    <ul>
                        <li><a href="./">Libro 1</a></li>
                        <li><a href="./">Libro 2</a></li>
                        <li><a href="./">Libro 3</a></li>
                    </ul>
                </div>
                </Card.Text>
            </Card.Body>
         </Card>
        </Stack>
        <hr></hr>
            </div>
            {/* <div className="linksToDocumentationProject">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <h4 className='titleDesc'> Otros Enlaces:</h4> 
        <IconButton aria-label="Editar" color="primary">
            <EditIcon />
          </IconButton>
        </div>      
            <div className="linkListContainer">
                <ul>
                    <li><a href="./">Enlace 1</a></li>
                    <li><a href="./">Enlace 2</a></li>
                    <li><a href="./">Enlace 3</a></li>
                </ul>
            </div>
            <hr></hr>
        </div> */}
        </div>
    </div>
)

}

export default  InformationProjectPage;