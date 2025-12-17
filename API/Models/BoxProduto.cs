namespace API.Models
{
    public class BoxProduto
    {
        public int Id { get; set; }

        public int BoxId { get; set; }
        public Box Box { get; set; } = null!;

        public int ProdutoId { get; set; } 
        public Produto Produto { get; set; } = null!;

        public int Quantidade { get; set; } = 1;

        public DateTime DataLeitura { get; set; } = DateTime.Now;
    }
}
 //Aqui é a relação entre produto e caixa. A FK não deixa que se repita um mesmo produto em várias caixas
 //1 caixa --n produtos
 //1 produto -- 1 caixa