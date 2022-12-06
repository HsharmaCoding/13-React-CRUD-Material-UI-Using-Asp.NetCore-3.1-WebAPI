using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Domain;

namespace WebAPI.Services.Interface
{
    public interface IEmployee
    {
        Task<Response> Add(Employee emp);
        Task<Response> Update(Employee emp);
        Task<Response> Delete(int employeeId);
        Task<List<Employee>> GetAll();
        Task<Employee> GetById(int employeeId);
    }
}
