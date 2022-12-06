import React, { useEffect, useState } from "react";
import {IEmployee} from '../../interface'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";
import {EmployeeService} from '../../utility/services/employeeService';
import { Container } from "@material-ui/core";
import {Button} from '../control'
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export const ViewEmployee=()=>{

    const classes = useStyles();
    const [data,setData] = useState<IEmployee>({employeeId:0, departmentId:0,firstName:"",lastName:"",email:"",gender:"",isPermanent:false,mobile:""});
    const {id} = useParams();
    const navigate = useNavigate();

    const navigateToREmployeeList=()=>{
      navigate("/");
    }

    useEffect(()=>{
        if(id!=null && id!=undefined && parseInt(id)!=0){
            const fetchSelectedEmployee=async()=>{
                try{
                    const employee= await EmployeeService.getById(parseInt(id));
                    setData(employee);
                }
                catch(error:any){
                  console.log(error);
                }
            }
            fetchSelectedEmployee();
        }
    },[])

  return (
    <Container>
        <div className={classes.root}>
            <h1>View Employee Details</h1>
            <Button
                    text="Back"
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={navigateToREmployeeList}
            />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>First Name: {data.firstName}</Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>Last Name: {data.lastName}</Paper>
                </Grid>

                <Grid item xs={12}>
                <Paper className={classes.paper}>Email: {data.email}</Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>Mobile: {data.mobile}</Paper>
                </Grid>

                <Grid item xs={12}>
                <Paper className={classes.paper}>Gender: {data.gender}</Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>Department: {data.department}</Paper>
                </Grid>

                <Grid item xs={12}>
                <Paper className={classes.paper}>Date of birth: {data.dateOfBirth!=undefined && data.dateOfBirth!=null ? moment(new Date(data.dateOfBirth))
                            .utc(true)
                            .local()
                            .format("MM/DD/YYYY"):''}</Paper>
                </Grid>
            </Grid>
        </div>
    </Container>
  );
}