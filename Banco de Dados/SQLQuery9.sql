CREATE VIEW vw_BoxDetalhes AS 
SELECT 
b.Id AS BoxId,
b.Status,

COUNT(bp.ProdutoId) AS QuantidadeToatalProdutos,
p.Id AS ProdutoId,
p.Nome AS ProdutoNome,
COUNT(bp.ProdutoId) AS QuantidadeDoProduto

FROM Boxes b
LEFT JOIN BoxProdutos bp ON b.Id = bp.BoxId
LEFT JOIN Produtos p ON bp.ProdutoId = p.Id
GROUP BY 
b.Id,
b.Status,
p.Id,
p.Nome;

--Esta view serve para marcar cada caixa com seu Status
--Calcula a quantidade total dos produtos dentro dela
--Mostra cada produto dentro da caixa
