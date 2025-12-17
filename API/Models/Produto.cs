namespace API.Models
{
    public class Produto
    {
        public int Id { get; set; }

        public string CodigoBarras { get; set; } = string.Empty;

        public string? Nome { get; set; }

        public BoxProduto? BoxProduto { get; set; }
    }
}
