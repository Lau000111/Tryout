namespace ProjectAlpha.Catalog.Repositories;

public class CatalogRepository(CatalogCosmosDbContext context) : ICatalogRepository
{
    public Task<CatalogEntity?> GetCatalogById(Guid catalogId, Guid restaurantId)
    {
        return context.Catalogs
            .Include(fc => fc.Dishes)
            .ThenInclude(dish => dish.Items)
            .FirstOrDefaultAsync(fc => fc.Id == catalogId && fc.RestaurantId == restaurantId);
    }

    public async Task<CatalogEntity> CreateCatalog(CatalogEntity catalogEntity)
    {
        context.Catalogs.Add(catalogEntity);
        await context.SaveChangesAsync();
        return catalogEntity;
    }

    public async Task<CatalogEntity> UpdateCatalog(CatalogEntity catalogEntity)
    {
        context.Catalogs.Update(catalogEntity);
        await context.SaveChangesAsync();
        return catalogEntity;
    }

    public async Task DeleteCatalog(CatalogEntity catalogEntity)
    {
        context.Catalogs.Remove(catalogEntity);
        await context.SaveChangesAsync();
    }
}
