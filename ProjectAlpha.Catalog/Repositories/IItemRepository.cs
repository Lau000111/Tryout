namespace ProjectAlpha.Catalog.Repositories;

public interface IItemRepository
{
    public Task<IEnumerable<ItemEntity>> GetCatalogItemsById(Guid catalogId, IList<Guid> itemIds);
}