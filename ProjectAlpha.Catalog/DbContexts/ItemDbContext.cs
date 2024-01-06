using Microsoft.Azure.Cosmos;

namespace ProjectAlpha.Catalog.DbContexts;

public class ItemDbContext : IDbContext
{
    public ItemDbContext(string connectionString, string databaseName, string containerName)
    {
        var cosmosClient = new CosmosClient(connectionString);
        var database = cosmosClient.GetDatabase(databaseName);
        Container = database.GetContainer(containerName);
    }

    public Container Container { get; }
}