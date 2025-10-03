namespace API.Models
{
    public class BoxRequest
    {
        public string BoxCode { get; set; } = string.Empty;
        public List<string> Products { get; set; } = new();
    }
}
