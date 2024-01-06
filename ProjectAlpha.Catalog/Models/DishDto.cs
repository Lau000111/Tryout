namespace ProjectAlpha.Catalog.Models;

public class DishDto
{
    public string Name { get; set; }
    
    public IList<ItemDto> Items { get; set; }
}