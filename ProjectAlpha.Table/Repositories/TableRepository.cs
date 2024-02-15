using ProjectAlpha.Table.DbContexts;
using ProjectAlpha.Table.Entities;

namespace ProjectAlpha.Table.Repositories;

public class TableRepository(TableCosmosDbContext context) : ITableRepository
{
    public Task<TableEntity?> GetTableById(Guid tableId, Guid restaurantId)
    {
        return context.Tables.FirstOrDefaultAsync(fc => fc.Id == tableId && fc.RestaurantId == restaurantId);
    }

    public async Task<TableEntity> CreateTable(TableEntity tableEntity)
    {
        context.Tables.Add(tableEntity);
        await context.SaveChangesAsync();
        return tableEntity;
    }

    public async Task<TableEntity> UpdateTable(TableEntity tableEntity)
    {
        context.Tables.Update(tableEntity);
        await context.SaveChangesAsync();
        return tableEntity;
    }

    public async Task DeleteTable(TableEntity tableEntity)
    {
        context.Tables.Remove(tableEntity);
        await context.SaveChangesAsync();
    }
}
