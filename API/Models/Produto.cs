using API.Models;

public class Produto
{
    public int Id { get; set; }
    public string CodigoBarras { get; set; } = null!;
    public string? Nome { get; set; }

    public ICollection<BoxProduto> BoxProdutos { get; set; } = new List<BoxProduto>();
}
