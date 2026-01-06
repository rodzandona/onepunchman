using API.Models;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

    [HttpPost]
    public async Task<IActionResult> CriarBox()
    {
        try
        {
            var usuarioId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );

            var box = await _boxService.CriarBoxAsync(usuarioId);

            return Ok(new
            {
                message = $"Caixa criada com sucesso!",
                data = box
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{boxId}/produtos")]
    public async Task<IActionResult> AdicionarProduto(
        int boxId,
        [FromBody] AdicionarProdutoDto dto
    )
    {
        try
        {
            await _boxService.AdicionarProdutoAsync(
                boxId,
                dto.CodigoBarras
            );

            return Ok(new
            {
                message = "Produto adicionado à caixa com sucesso!"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{boxId}/fechar")]
    public async Task<IActionResult> FecharBox(int boxId)
    {
        try
        {
            await _boxService.FecharBoxAsync(boxId);

            return Ok(new
            {
                message = "Caixa finalizada com sucesso!"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [AllowAnonymous]
    [HttpOptions]
    public IActionResult Options()
    {
        return Ok();
    }
}
