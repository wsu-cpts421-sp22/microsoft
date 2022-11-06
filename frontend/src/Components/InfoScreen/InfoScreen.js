import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import $ from 'jquery';
import Cookies from 'universal-cookie';


const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        zIndex: '10001',
        display: 'flex',
        backdropFilter: 'blur(9px)',
        position: 'fixed',
    },
    centerBox:{
        width: '50vmin',
        height: '50vmin',
        backgroundColor: 'white',
        borderRadius: '10px',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    centerColumn:{
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    image:{
        width: '10vmin',
    },
    title:{
        fontWeight: 'bolder',
        paddingTop:'10px'
    }
};

function InfoScreen(props) {
    const cookies = new Cookies();
    // 
    return (
        <div>
            { !cookies.get('astronomalieInfo') ?
                <div id='topContainer' style={styles.container}>
                    <Container style={styles.centerBox}>
                        <div style={styles.centerColumn}>
                            <div style={{'height':'20%'}}>
                                <Typography variant="h5" style={styles.title}>Welcome to Astronomalies</Typography>
                            </div>
                            <div style={{'height':'65%'}}>
                                <div>
                                    <Typography>Gasses</Typography>
                                    <img style={styles.image} src={require('./../../static/images/heat.png')}/>
                                </div>
                                <div>
                                    <Typography >Danger Zone</Typography>
                                    <img style={styles.image} src={require('./../../static/images/area.png')}/>
                                </div>
                            </div>
                            <div style={{'height':'15%'}}>
                                <Button onClick={()=>{$("#topContainer").toggle();
                                cookies.set('astronomalieInfo', 'true', { path: '/' });}} variant="outlined">Acknowledge</Button>
                            </div>
                        </div>
                    </Container>
                </div>
            : <></>
            }
        </div>
    );
};

export { InfoScreen };