import React from "react";
import { appGrey } from "../../Constants/Colors";

const styles = {
    container: {
        position: 'fixed',
        bottom: '15px',
        right: '15px',
        backgroundColor: 'white',
        display: 'flex',
        padding: '9px',
        fontWeight: 'bold',
        borderRadius: '6px',
        color: 'white',
        backgroundColor: appGrey,
        opacity: '0.81',
    },
};

const MapMeta = ({lat, lng, zoom}) => {
    return (
        <div style={styles.container}>
            Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}
        </div>
    );
};

export {MapMeta};