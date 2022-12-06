import React, { useState,useMemo,useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Container } from "@material-ui/core";
import {Button} from '../control'
import { useNavigate,useSearchParams } from "react-router-dom";
import moment from "moment-timezone";  
import TextField from '@material-ui/core/TextField';
import {EmployeeHook} from '../../hooks';
import {EmployeeService} from '../../utility/services/employeeService'
import {IEmployee} from '../../interface'

interface Column {
    id: 'firstName' | 'lastName' | 'email' | 'mobile' | 'isPermanent' | 'gender' | 'department' | 'dateOfBirth' |'edit' | 'delete' | 'view';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 100
    },
    {
      id: 'mobile',
      label: 'Mobile',
      minWidth: 100
    },
    {
        id: 'department',
        label: 'Department',
        minWidth: 100
    },

    {
        id:'dateOfBirth',
        label:'Date of Birth',
        minWidth: 100
    },

    {
      id: 'edit',
      label: 'Edit',
      minWidth: 100
    },
    {
      id: 'delete',
      label: 'Delete',
      minWidth: 100
    },
    {
      id: 'view',
      label: 'View',
      minWidth: 100
    },
    
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export const EmployeeList=()=>{
    const { data:employees, loading, setData: setUser,error } = EmployeeHook(true);

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchParams]=useSearchParams();
    const [search,setSearch] = useState(searchParams.get('filter') || '');

    const navigate = useNavigate();
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigateToAddEmployee=()=>{
      navigate("/add-employee");
    }
      
    const navigateToEditEmployee=(record:any)=>{    
      navigate(`/update-employee/${record.employeeId}`);
    }

    const navigateToViewEmployee=(record:any)=>{    
      navigate(`/view-employee/${record.employeeId}`);
    }

    const deleteEmployee=async(record:any)=>{
      try{
          const deleteEmployee=await EmployeeService.delete(record.employeeId);
          if(deleteEmployee.isSuccess){
            const employeeList=await EmployeeService.getAll();
            setUser(employeeList)
          }
      }
      catch(error:any){
        console.log(error)
      }
    }

    const filteredData=useMemo(()=>{
      return employees.filter(x=>!search || x.firstName.includes(search))
    },[employees,search])

    return (
        <>
            <Container>
            <h1>Employee Information</h1>

            <Button
                    text="Add New Employee"
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={navigateToAddEmployee}
            />
            <div>&nbsp;</div>

            <TextField
                id="search"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                fullWidth
            />
             <div>&nbsp;</div>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record:IEmployee) => {
                        return (
                        <TableRow key={record.employeeId}>
                           <TableCell>{record.firstName}</TableCell>
                           <TableCell>{record.lastName}</TableCell>
                           <TableCell>{record.email}</TableCell>
                           <TableCell>{record.mobile}</TableCell>
                           <TableCell>{record.department}</TableCell>
                           <TableCell>{moment(new Date(record.dateOfBirth!=undefined?record.dateOfBirth!:''))
                            .utc(true)
                            .local()
                            .format("MM/DD/YYYY")}
                          </TableCell>
                           <TableCell>
                           <Button
                                text="Edit"
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={()=>{navigateToEditEmployee(record)}}
                              />
                           </TableCell>
                           <TableCell>
                              <Button
                                text="Delete"
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={()=>{deleteEmployee(record)}}
                              />
                           </TableCell>
                           <TableCell>
                              <Button
                                text="View"
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={()=>{navigateToViewEmployee(record)}}
                              />
                           </TableCell>
                           
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
          </Container>
        </>
    );
}