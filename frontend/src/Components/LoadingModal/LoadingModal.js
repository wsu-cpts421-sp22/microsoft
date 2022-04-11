import { CircularProgress } from "@mui/material";
import React from "react";
import { Spinner } from "reactstrap";

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        zIndex: '10000',
        display: 'flex',
        backdropFilter: 'blur(9px)',
        background: 'rgba(75, 75, 75, 0.69)',
        position: 'fixed',
    },
    progressContainer: {
        margin: 'auto',
        color: 'white'
    }
};

const LoadingModal = () => {
    return (
        <div style={styles.container}>
            <div style={styles.progressContainer}>
                <CircularProgress size={75} color="inherit" />
            </div>
        </div>
    );
};

export { LoadingModal };