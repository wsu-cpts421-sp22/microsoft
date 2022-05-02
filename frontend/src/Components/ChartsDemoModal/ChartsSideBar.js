import React, { useState } from 'react';
import { Button, Collapse } from 'reactstrap';
import Drawer from '@mui/material/Drawer';
import { BarChart } from './BarChart';
import { StackedBarChart } from './StackedBarChart';
import { MultiAxisLineChart } from './MultiAxisLineChart';
import { MultiTypeChart } from './MultiTypeChart';
import { PieChart } from './PieChart';
import { RadarChart } from './RadarChart';

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        position: 'fixed',
        left: '0px',
        top: '0px',
        zIndex: '1000',
        background: 'green',
        width: '500px',
    },
    inner: {
        height: '100%',
        display: 'flex',
        width: '480px',
        flexDirection: 'column',
        gridGap: '45px',
        padding: '15px'
    },
};

const ChartSideBar = (props) => {

    const [open, setOpen] = useState(false);
    const anchor = props.anchor || 'right';

    return (
        <React.Fragment>
            <Button style={{height: '24px', margin: '0px', marginLeft: '15px'}} onClick={() => setOpen(true)}>Open Drawer</Button>
            <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
                <div style={styles.inner}>
                    <BarChart />
                    <StackedBarChart />
                    <MultiAxisLineChart />
                    <MultiTypeChart />
                    <PieChart />
                    <RadarChart />
                </div>
            </Drawer>
        </React.Fragment>
    );
};

export { ChartSideBar };