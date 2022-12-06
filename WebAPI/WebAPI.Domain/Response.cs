using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace WebAPI.Domain
{
    public class Response
    {
        public bool IsSuccess { get; set; }
        public int EmployeeId { get;set;}
        public string Message { get; set; }
        public HttpStatusCode HttpStatusCode { get; set; }
    }
}
