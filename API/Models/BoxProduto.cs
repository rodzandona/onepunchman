using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("tb_brc_tb_brc_box_produtos")]

public class BoxProduto
{
    public int Id { get; set; }
    public int BoxId { get; set; }
    public int ProdutoId { get; set; }
    public DateTime DataLeitura { get; set; } = DateTime.UtcNow;

    public Box Box { get; set; } = null!;
    public Produto Produto { get; set; } = null!;
}

}
//Aqui é a relação entre produto e caixa. A FK não deixa que se repita um mesmo produto em várias caixas
//1 caixa --n produtos
//1 produto -- 1 caixa