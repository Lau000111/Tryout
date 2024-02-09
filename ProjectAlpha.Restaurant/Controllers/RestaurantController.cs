using AutoMapper;
using LanguageExt;
using Microsoft.AspNetCore.Mvc;
using ProjectAlpha.Restaurant.Entities;
using ProjectAlpha.Restaurant.Repositiories;
using ProjectAlpha.Restaurant.Repositories;

namespace ProjectAlpha.Restaurant.Controllers;

[ApiController]
[Route("api/restaurant")]
public class RestaurantController(IRestaurantRepository restaurantRepository, IMapper mapper) : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(RestaurantDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRestaurantById(Guid id)
    {
        Option<RestaurantEntity> restaurant = await restaurantRepository.GetRestaurantById(id);
        return restaurant.Match<IActionResult>(
            Some: r => Ok(mapper.Map<RestaurantDto>(r)),
            None: NotFound);
    }

    [HttpPost]
    [ProducesResponseType(typeof(RestaurantDto), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateCatalog([FromBody] RestaurantDto restaurant)
    {
        var createdRestaurant = await restaurantRepository.CreateRestaurant(mapper.Map<RestaurantEntity>(restaurant));
        return CreatedAtAction(nameof(GetRestaurantById), new { id = createdRestaurant.Id }, mapper.Map<RestaurantDto>(createdRestaurant));
    }
}
