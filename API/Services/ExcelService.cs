using API.Models;
using ClosedXML.Excel;

namespace API.Services
{
    public class ExcelService
    {
        public string GenerateExcel(List<Box> boxes)
        {
            var fileName = $"Boxes_{DateTime.Now:yyyyMMddHHmmss}.xlsx";
            var filePath = Path.Combine(Path.GetTempPath(), fileName);

            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Boxes");

            worksheet.Cell(1, 1).Value = "Box ID";
            worksheet.Cell(1, 2).Value = "Produto";
            worksheet.Cell(1, 3).Value = "Quantidade";

            int row = 2;

            foreach (var box in boxes)
            {
                foreach (var boxProduto in box.BoxProdutos)
                {
                    worksheet.Cell(row, 1).Value = box.Id;
                    worksheet.Cell(row, 2).Value = boxProduto.Produto.CodigoBarras;
                    row++;
                }
            }

            workbook.SaveAs(filePath);
            return filePath;
        }
    }
}
