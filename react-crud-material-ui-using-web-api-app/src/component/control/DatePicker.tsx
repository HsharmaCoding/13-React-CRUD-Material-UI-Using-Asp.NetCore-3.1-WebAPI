import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface IProps{
  name:string;
  id:string;
  onChange:any;
  label:string;
  value:any;
  className:string;
  [key: string]: any;   
}

export const DatePicker=(props:IProps)=>{

  const { id, name, label, value, onChange,className,...rest } = props;

  const convertToDefEventPara = (name:string, value:string) => ({
    target: {
        name, value
    }
  })

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id={id}
            label={label}
            value={value}
            onChange={(date:any) =>onChange(convertToDefEventPara(name,date))}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            {...rest}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    )

}