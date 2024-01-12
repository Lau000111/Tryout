using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace ProjectAlpha.Catalog.Controllers;

[ApiController]
[Route("api/catalog")]
public class CatalogController(ICatalogRepository catalogRepository, ItemDbContext context, IMapper mapper) : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CatalogDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCatalogById(Guid id)
    {
        Option<CatalogEntity> catalog = await catalogRepository.GetCatalogById(id);
        return catalog.Match<IActionResult>(
            Some: c => Ok(mapper.Map<CatalogDto>(c)),
            None: NotFound);
    }

    [HttpPost]
    [ProducesResponseType(typeof(CatalogDto), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateCatalog([FromBody] CatalogDto catalog)
    {
        var createdCatalog = await catalogRepository.CreateCatalog(mapper.Map<CatalogEntity>(catalog));
        return CreatedAtAction(nameof(GetCatalogById), new { id = createdCatalog.Id }, mapper.Map<CatalogDto>(createdCatalog));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(CatalogDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateCatalog(Guid id, [FromBody] CatalogDto catalog)
    {
        Option<CatalogEntity> catalogExists = await catalogRepository.GetCatalogById(id);
        return await catalogExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                mapper.Map(catalog, c);
                c.Id = id;
                var updatedCatalog = await catalogRepository.UpdateCatalog(c);
                return Ok(mapper.Map<CatalogDto>(updatedCatalog));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteCatalog(Guid id)
    {
        Option<CatalogEntity> catalogExists = await catalogRepository.GetCatalogById(id);
        return await catalogExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                await catalogRepository.DeleteCatalog(c);
                return NoContent();
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpPatch("{id}")]
    [ProducesResponseType(typeof(CatalogDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PatchCatalog(Guid id, [FromBody] JsonPatchDocument<CatalogDto> patchCatalog)
    {
        Option<CatalogEntity> catalogExists = await catalogRepository.GetCatalogById(id);
        return await catalogExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                var catalogDto = mapper.Map<CatalogDto>(c);
                patchCatalog.ApplyTo(catalogDto);
                mapper.Map(catalogDto, c);
                c.Id = id;
                var patchedCatalog = await catalogRepository.UpdateCatalog(c);
                return Ok(mapper.Map<CatalogDto>(patchedCatalog));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpPost("{catalogId}/dishes/{dishName}/items")]
    [ProducesResponseType(typeof(ItemDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddItemToCatalog(Guid catalogId, string dishName, [FromBody] ItemDto itemDto)
    {
        Option<CatalogEntity> catalog = await catalogRepository.GetCatalogById(catalogId);

        return await catalog.Match<Task<IActionResult>>(
            Some: async c =>
            {
                var itemEntity = mapper.Map<ItemEntity>(itemDto);
                var newItem = await catalogRepository.AddItemToCatalog(catalogId, dishName, itemEntity);
                return Ok(mapper.Map<ItemDto>(newItem));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpGet("{catalogId}/dishes")]
    [ProducesResponseType(typeof(List<DishDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetDishesByCatalogId(Guid catalogId)
    {
        Option<CatalogEntity> catalogOption = await catalogRepository.GetCatalogById(catalogId);

        return await catalogOption.Match<Task<IActionResult>>(
            Some: c =>
            {
                var dishesDto = c.Dishes.Select(dish => mapper.Map<DishDto>(dish)).ToList();
                return Task.FromResult<IActionResult>(Ok(dishesDto));
            },
            None: () => Task.FromResult<IActionResult>(NotFound("Katalog nicht gefunden")));
    }

    [HttpPost("{catalogId}/dishes")]
    [ProducesResponseType(typeof(DishDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddDishToCatalog(Guid catalogId, [FromBody] DishEntity dishDto)
    {
        Option<CatalogEntity> catalogOption = await catalogRepository.GetCatalogById(catalogId);

        return await catalogOption.Match<Task<IActionResult>>(
            Some: async catalog =>
            {
                DishEntity newDish = new DishEntity
                {
                    Name = dishDto.Name
                };

                var dishesList = catalog.Dishes as List<DishEntity> ?? catalog.Dishes.ToList();
                dishesList.Add(newDish);

                catalog.Dishes = dishesList;

                await catalogRepository.UpdateCatalog(catalog);

                return CreatedAtAction(nameof(GetDishesByCatalogId), new { catalogId = catalog.Id }, mapper.Map<DishDto>(newDish));
            },
            None: () => Task.FromResult<IActionResult>(NotFound("Katalog nicht gefunden")));
    }

    [HttpDelete("{catalogId}/items/{itemId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveItemFromCatalog(Guid catalogId, Guid itemId)
    {
        try
        {
            await catalogRepository.RemoveItemFromCatalog(catalogId, itemId);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }


}
