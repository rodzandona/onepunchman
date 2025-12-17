using api.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
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
                UserId = usuarioId,
                Status = BoxStatus.Aberta,
                Quantidade = 0
            };

            _context.Boxes.Add(box);
            await _context.SaveChangesAsync();

            return box;
        }

        public async Task AdicionarProdutoAsync(int boxId, string codigoBarras)
        {
            var box = await _context.Boxes
                .FirstOrDefaultAsync(b => b.Id == boxId && b.Status == BoxStatus.Aberta);

            if (box == null)
                throw new Exception("Box não encontrada ou não está aberta.");

            var produto = await _context.Produtos
                .FirstOrDefaultAsync(p => p.CodigoBarras == codigoBarras);

            if (produto == null)
            {
                produto = new Produto
                {
                    CodigoBarras = codigoBarras
                };

                _context.Produtos.Add(produto);
                await _context.SaveChangesAsync();
            }

            var produtoEmOutraBox = await _context.BoxProdutos
                .AnyAsync(bp => bp.ProdutoId == produto.Id && bp.BoxId != boxId);

            if (produtoEmOutraBox)
                throw new Exception("Produto já pertence a outra caixa.");

            var boxProduto = await _context.BoxProdutos
                .FirstOrDefaultAsync(bp => bp.BoxId == boxId && bp.ProdutoId == produto.Id);

            if (boxProduto == null)
            {
                boxProduto = new BoxProduto
                {
                    BoxId = boxId,
                    ProdutoId = produto.Id,
                    Quantidade = 1
                };

                _context.BoxProdutos.Add(boxProduto);
                box.Quantidade++;
            }
            else
            {
                boxProduto.Quantidade++;
            }

            await _context.SaveChangesAsync();
        }

        public async Task FecharBoxAsync(int boxId)
        {
            var box = await _context.Boxes.FindAsync(boxId);

            if (box == null)
                throw new Exception("Box não encontrada.");

            box.Status = BoxStatus.Finalizada;
            await _context.SaveChangesAsync();
        }
    }
}
