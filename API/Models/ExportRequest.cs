namespace API.Models
{
    public class ExportRequest
    {
        public string Email { get; set; } = string.Empty;
        public List<BoxRequest> Boxes { get; set; } = new();
    }
}
