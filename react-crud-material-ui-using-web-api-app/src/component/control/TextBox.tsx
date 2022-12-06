import React from 'react'
import { TextField } from '@material-ui/core';

interface IProps{
    name:string;
    id:string;
    type:string;
    value:string;
    label:string;
    onChange:any;
    error:string;
    [key: string]: any;   
}


export const TextBox=(props:IProps)=>{
    const {name,id,type,value,label,onChange,error,...rest}=props;
    return(
        <>
            <TextField
                variant="outlined"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
                {...(error && {error:true,helperText:error})}
            />
        </>
    )
}