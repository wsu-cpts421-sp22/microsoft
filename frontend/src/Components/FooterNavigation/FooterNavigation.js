import React from 'react';
import { Input } from 'reactstrap';
import { SupportedGasses } from '../../Constants/SupportedGasses';

const styles = {
    container: {
        height: '75px',
        backgroundColor: 'white',
        width: '100vw',
        position: 'fixed',
        bottom: '0px',
        display: 'flex',
        padding: '15px 15px 15px 15px',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
};

const gasOptions = [
    <option name={'CH4'} value={'CH4'}></option>
];

//Footer navigation bar displayed below the map
const FooterNavigation = (props) => {

    const gasOptions = SupportedGasses.map(gas => {
        return (<option name={gas.name} value={gas.key}></option>)
    });

    return (
        <div style={styles.container}>
            <div style={styles.inputContainer}>
                <span><b>Visualize Gas:</b></span>
                <Input type={'select'} name={'visualize-gas'}>
                    {gasOptions}
                </Input>
            </div>
        </div>
    );
};

export {FooterNavigation};


