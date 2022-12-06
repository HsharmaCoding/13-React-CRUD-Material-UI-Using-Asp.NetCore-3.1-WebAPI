import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';

interface IProps{
    onChange:any;
    items:any;
    name:string;
    label:string;
    value:string;
    className:string;
    [key: string]: any; 
}


export const RadioGroup=(props:IProps)=>{

    const { name, label, value, onChange, items, className } = props;

    const convertToDefEventPara = (name:string, value:string) => ({
        target: {
            name, value
        }
    })

    return(
        <FormControl className={className}>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        (item:any) => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}