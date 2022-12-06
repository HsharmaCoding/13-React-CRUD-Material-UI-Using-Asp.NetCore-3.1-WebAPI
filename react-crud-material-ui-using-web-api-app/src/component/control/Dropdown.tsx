import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IProps{
    options:any;
    name:string;
    id:string;
    value:string;
    label:string;
    onChange:any;
    error:string;
    className:string;
    fullWidth:boolean;
    [key: string]: any; 
}

export const Dropdown=(props: IProps)=>{
    const { name, label, value,error=null, onChange, options,className,fullWidth } = props;
    const errorMessage=error!=null&&error=="0"?"":error;
    return(
        <div>
                <FormControl variant="outlined" className={className}   
                    {...(error && {error:true})}>
                        <InputLabel>{label}</InputLabel>
                        <MuiSelect
                            label={label}
                            name={name}
                            value={value}
                            onChange={onChange}
                            fullWidth={fullWidth}>
                            <MenuItem value="">None</MenuItem>
                            {
                                options.map(
                                    (item:any) => (<MenuItem key={item.departmentId} value={item.departmentId}>{item.departmentName}</MenuItem>)
                                )
                            }
                        </MuiSelect>
                        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
                </FormControl>
        </div>       
    )

}