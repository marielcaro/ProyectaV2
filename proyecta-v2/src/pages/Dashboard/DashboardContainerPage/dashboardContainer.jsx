import { Grid } from '@mui/material';
import { Card  } from 'react-bootstrap';
import './dashboardContainer.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const DashboardContainer = () => {

    return(
    
            <Grid className='dashboardContainer' container spacing={2}>
                {/* Columna 1: Lista de Proyectos */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="dashboardCard" variant="outlined" sx={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.1)' }}>
                    <Card.Title className="dashboardCardTitle">
                        PROYECTOS
                    </Card.Title>
                    <Card.Body>
                        {/* Contenido de la lista de proyectos */}
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                            </ListItem>
                        </List>
                    </Card.Body>
                    </Card>
                </Grid>

                {/* Columna 2: Lista de tareas pendientes */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="dashboardCard" variant="outlined" sx={{ boxShadow: '0 4px 6px rgba(128, 128, 128, 0.1)' }}>
                    <Card.Title className="dashboardCardTitle">
                        TAREAS PENDIENTES
                    </Card.Title>
                    <Card.Body>
                        {/* Contenido de la lista de tareas pendientes */}
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                            </ListItem>
                        </List>
                    </Card.Body>
                    </Card>
                </Grid>

                {/* Columna 3: Lista de próximos eventos */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="dashboardCard" variant="outlined" sx={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.1)' }}>
                    <Card.Title className="dashboardCardTitle">
                        PRÓXIMOS EVENTOS
                    </Card.Title>
                    <Card.Body>
                        {/* Contenido de la lista de próximos eventos */}
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                            </ListItem>
                        </List>
                    </Card.Body>
                    </Card>
                </Grid>
            </Grid>

    )
}


export default DashboardContainer