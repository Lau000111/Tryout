using Microsoft.Azure.Cosmos;

namespace ProjectAlpha.Catalog.DbContexts;

public interface IDbContext
{
    public Container Container { get; }
}