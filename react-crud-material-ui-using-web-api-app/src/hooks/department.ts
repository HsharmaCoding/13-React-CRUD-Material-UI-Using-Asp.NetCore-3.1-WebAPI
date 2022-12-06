import {IDepartment} from '../interface';
import {useEffect,useState} from 'react';
import {DepartmentService} from '../utility/services';

export const DepartmentHook=(loadingDepartment:boolean)=>{
    const [data,setData]=useState<IDepartment[]>([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const result=await DepartmentService.getAll();
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

        if(loadingDepartment){
            fetchData();
        }
    },[loadingDepartment])
    
    return {data,loading,error,setData}
}