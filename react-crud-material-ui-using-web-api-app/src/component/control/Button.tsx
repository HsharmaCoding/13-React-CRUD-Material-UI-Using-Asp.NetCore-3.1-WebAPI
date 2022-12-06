import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";

interface IProps{
    variant:"text" | "outlined" | "contained" | "contained" | undefined
    size:"small" | "large" | "medium" | undefined
    color:"inherit" | "primary" | "secondary" | "default" | undefined;
    onClick?:any;
    text:string;
    [key: string]: any;   
}

export const Button=(props:IProps)=>{

    const {variant,size,color,onClick,text,...rest}=props;

    return (
        <MuiButton 
            variant={variant}
            size={size}
            color={color} 
            onClick={onClick}
            {...rest}>
            {text}
        </MuiButton>
    )

}