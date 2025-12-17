using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace API.Controllers
{
    [ApiController]
    [Route("api/boxes")]
    [Authorize]
    public class BoxesController : ControllerBase
    {
        private readonly IBoxService _boxService;

            public BoxesController(IBoxService boxService)
        {
            _boxService = boxService;
        }

        //Cria uma nova caixa

        [HttpPost]
        public async Task<IActionResult> CriarBox()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var box = await _boxService.CriarBoxAsync(userId);

            return Ok(box);
        }

        //Add produto na caixa ao bipá-lo

        [HttpPost("{boxId}/produtos")]
        public async Task<IActionResult> AdicionarProduto(
            int boxId,
            [FromBody] string codigoBarras)
        {
            await _boxService.AdicionarProdutoAsync(boxId, codigoBarras);

            return Ok(new

            {
                message = "Produto adicionado com sucesso!"
            });
        }

        //Fechando a caixa

        [HttpPost("{boxId}/fechar")]
        public async Task<IActionResult> FecharBox(int boxId)
        {
            await _boxService.FecharBoxAsync(boxId);

            return Ok(new
            {
                message = "Box finalizada com sucesso"
            });
        }
    }
}
