import {IEmployee} from '../interface';
import {useEffect,useState} from 'react';
import {EmployeeService} from '../utility/services';

export const EmployeeHook=(loadingEmployee:boolean)=>{
    const [data,setData]=useState<IEmployee[]>([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const result=await EmployeeService.getAll();
                setData([...result]);
            }
            catch(error:any){
                setData([]);
                setError(error.toString())
            }
            finally{
                setLoading(false);
            }
        }

        if(loadingEmployee){
            fetchData();
        }
    },[])
    
    return {data,loading,error,setData}
}