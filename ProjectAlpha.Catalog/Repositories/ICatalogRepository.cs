namespace ProjectAlpha.Catalog.Repositories;

public interface ICatalogRepository
{
    public Task<CatalogEntity?> GetCatalogById(Guid catalogId, Guid restaurantId);
    public Task<IEnumerable<CatalogEntity>> GetCatalogsByRestaurantId(Guid restaurantId);

    public Task<CatalogEntity> CreateCatalog(CatalogEntity catalogEntity);

    public Task<CatalogEntity> UpdateCatalog(CatalogEntity catalogEntity);

    public Task DeleteCatalog(CatalogEntity catalogEntity);
}