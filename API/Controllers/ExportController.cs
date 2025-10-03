using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExportController : ControllerBase
    {
        private readonly ExcelService _excelService;
        private readonly EmailService _emailService;

        public ExportController(ExcelService excelService, EmailService emailService)
        {
            _excelService = excelService;
            _emailService = emailService;
        }

        [HttpPost("send-excel")]
        public async Task<IActionResult> SendExcel([FromBody] ExportRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || request.Boxes == null || request.Boxes.Count == 0)
                return BadRequest("Email and boxes are required.");

            // 1. Gera o excel
            var filePath = _excelService.GenerateExcel(request.Boxes);

            // 2. Envia o email
            await _emailService.SendEmailWithAttachmentAsync(
                request.Email,
                "Boxes and Products Report",
                "Attached you will find the list of boxes and products.",
                filePath
            );

            return Ok(new { success = true, message = "Excel sent successfully." });
        }
    }
}
