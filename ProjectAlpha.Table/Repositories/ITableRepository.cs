using ProjectAlpha.Table.Entities;

namespace ProjectAlpha.Table.Repositories;

public interface ITableRepository
{
    public Task<TableEntity?> GetTableById(Guid tableId, Guid restaurantId);

    public Task<TableEntity> CreateTable(TableEntity tableEntity);

    public Task<TableEntity> UpdateTable(TableEntity tableEntity);

    public Task DeleteTable(TableEntity tableEntity);
}