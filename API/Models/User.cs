using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("tb_brc_users")]
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!; 
        public string Email { get; set; } = null!;
    }
}
