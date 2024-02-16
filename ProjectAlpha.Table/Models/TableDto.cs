namespace ProjectAlpha.Table.Models;

public class TableDto
{
    public Guid Id { get; set; }

    public Guid RestaurantId { get; set; }

    public int Capacity { get; set; }
}