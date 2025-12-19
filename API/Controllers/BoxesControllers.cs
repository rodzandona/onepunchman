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
        var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var box = await _boxService.CriarBoxAsync(usuarioId);
        return Ok(box);
    }

    [HttpPost("{boxId}/produtos")]
    public async Task<IActionResult> AdicionarProduto(
        int boxId,
        [FromBody] AdicionarProdutoDto dto)
    {
        await _boxService.AdicionarProdutoAsync(boxId, dto.CodigoBarras);
        return Ok();
    }

    [HttpPost("{boxId}/fechar")]
    public async Task<IActionResult> FecharBox(int boxId)
    {
        await _boxService.FecharBoxAsync(boxId);
        return Ok();
    }

    [HttpOptions]
    public IActionResult Options()
    {
        return Ok();
    }

}
