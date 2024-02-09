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
}
