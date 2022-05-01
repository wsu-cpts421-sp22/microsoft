import React, { useEffect, useState } from "react";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@material-ui/core';
import { Slider } from "@mui/material";

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
    
    return {
        setSliderPos,
        setStartDate,
        startDate, 
        setEndDate,
        endDate, 
        setGranularity,
        granularity, 
        setVisualizingDate,
        visualizingDate,
        getNumDaysBetweenDates,
    };
};

export { useDateRange };