import { Button } from "@mui/material";
import React from "react";
import { BarChart } from "./BarChart";
import { MultiAxisLineChart } from "./MultiAxisLineChart";
import { MultiTypeChart } from "./MultiTypeChart";
import { PieChart } from "./PieChart";
import { RadarChart } from "./RadarChart";
import { StackedBarChart } from "./StackedBarChart";

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        zIndex: '10000',
        display: 'flex',
        backdropFilter: 'blur(9px)',
        background: 'white',
        position: 'fixed',
    },
    inner: {
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
    },
    progressContainer: {
        margin: 'auto',
        color: 'white'
    },
    closeButton: {
        position: 'absolute',
        right: '15px',
        top: '15px',
        background: 'cornflowerblue',
        color: 'white'
    }
};

const ChartsDemoModal = (props) => {
    return (
        <div style={styles.container}>
            <Button onClick={props.closeCharts} style={styles.closeButton}>Close Charts</Button>
            <div style={styles.inner}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '50%', height: '300px', margin: '45px'}}>
                        <BarChart />
                    </div>
                    <div style={{width: '50%', height: '300px', margin: '45px'}}>
                        <StackedBarChart />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '50%', height: '300px', margin: '45px'}}>
                        <MultiAxisLineChart />
                    </div>
                    <div style={{width: '50%', height: '300px', margin: '45px'}}>
                        <MultiTypeChart />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '50%', margin: '45px'}}>
                        <PieChart />
                    </div>
                    <div style={{width: '50%', margin: '45px'}}>
                        <RadarChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ChartsDemoModal };