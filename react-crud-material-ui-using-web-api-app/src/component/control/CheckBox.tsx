import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

interface IProps{
    name:string;
    id:string;
    onChange:any;
    label:string;
    value:boolean;
    className:string;
    [key: string]: any;   
}

export const CheckBox=(props: IProps)=>{

    const { name, label, value, onChange,className } = props;
    
    const convertToDefEventPara = (name:string, value:boolean) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl className={className}>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )

}