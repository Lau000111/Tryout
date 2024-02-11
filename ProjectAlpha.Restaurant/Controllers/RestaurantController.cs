using LanguageExt;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> CreateRestaurant([FromBody] RestaurantDto restaurant)
    {
        var createdRestaurant = await restaurantRepository.CreateRestaurant(mapper.Map<RestaurantEntity>(restaurant));
        return CreatedAtAction(nameof(GetRestaurantById), new { id = createdRestaurant.Id }, mapper.Map<RestaurantDto>(createdRestaurant));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(RestaurantDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateRestaurant(Guid id, [FromBody] RestaurantDto restaurant)
    {
        Option<RestaurantEntity> restaurantExists = await restaurantRepository.GetRestaurantById(id);
        return await restaurantExists.Match<Task<IActionResult>>(
            Some: async r =>
            {
                mapper.Map(restaurant, r);
                var updatedRestaurant = await restaurantRepository.UpdateRestaurant(r);
                return Ok(mapper.Map<RestaurantDto>(updatedRestaurant));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteRestaurant(Guid id)
    {
        Option<RestaurantEntity> restaurantExists = await restaurantRepository.GetRestaurantById(id);
        return await restaurantExists.Match<Task<IActionResult>>(
            Some: async r =>
            {
                await restaurantRepository.DeleteRestaurant(r);
                return NoContent();
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }

    [HttpPatch("{id}")]
    [ProducesResponseType(typeof(RestaurantDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PatchRestaurant(Guid id, [FromBody] JsonPatchDocument<RestaurantDto> patchRestaurant)
    {
        Option<RestaurantEntity> restaurantExists = await restaurantRepository.GetRestaurantById(id);
        return await restaurantExists.Match<Task<IActionResult>>(
            Some: async r =>
            {
                var restaurantDto = mapper.Map<RestaurantDto>(r);
                patchRestaurant.ApplyTo(restaurantDto);
                mapper.Map(restaurantDto, r);
                var patchedRestaurant = await restaurantRepository.UpdateRestaurant(r);
                return Ok(mapper.Map<RestaurantDto>(patchedRestaurant));
            },
            None: () => Task.FromResult<IActionResult>(NotFound()));
    }
}
