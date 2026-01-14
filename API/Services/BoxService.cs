using api.Data;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;

public class BoxService : IBoxService
{
    private readonly DataBaseContext _context;

    public BoxService(DataBaseContext context)
    {
        _context = context;
    }

    public async Task<Box> CriarBoxAsync(int usuarioId)
    {
        var box = new Box
        {
            UsuarioId = usuarioId,
            Status = "Aberta"
        };

        _context.Boxes.Add(box);
        await _context.SaveChangesAsync();

        return box;
    }

    public async Task AdicionarProdutoAsync(int boxId, string codigoBarras)
    {
        var box = await _context.Boxes
            .FirstOrDefaultAsync(b => b.Id == boxId && b.Status == "Aberta");

        if (box == null)
            throw new Exception("Box não encontrada ou já finalizada.");

        var produto = await _context.Produtos
            .FirstOrDefaultAsync(p => p.CodigoBarras == codigoBarras);

        if (produto == null)
        {
            produto = new Produto { CodigoBarras = codigoBarras };
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
        }

        var jaUsado = await _context.BoxProdutos
            .AnyAsync(bp => bp.ProdutoId == produto.Id);

        if (jaUsado)
            throw new InvalidOperationException("PRODUCT_ALREADY_IN_BOX");

        var boxProduto = new BoxProduto
        {
            BoxId = boxId,
            ProdutoId = produto.Id
        };

        _context.BoxProdutos.Add(boxProduto);
        await _context.SaveChangesAsync();
    }

    public async Task FecharBoxAsync(int boxId)
    {
        var box = await _context.Boxes.FindAsync(boxId);

        if (box == null)
            throw new Exception("Box não encontrada.");

        box.Status = "Finalizada";
        await _context.SaveChangesAsync();
    }
}
