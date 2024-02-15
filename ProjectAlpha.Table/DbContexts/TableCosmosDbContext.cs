using System.Text.Json;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using ProjectAlpha.Table.Entities;

namespace ProjectAlpha.Table.DbContexts;

public class TableCosmosDbContext(DbContextOptions<TableCosmosDbContext> options) : DbContext(options)
{
    public required DbSet<TableEntity> Tables { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TableEntity>()
            .HasKey(c => new { c.Id, c.RestaurantId });

        modelBuilder.Entity<TableEntity>()
            .ToContainer("Tables")
            .HasNoDiscriminator()
            .Property(fc => fc.Id)
            .HasConversion<string>()
            .HasValueGenerator<SequentialGuidValueGenerator>();

        modelBuilder.Entity<TableEntity>()
            .HasPartitionKey(fc => fc.RestaurantId);
    }

    public void SeedDatabase()
    {
        var jsonData = File.ReadAllText(@"DbContexts\TestData\TestData.json");
        var tables = JsonSerializer.Deserialize<IEnumerable<TableEntity>>(jsonData, options: new() { PropertyNameCaseInsensitive = true })!;

        Tables.AddRange(tables);
        SaveChanges();
    }
}
