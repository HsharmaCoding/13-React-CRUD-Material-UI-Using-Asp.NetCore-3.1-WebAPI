export interface IEmployee {
    employeeId:number,
    firstName: string,
    lastName:string,
    email: string,
    mobile: string,
    isPermanent: boolean,
    gender: string
    departmentId:number,
    department?:string,
    dateOfBirth?:Date
}   
