﻿using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace ProjectAlpha.Catalog.Controllers;

[ApiController]
[Route("api/{restaurantId}/catalog")]
public class CatalogController(ICatalogRepository catalogRepository, IMapper mapper) : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CatalogDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCatalogById(Guid id, Guid restaurantId)
    {
        Option<CatalogEntity> catalog = await catalogRepository.GetCatalogById(id, restaurantId);
        return catalog.Match<IActionResult>(
            Some: c => Ok(mapper.Map<CatalogDto>(c)),
            None: NotFound);
    }

	[HttpGet]
	[ProducesResponseType(typeof(IEnumerable<CatalogDto>), StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status404NotFound)]
	public async Task<IActionResult> GetCatalogsByRestaurantId(Guid restaurantId)
	{
		IEnumerable<CatalogEntity> catalogs = await catalogRepository.GetCatalogsByRestaurantId(restaurantId);
		if (catalogs.Any())
		{
			return Ok(mapper.Map<IEnumerable<CatalogDto>>(catalogs));
		}
		else
		{
			return NotFound();
		}
	}

	[HttpPost]
    [ProducesResponseType(typeof(CatalogDto), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateCatalog([FromBody] CatalogDto catalog)
    {
        var createdCatalog = await catalogRepository.CreateCatalog(mapper.Map<CatalogEntity>(catalog));
        return CreatedAtAction(
            nameof(GetCatalogById), 
            new { id = createdCatalog.Id, restaurantId = createdCatalog.RestaurantId }, 
            mapper.Map<CatalogDto>(createdCatalog));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(CatalogDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateCatalog(Guid id, Guid restaurantId, [FromBody] CatalogDto catalog)
    {
        Option<CatalogEntity> catalogExists = await catalogRepository.GetCatalogById(id, restaurantId);
        return await catalogExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                mapper.Map(catalog, c);
                var updatedCatalog = await catalogRepository.UpdateCatalog(c);
                return Ok(mapper.Map<CatalogDto>(updatedCatalog));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteCatalog(Guid id, Guid restaurantId)
    {
        Option<CatalogEntity> catalogExists = await catalogRepository.GetCatalogById(id, restaurantId);
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
    public async Task<IActionResult> PatchCatalog(Guid id, Guid restaurantId, [FromBody] JsonPatchDocument<CatalogDto> patchCatalog)
    {
        Option<CatalogEntity> catalogExists = await catalogRepository.GetCatalogById(id, restaurantId);
        return await catalogExists.Match<Task<IActionResult>>(
            Some: async c =>
            {
                var catalogDto = mapper.Map<CatalogDto>(c);
                patchCatalog.ApplyTo(catalogDto);
                mapper.Map(catalogDto, c);
                var patchedCatalog = await catalogRepository.UpdateCatalog(c);
                return Ok(mapper.Map<CatalogDto>(patchedCatalog));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }
}
