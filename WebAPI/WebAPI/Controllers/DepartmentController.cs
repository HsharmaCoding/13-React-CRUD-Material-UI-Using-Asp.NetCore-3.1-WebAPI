using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebAPI.Domain;
using WebAPI.Services.Interface;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartment _departmentService;
        public DepartmentController(IDepartment departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        [HttpGet, Route("GetAll")]
        [ProducesResponseType(typeof(List<Department>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> GetAll()
        {
            var response = await _departmentService.GetAll();
            return Ok(response);
        }

        [HttpGet, Route("Get/{departmentId}")]
        public async Task<ActionResult> Get(int departmentId)
        {
            var response = await _departmentService.GetById(departmentId);
            return Ok(response);
        }
    }
}
