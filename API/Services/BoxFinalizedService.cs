using API.DTOs;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace API.Services
{
    public class BoxFinalizedService
    {
        private readonly IConfiguration _configuration;

        public BoxFinalizedService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<FinalizedBoxDto> GetFinalizedBoxes(string username)
        {
            List<FinalizedBoxDto> boxes = new();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            SqlCommand command =
                new SqlCommand("sp_brc_select_boxes_finalized", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@username", SqlDbType.VarChar)
                               .Value = username;

            connection.Open();

            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                boxes.Add(new FinalizedBoxDto
                {
                    box_id = (int)reader["box_id"],
                    user_id = (int)reader["user_id"],
                    status = (string)reader["status"],
                    created_at = (DateTime)reader["created_at"],
                    total_products = (int)reader["total_products"]
                });
            }

            connection.Close();

            return boxes;
        }
    }
}
