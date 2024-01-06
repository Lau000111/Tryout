namespace ProjectAlpha.Catalog.Entities;

public record DishEntity
{
    public string Name { get; set; }

    public IList<ItemEntity> Items { get; set; }
}