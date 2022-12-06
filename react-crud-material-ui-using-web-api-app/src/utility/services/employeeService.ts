import {IEmployee,IResponse} from '../../interface';
import {BaseService} from '../services';

export class EmployeeService{
    static getAll=async():Promise<IEmployee[]>=>{
        const result=await BaseService.createInstance().get('Employee/GetAll')
        return result.data;
    }

    static getById=async(employeeId:number):Promise<IEmployee>=>{
        const result=await BaseService.createInstance().get('Employee/Get/' + employeeId)
        return result.data;
    }

    static add=async(employee:IEmployee):Promise<IResponse>=>{
        const result=await BaseService.createInstance().post('Employee/Add',employee)
        return result.data;
    }

    static update=async(employee:IEmployee):Promise<IResponse>=>{
        const result=await BaseService.createInstance().put('Employee/Update',employee)
        return result.data;
    }

    static delete=async(employeeId:number):Promise<IResponse>=>{
        const result=await BaseService.createInstance().delete('Employee/Delete/' + employeeId)
        return result.data;
    }    
}