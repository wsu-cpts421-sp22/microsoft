import React, { useEffect, useState } from "react";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@material-ui/core';
import { Slider } from "@mui/material";

const styles = {
    container: {
        position: 'fixed',
        left: '0px',
        bottom: '0px',
        width: 'calc(100vw - 42px)',
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '0px',
        padding: '15px',
        paddingLeft: '21px',
        paddingRight: '21px',
        zIndex: '1',
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '45px',
    },
    dateContainerTitle: {
        marginBottom: '6px',
        fontWeight: '500'
    }
};

const GRANULARITIES = {
    days: 'days',
};

const useDateRange = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [granularity, setGranularity] = useState(GRANULARITIES.days);
    const [sliderPos, setSliderPos] = useState(0);
    const [visualizingDate, setVisualizingDate] = useState(new Date());

    //Set a default start date on component load
    useEffect(() => {
        //Make the default start date the current date -  30 days
        const defaultStartDate = new Date();
        defaultStartDate.setDate(defaultStartDate.getDate() - 30);
        setStartDate(defaultStartDate);
    }, []);

    //Reset the slider back to 0 when the date changes
    useEffect(() => {
        setSliderPos(0);
    }, [startDate, endDate]);

    //Update the visualized date when the slider position changes
    useEffect(() => {
        setVisualizingDate(getVisualDate());
    }, [sliderPos]);

    //Returns the number of days between the start and end date
    const getNumDaysBetweenDates = () => {
        return parseInt((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
    };

    //Get the currently selected date, startdate + slider position
    const getVisualDate = () => {
        const visDate = new Date(startDate.getTime());
        visDate.setDate(startDate.getDate() + sliderPos);
        return visDate;
    }
    
    const dateComponent = (
        <div style={styles.container}>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <div style={styles.dateContainer}>
                     <span style={styles.dateContainerTitle}>Start Date:</span>
                     {/* <DatePicker
                        maxDate={new Date()}
                        value={startDate}
                        onChange={(newValue) => {
                            if (newValue.getTime() < endDate.getTime()) {
                                setStartDate(newValue);
                            }
                            else {
                                setStartDate(newValue);
                                setEndDate(newValue)
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}
                 </div>
                 {/* <div style={styles.dateContainer}>
                     <span style={styles.dateContainerTitle}>End Date:</span>
                     <DatePicker
                        maxDate={new Date()}
                        value={endDate}
                        onChange={(newValue) => {
                            if (newValue.getTime() > startDate.getTime()) {
                                setEndDate(newValue);
                            }
                            else {
                                setStartDate(newValue);
                                setEndDate(newValue)
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div> */}
                {/* <div style={{...styles.dateContainer, width: '100%', marginRight: '0px'}}>
                    <span style={styles.dateContainerTitle}>Visualize Range:</span>
                    <Slider
                        size="large"
                        step={1}
                        defaultValue={0}
                        valueLabelDisplay="auto"
                        max={getNumDaysBetweenDates()}
                        marks={true}
                        onChangeCommitted={(e,v) => setSliderPos(v)}
                    />
                </div> */}
            </LocalizationProvider>
        </div>
    );

    return {
        startDate, 
        endDate, 
        granularity, 
        dateComponent,
        visualizingDate,
    };
};

export { useDateRange };