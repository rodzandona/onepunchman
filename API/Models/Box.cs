using System.ComponentModel.DataAnnotations.Schema;


namespace API.Models
{


    [Table("tb_brc_boxes")]
public class Box
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public string Status { get; set; } = "Aberta";
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

    public ICollection<BoxProduto> BoxProdutos { get; set; } = new List<BoxProduto>();
}
}