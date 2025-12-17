namespace API.Models
{
    public class Box
    {
        public int Id { get; set; }

        public string BoxCode { get; set; } = string.Empty;

        public BoxStatus Status { get; set; }

        public int Quantidade { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public ICollection<BoxProduto> BoxProduto { get; set; }
    }
}
