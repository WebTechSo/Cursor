SELECT 
    p.ProductNumber,
    REPLACE(REPLACE(REPLACE(p.Name, CHAR(10), ' '), CHAR(13), ' '), ';', ' ') AS [Product name],
    ROUND(CAST(MAX(CASE WHEN pl.Name = 'Konsumentprislista' THEN plr.Price END) AS decimal(18,4)), 2) AS [Konsumentprislista],
    ROUND(CAST(MAX(CASE WHEN pl.Name = 'Grossprislista' THEN plr.Price END) AS decimal(18,4)), 2) AS [Grossprislista],
    STUFF((SELECT ',' + psugtn.GTIN 
           FROM tProductUnitGTIN psugtn 
           WHERE p.ProductUnitId = psugtn.ProductUnitId 
           AND psugtn.ProductId = p.ProductId 
           FOR XML PATH('')), 1, 1, '') AS EAN
FROM tProduct p
    INNER JOIN tProductSalesUnit psu 
        ON p.ProductId = psu.ProductId
    INNER JOIN tPriceListRow plr 
        ON psu.ProductSalesUnitId = plr.ProductSalesUnitId
    INNER JOIN tProductUnit pu 
        ON psu.ProductUnitId = pu.ProductUnitId
    INNER JOIN tPriceList pl 
        ON plr.PriceListId = pl.PriceListId
WHERE p.ClientId = 'B6584631-FC7A-4CBF-AE94-2D0900F79C0F'
GROUP BY 
    p.ProductNumber,
    p.Name,
    p.ProductUnitId,
    p.ProductId
ORDER BY p.ProductNumber;