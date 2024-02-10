using System.Text.Json;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace ProjectAlpha.Restaurant.DbContexts;

public class RestaurantCosmosDbContext(DbContextOptions<RestaurantCosmosDbContext> options) : DbContext(options)
{
    public required DbSet<RestaurantEntity> Restaurant { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RestaurantEntity>()
            .ToContainer("Restaurants")
            .HasNoDiscriminator()
            .Property(restaurant => restaurant.Id)
            .HasConversion<string>()
            .HasValueGenerator<SequentialGuidValueGenerator>();

        modelBuilder.Entity<RestaurantEntity>()
            .HasPartitionKey(restaurant => restaurant.Id)
            .OwnsOne(restaurant => restaurant.OwnerContact);
    }

    public void SeedDatabase()
    {
        var jsonData = File.ReadAllText(@"DbContexts\TestData\TestData.json");
        var restaurants = JsonSerializer.Deserialize<IEnumerable<RestaurantEntity>>(jsonData, options: new() { PropertyNameCaseInsensitive = true })!;

        Restaurant.AddRange(restaurants);
        SaveChanges();
    }
}
