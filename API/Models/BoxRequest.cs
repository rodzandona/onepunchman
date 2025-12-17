namespace API.Models
{
    public class BoxRequest
    {
     public int UsuarioId { get; set; }
        public List<string> Produtos { get; set; } = new();
    }
}
