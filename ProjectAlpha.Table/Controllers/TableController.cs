using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ProjectAlpha.Table.Entities;
using ProjectAlpha.Table.Models;
using ProjectAlpha.Table.Repositories;

namespace ProjectAlpha.Table.Controllers;

[ApiController]
[Route("api/{restaurantId}/table")]
public class TableController(ITableRepository tableRepository, IMapper mapper) : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(TableDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTableById(Guid id, Guid restaurantId)
    {
        Option<TableEntity> table = await tableRepository.GetTableById(id, restaurantId);
        return table.Match<IActionResult>(
            Some: c => Ok(mapper.Map<TableDto>(c)),
            None: NotFound);
    }

    [HttpPost]
    [ProducesResponseType(typeof(TableDto), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateTable([FromBody] TableDto table)
    {
        var createdTable = await tableRepository.CreateTable(mapper.Map<TableEntity>(table));
        return CreatedAtAction(
            nameof(GetTableById), 
            new { id = createdTable.Id, restaurantId = createdTable.RestaurantId }, 
            mapper.Map<TableDto>(createdTable));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(TableDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateTable(Guid id, Guid restaurantId, [FromBody] TableDto table)
    {
        Option<TableEntity> tableExists = await tableRepository.GetTableById(id, restaurantId);
        return await tableExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                mapper.Map(table, c);
                var updatedTable = await tableRepository.UpdateTable(c);
                return Ok(mapper.Map<TableDto>(updatedTable));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteTable(Guid id, Guid restaurantId)
    {
        Option<TableEntity> tableExists = await tableRepository.GetTableById(id, restaurantId);
        return await tableExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                await tableRepository.DeleteTable(c);
                return NoContent();
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpPatch("{id}")]
    [ProducesResponseType(typeof(TableDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PatchTable(Guid id, Guid restaurantId, [FromBody] JsonPatchDocument<TableDto> patchTable)
    {
        Option<TableEntity> tableExists = await tableRepository.GetTableById(id, restaurantId);
        return await tableExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                var tableDto = mapper.Map<TableDto>(c);
                patchTable.ApplyTo(tableDto);
                mapper.Map(tableDto, c);
                var patchedTable = await tableRepository.UpdateTable(c);
                return Ok(mapper.Map<TableDto>(patchedTable));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }
}
