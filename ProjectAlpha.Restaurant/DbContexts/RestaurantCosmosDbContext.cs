using Microsoft.EntityFrameworkCore.ValueGeneration;
using ProjectAlpha.Restaurant.Entities;

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
}
