using API.Models;
using ClosedXML.Excel;

namespace API.Services
{
    public class ExcelService
    {
        public string GenerateExcel(List<BoxRequest> boxes)
        {
            var fileName = $"Boxes_{DateTime.Now:yyyyMMddHHmmss}.xlsx";
            var filePath = Path.Combine(Path.GetTempPath(), fileName);

            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Boxes");

            worksheet.Cell(1, 1).Value = "Box Code";
            worksheet.Cell(1, 2).Value = "Product";

            int row = 2;
            foreach (var box in boxes)
            {
                foreach (var product in box.Products)
                {
                    worksheet.Cell(row, 1).Value = box.BoxCode;
                    worksheet.Cell(row, 2).Value = product;
                    row++;
                }
            }

            workbook.SaveAs(filePath);
            return filePath;
        }
    }
}
