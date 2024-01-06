namespace ProjectAlpha.Catalog.Entities;

public record CatalogEntity
{
    public Guid Id { get; set; }

    public IEnumerable<DishEntity> Dishes { get; set; }
}