import React from "react";
import { appGrey } from "../../Constants/Colors";

const styles = {
    container: {
        position: 'fixed',
        bottom: '120px',
        right: '6px',
        display: 'flex',
        padding: '9px',
        fontWeight: 'bold',
        borderRadius: '6px',
        color: 'white',
        backgroundColor: appGrey,
        opacity: '0.81',
        marginBottom:'25px',
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