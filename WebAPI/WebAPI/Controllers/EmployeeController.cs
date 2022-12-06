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
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee _employeeService;
        public EmployeeController(IEmployee employeeService)
        {
            _employeeService= employeeService;
        }

        [HttpGet]
        [HttpGet, Route("GetAll")]
        [ProducesResponseType(typeof(List<Employee>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> GetAll()
        {
            var response = await _employeeService.GetAll();
            return Ok(response);
        }

        [HttpGet, Route("Get/{employeeId}")]
        public async Task<ActionResult> Get(int employeeId)
        {
            var response = await _employeeService.GetById(employeeId);
            return Ok(response);
        }

        [HttpPost, Route("Add")]
        [ProducesResponseType(typeof(List<Response>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult> Add([FromBody] Employee employee)
        {
            var response= await _employeeService.Add(employee);
            return Ok(response);
        }

        [HttpPut, Route("Update")]
        [ProducesResponseType(typeof(List<Response>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult> Update([FromBody] Employee employee)
        {
            var response = await _employeeService.Update(employee);
            return Ok(response);
        }

        [HttpDelete, Route("Delete/{employeeId}")]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult> Delete(int employeeId)
        {
            var response=await _employeeService.Delete(employeeId);
            return Ok(response);
        }
    }
}
