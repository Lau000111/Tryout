namespace ProjectAlpha.Catalog.Entities;

public record CatalogEntity
{
    public Guid Id { get; set; }

    public Guid RestaurantId { get; set; }
    
    public string Name { get; set; }

    public IEnumerable<DishEntity> Dishes { get; set; }
}