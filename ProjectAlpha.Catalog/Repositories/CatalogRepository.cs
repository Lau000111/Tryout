namespace ProjectAlpha.Catalog.Repositories;

public class CatalogRepository(CatalogCosmosDbContext context) : ICatalogRepository
{
    public Task<CatalogEntity?> GetCatalogById(Guid foodCatalogId)
    {
        return context.FoodCatalogs.Include(fc => fc.Dishes).ThenInclude(dish => dish.Items).FirstOrDefaultAsync(fc => fc.Id == foodCatalogId);
    }

    public async Task<CatalogEntity> CreateCatalog(CatalogEntity catalogEntity)
    {
        context.FoodCatalogs.Add(catalogEntity);
        await context.SaveChangesAsync();
        return catalogEntity;
    }

    public async Task<CatalogEntity> UpdateCatalog(CatalogEntity catalogEntity)
    {
        context.FoodCatalogs.Update(catalogEntity);
        await context.SaveChangesAsync();
        return catalogEntity;
    }

    public async Task DeleteCatalog(CatalogEntity catalogEntity)
    {
        context.FoodCatalogs.Remove(catalogEntity);
        await context.SaveChangesAsync();
    }

    public async Task<ItemEntity> AddItemToCatalog(Guid catalogId, string dishName, ItemEntity itemEntity)
    {
        var catalog = await GetCatalogById(catalogId);
        if (catalog == null)
        {
            throw new Exception("Katalog nicht gefunden");
        }

        var dish = catalog.Dishes.FirstOrDefault(d => d.Name.Equals(dishName, StringComparison.OrdinalIgnoreCase));
        if (dish == null)
        {
            throw new Exception("Dish mit dem angegebenen Namen nicht gefunden im Katalog");
        }

        dish.Items.Add(itemEntity);
        await context.SaveChangesAsync();
        return itemEntity;
    }

    public async Task<DishEntity> AddDishToCatalog(Guid catalogId, DishEntity dishEntity)
    {
        var catalog = await GetCatalogById(catalogId);
        if (catalog == null)
        {
            throw new Exception("Katalog nicht gefunden");
        }

        // Konvertieren Sie Dishes in eine Liste, falls es keine ist
        var dishesList = catalog.Dishes as List<DishEntity> ?? catalog.Dishes.ToList();
        dishesList.Add(dishEntity);

        // Weisen Sie die modifizierte Liste wieder zu
        catalog.Dishes = dishesList;

        await context.SaveChangesAsync();
        return dishEntity;
    }

    public async Task RemoveItemFromCatalog(Guid catalogId, Guid itemId)
    {
        var catalog = await GetCatalogById(catalogId);
        if (catalog == null)
        {
            throw new Exception("Katalog nicht gefunden");
        }

        foreach (var dish in catalog.Dishes)
        {
            var item = dish.Items.FirstOrDefault(i => i.Id == itemId);
            if (item != null)
            {
                dish.Items.Remove(item);
                await context.SaveChangesAsync();
                return;
            }
        }

        throw new Exception("Item nicht gefunden");
    }

}
