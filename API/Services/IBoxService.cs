using API.Models;

namespace API.Services
{
    public interface IBoxService
    {
        Task<Box> CriarBoxAsync(int usuarioId);
        Task AdicionarProdutoAsync(int boxId, string codigoBarras);
        Task FecharBoxAsync(int boxId);
    }
}
