namespace ProjectAlpha.Table.Entities;

public record TableEntity
{
    public Guid Id { get; set; }

    public Guid RestaurantId { get; set; }
}