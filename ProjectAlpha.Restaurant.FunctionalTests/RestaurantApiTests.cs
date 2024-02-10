using System;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ProjectAlpha.Restaurant.Models;

namespace ProjectAlpha.Restaurant.FunctionalTests;

public sealed class RestaurantApiTests(RestaurantApiFixture fixture) : IClassFixture<RestaurantApiFixture>
{
    private readonly HttpClient _httpClient = fixture.CreateClient();
    private readonly JsonSerializerOptions _jsonSerializerOptions = new(JsonSerializerDefaults.Web)
    {
        IncludeFields = true,
    };

    [Fact]
    public async Task GetRestaurantById_Found()
    {
        var restaurantId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6");

        // Act
        var response = await _httpClient.GetAsync($"api/restaurant/{restaurantId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<RestaurantDto>(body, _jsonSerializerOptions);
        Assert.Equal(restaurantId, result.Id);
    }
}
