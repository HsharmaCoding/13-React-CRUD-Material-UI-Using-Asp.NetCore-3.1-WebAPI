using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Common.Helper;
using WebAPI.DataAccess.Context;
using WebAPI.Domain;
using WebAPI.Services.Interface;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Services
{
    public class DepartmentService : IDepartment
    {
        private EFDataContext _context;
        private readonly ApplicationSettings _appSettings;
        public DepartmentService(EFDataContext context, ApplicationSettings applicationSettings)
        {
            _context = context;
            _appSettings = applicationSettings;
        }

        public async Task<List<Department>> GetAll()
        {
            try
            {
                var department=(from dep in _context.Departments
                                select new Department
                                {
                                    DepartmentId=dep.DepartmentId,
                                    DepartmentName=dep.DepartmentName
                                }).OrderByDescending(x=>x.DepartmentId).ToListAsync();
                return await department;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }
        public async Task<Department> GetById(int departmentId)
        {
            try
            {
                var department = (from dep in _context.Departments
                                  where dep.DepartmentId == departmentId
                                  select new Department
                                  {
                                      DepartmentId = dep.DepartmentId,
                                      DepartmentName = dep.DepartmentName
                                  }).FirstOrDefaultAsync();
                return await department;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }
    }
}
