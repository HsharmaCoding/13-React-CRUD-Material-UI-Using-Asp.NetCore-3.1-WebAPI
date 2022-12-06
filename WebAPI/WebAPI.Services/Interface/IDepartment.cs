using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Domain;

namespace WebAPI.Services.Interface
{
    public interface IDepartment
    {
        Task<List<Department>> GetAll();
        Task<Department> GetById(int departmentId);
    }
}
