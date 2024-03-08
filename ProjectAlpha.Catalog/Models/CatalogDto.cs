namespace ProjectAlpha.Catalog.Models;

public class CatalogDto
{
    public Guid Id { get; set; }

    public Guid RestaurantId { get; set; }

    public string Name { get; set; }

    public bool IsActive { get; set; }

    public IList<DishDto> Dishes { get; set; }
}