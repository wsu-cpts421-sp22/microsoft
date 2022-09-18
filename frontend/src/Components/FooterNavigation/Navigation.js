import React from 'react';
import { Button, Input } from 'reactstrap';
import { SupportedGasses } from '../../Constants/SupportedGasses';
import { ChartSideBar } from '../ChartsDemoModal/ChartsSideBar';
import logo from '../../static/images/logo.png';

const styles = {
    container: {
        height: '60px',
        width: '100vw',
        position: 'fixed',
        top: '0px',
        display: 'flex',
        padding: '6px 15px 6px 15px',
        flexDirection: 'row',
        backdropFilter: 'blur(6px)',
        background: 'rgba(75, 75, 75, 0.69)'
    },
    logoImage: {
        paddingRight: '18px',
    },
    logoTitle: {
        fontSize: '33px',
        lineHeight: '54px',
        color: 'white',
    },
    inputs: {
        position: 'absolute',
        right: '50px',
        height: '100%',
        display: 'flex',
        justifyContent: 'end',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto'
    },
    selectionInput: {
        width: '200px',
        height: '30px',
        marginTop: '6px',
        border: 'none',
        borderRadius: '3px'
    },
    titleSpan: {
        color: 'white',
        fontWeight: '500',
    },
};

//Footer navigation bar displayed below the map
const Navigation = ({gas, setGas, openCharts}) => {

    const gasOptions = SupportedGasses.map(gas => {
        return (<option key={gas.key} name={gas.name} value={gas.key}>{gas.name}</option>)
    });

    const handleChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        
        if (name === 'visualize-gas') {
            setGas(value);
        }
    };

    return (
        <div style={styles.container}>
            <img style={styles.logoImage} alt='' src={logo}></img>
            <span style={styles.logoTitle}>Astronomalies</span>
            <div style={styles.inputs}>
                <div style={styles.inputContainer}>
                    <span style={styles.titleSpan}>Visualize Gas:</span>
                    <Input style={styles.selectionInput} value={gas} type={'select'} name={'visualize-gas'} onChange={handleChange}>
                        {gasOptions}
                    </Input>
                </div>
                <div style={styles.inputContainer}>
                    <Button style={{height: '24px', margin: '0px', marginBottom: '12px', marginLeft: '15px'}} onClick={openCharts}>Show Charts</Button>
                    <ChartSideBar />
                </div>
            </div>
        </div>
    );
};

export {Navigation};


