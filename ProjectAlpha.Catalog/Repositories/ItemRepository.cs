using Microsoft.Azure.Cosmos;

namespace ProjectAlpha.Catalog.Repositories;

public class ItemRepository(IDbContext context)
{
    public async Task<IEnumerable<ItemEntity>> GetCatalogItemsById(Guid catalogId, IList<Guid> itemIds)
    {
        var sqlQueryText = @"
SELECT i.Id, i.Description, i.Image, i.Name, i.Price
FROM c
    JOIN d IN c.Dishes
    JOIN i IN d.Items
WHERE c.id = '6a677264-4e5e-4ff2-9594-e164af4a3ee1'
    AND i.Id IN ('67ec97d0-22d1-49f9-4f93-08dc01717e9f', '108b3f7d-8efe-48e1-4f94-08dc01717e9f', 'c51e9b29-5b40-4a9f-4f95-08dc01717e9f')
";
        var itemsResultIterator = context.Container.GetItemQueryIterator<ItemEntity>(new QueryDefinition(sqlQueryText));
        while (itemsResultIterator.HasMoreResults)
        {
            var resultSet = await itemsResultIterator.ReadNextAsync();
            foreach (ItemEntity family in resultSet)
            {
                var x = family;
                var y = 10;
            }
        }

        return new List<ItemEntity>();
    }
}