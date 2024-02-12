using Microsoft.EntityFrameworkCore.ValueGeneration;
using System.Text.Json;

namespace ProjectAlpha.Catalog.DbContexts;

public class CatalogCosmosDbContext(DbContextOptions<CatalogCosmosDbContext> options, IMapper mapper) : DbContext(options)
{
    public required DbSet<CatalogEntity> Catalogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CatalogEntity>()
            .HasKey(c => new { c.Id, c.RestaurantId });

        modelBuilder.Entity<CatalogEntity>()
            .ToContainer("Catalogs")
            .HasNoDiscriminator()
            .Property(fc => fc.Id)
            .HasConversion<string>()
            .HasValueGenerator<SequentialGuidValueGenerator>();

        modelBuilder.Entity<CatalogEntity>()
            .HasPartitionKey(fc => fc.RestaurantId)
            .OwnsMany(fc => fc.Dishes)
            .OwnsMany(ds => ds.Items, fi =>
            {
                fi.WithOwner();
                fi.Property(i => i.Id)
                    .HasConversion<string>()
                    .HasValueGenerator<SequentialGuidValueGenerator>();
            });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        var items = ChangeTracker.Entries<ItemEntity>()
            .Where(entityEntry => entityEntry.State == EntityState.Added || entityEntry.State == EntityState.Modified)
            .Select(entityEntry => entityEntry.Entity)
            .ToList();

        var itemIds = new System.Collections.Generic.HashSet<Guid>();
        foreach (var item in items)
        {
            if (!itemIds.Add(item.Id))
                throw new InvalidOperationException($"Duplicate item id {item.Id} detected.");
        }

        return base.SaveChangesAsync(cancellationToken);
    }

    public void SeedDatabase()
    {
        var jsonData = File.ReadAllText(@"DbContexts\TestData\TestData.json");
        var catalogs = JsonSerializer.Deserialize<IEnumerable<CatalogEntity>>(jsonData, options: new() { PropertyNameCaseInsensitive = true })!;

        Catalogs.AddRange(catalogs);
        SaveChanges();
    }
}
