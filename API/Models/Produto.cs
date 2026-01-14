using System.ComponentModel.DataAnnotations.Schema;


namespace API.Models
{

    [Table("tb_brc_produtos")]

public class Produto
{
    public int Id { get; set; }
    public string CodigoBarras { get; set; } = null!;
    public string? Nome { get; set; }

    public ICollection<BoxProduto> BoxProdutos { get; set; } = new List<BoxProduto>();
}
}