using api.Data;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/export")]
    public class ExportController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly ExcelService _excelService;
        private readonly EmailService _emailService;

        public ExportController(
            DataBaseContext context,
            ExcelService excelService,
            EmailService emailService)
        {
            _context = context;
            _excelService = excelService;
            _emailService = emailService;
        }

        [HttpPost("send-excel")]
        public async Task<IActionResult> SendExcel([FromBody] string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest("Email is required.");

            var boxes = await _context.Boxes
                .Include(b => b.BoxProdutos)
                    .ThenInclude(bp => bp.Produto)
                .ToListAsync();

            var filePath = _excelService.GenerateExcel(boxes);

            await _emailService.SendEmailWithAttachmentAsync(
                email,
                "Boxes and Products Report",
                "Attached you will find the list of boxes and products.",
                filePath
            );

            return Ok(new
            {
                success = true,
                message = "Excel sent successfully."
            });
        }
    }
}
