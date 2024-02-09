namespace ProjectAlpha.Catalog.Repositories;

public interface ICatalogRepository
{
    public Task<CatalogEntity?> GetCatalogById(Guid foodCatalogId);

    public Task<CatalogEntity> CreateCatalog(CatalogEntity catalogEntity);

    public Task<CatalogEntity> UpdateCatalog(CatalogEntity catalogEntity);

    public Task DeleteCatalog(CatalogEntity catalogEntity);
}