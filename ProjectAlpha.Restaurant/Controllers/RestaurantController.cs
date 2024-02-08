using LanguageExt;
using Microsoft.AspNetCore.Mvc;
using ProjectAlpha.Restaurant.Entities;

namespace ProjectAlpha.Restaurant.Controllers;

[ApiController]
[Route("api/restaurant")]
public class RestaurantController : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(RestaurantDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRestaurantById(Guid id)
    {
        Option<RestaurantEntity> catalog = await catalogRepository.GetCatalogById(id);
        return catalog.Match<IActionResult>(
            Some: c => Ok(mapper.Map<CatalogDto>(c)),
            None: NotFound);
    }
}
