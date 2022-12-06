using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Common.Helper;
using WebAPI.DataAccess.Context;
using WebAPI.Domain;
using WebAPI.Services.Interface;

namespace WebAPI.Services
{
    public class EmployeeService : IEmployee
    {
        private EFDataContext _context;
        private readonly ApplicationSettings _appSettings;
        public EmployeeService(EFDataContext context, ApplicationSettings applicationSettings)
        {
            _context = context;
            _appSettings = applicationSettings;
        }
        public async Task<Response> Add(Employee emp)
        {
            try
            {
                var employee = new WebAPI.DataAccess.Entity.Employee()
                {
                    FirstName = emp.FirstName,
                    LastName = emp.LastName,
                    Mobile = emp.Mobile,
                    Gender = emp.Gender,
                    IsPermanent = emp.IsPermanent,
                    DepartmentId = emp.DepartmentId,
                    DateOfBirth = emp.DateOfBirth,
                    Email = emp.Email,
                };
                await _context.Employees.AddAsync(employee);
                await _context.SaveChangesAsync();

                return new Response
                {
                    EmployeeId = employee.EmployeeId,
                    IsSuccess = true,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "CreateEmployeeSuccess"),
                    HttpStatusCode = HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "CreateEmployeeFailure") + " " + ex.Message.ToString(),
                    HttpStatusCode = HttpStatusCode.BadRequest,
                };
            }
        }

        public async Task<Response> Update(Employee emp)
        {
            try
            {
                if (emp.EmployeeId <= 0)
                {
                    return new Response
                    {
                        EmployeeId = emp.EmployeeId,
                        IsSuccess = true,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }

                var employee = _context.Employees.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefault();
                if (employee == null)
                {
                    return new Response
                    {
                        EmployeeId = emp.EmployeeId,
                        IsSuccess = true,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }
                employee.FirstName = emp.FirstName;
                employee.LastName = emp.LastName;
                employee.Mobile = emp.Mobile;
                employee.IsPermanent = emp.IsPermanent;
                employee.Gender = emp.Gender;
                employee.DateOfBirth = emp.DateOfBirth;
                employee.DepartmentId=emp.DepartmentId;

                await _context.SaveChangesAsync();

                return new Response
                {
                    EmployeeId = employee.EmployeeId,
                    IsSuccess = true,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "UpdateEmployeeSuccess"),
                    HttpStatusCode = HttpStatusCode.OK,
                };

            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "UpdateEmployeeFailure") +" "+ ex.Message.ToString(),
                    HttpStatusCode = HttpStatusCode.BadRequest,
                };
            }
        }

        public async Task<Response> Delete(int EmployeeId)
        {
            try
            {
                if (EmployeeId <= 0)
                {
                    return new Response
                    {
                        IsSuccess = false,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }

                var employee = _context.Employees.Where(x => x.EmployeeId == EmployeeId).FirstOrDefault();

                if (employee == null)
                {
                    return new Response
                    {
                        IsSuccess = false,
                        Message = _appSettings.GetConfigurationValue("EmployeeMessages", "EmployeeNotFound"),
                        HttpStatusCode = HttpStatusCode.BadRequest,
                    };
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return new Response
                {
                    IsSuccess = true,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "DeleteEmployeeSuccess"),
                    HttpStatusCode = HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = _appSettings.GetConfigurationValue("EmployeeMessages", "DeleteEmployeeFailure") + " "+ ex.Message.ToString(),
                    HttpStatusCode = HttpStatusCode.BadRequest,
                };
            }
        }

        public async Task<List<Employee>> GetAll()
        {
            try
            {
                var employee = (from emp in _context.Employees
                                join dep in _context.Departments
                                on emp.DepartmentId equals dep.DepartmentId
                                select new Employee
                                {
                                    EmployeeId = emp.EmployeeId,
                                    FirstName = emp.FirstName,
                                    LastName = emp.LastName,
                                    Mobile = emp.Mobile,
                                    Email = emp.Mobile,
                                    DepartmentId = dep.DepartmentId,
                                    Department = dep.DepartmentName,
                                    IsPermanent = emp.IsPermanent,
                                    DateOfBirth = emp.DateOfBirth,
                                    Gender=emp.Gender
                                }).OrderByDescending(x=>x.EmployeeId).ToListAsync();

                return await employee;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<Employee> GetById(int employeeId)
        {
            try
            {
                var employee = (from emp in _context.Employees
                                join dep in _context.Departments
                                on emp.DepartmentId equals dep.DepartmentId
                                where emp.EmployeeId == employeeId
                                select new Employee
                                {
                                    EmployeeId = emp.EmployeeId,
                                    FirstName = emp.FirstName,
                                    LastName = emp.LastName,
                                    Mobile = emp.Mobile,
                                    Email = emp.Email,
                                    DepartmentId = dep.DepartmentId,
                                    Department = dep.DepartmentName,
                                    IsPermanent = emp.IsPermanent,
                                    DateOfBirth = emp.DateOfBirth,
                                    Gender=emp.Gender
                                }).FirstOrDefaultAsync();
                return await employee;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.ToString());
            }           
        }
    }
}
