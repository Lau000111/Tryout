using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ProjectAlpha.Restaurant.Models;

namespace ProjectAlpha.Restaurant.FunctionalTests;

[Collection("EndToEndInitialisationCollection")]
public sealed class RestaurantApiTests(RestaurantApiFixture fixture)
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

    [Fact]
    public async Task GetRestaurantById_NotFound()
    {
        // Arrange
        var nonExistingRestaurantId = Guid.Parse("d12be4e8-8c83-4548-a7a7-9a3f7f67a440");

        // Act
        var response = await _httpClient.GetAsync($"api/restaurant/{nonExistingRestaurantId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task CreateRestaurant_Created()
    {
        // Arrange
        var restaurantId = Guid.NewGuid();
        var restaurant = new RestaurantDto
        {
            Id = restaurantId,
            Name = "Restaurant A",
            Description = "This is a description for Restaurant A",
            CuisineType = "Chinese",
            PhoneNumber = "098-765-4321",
            Email = "restaurantB@example.com",
            Address = "SomeStreet 1",
            OwnerContact = new()
            {
                FirstName = "Jane",
                LastName = "Doe",
                Email = "janedoe@example.com",
                PhoneNumber = "098-765-4321",
                Address = "SomeStreet 1"
            }
        };

        // Act
        var response = await _httpClient.PostAsJsonAsync("api/restaurant", restaurant);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<RestaurantDto>(body, _jsonSerializerOptions);
        Assert.Equal(restaurantId, result.Id);
    }

    [Fact]
    public async Task UpdateRestaurant_Updated()
    {
        // Arrange
        var restaurantId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa7");
        var restaurant = new RestaurantDto
        {
            Id = restaurantId,
            Name = "Restaurant A",
            Description = "This is a description for Restaurant A",
            CuisineType = "Chinese",
            PhoneNumber = "098-765-4321",
            Email = "restaurantB@example.com",
            Address = "SomeStreet 1",
            OwnerContact = new()
            {
                FirstName = "Jane",
                LastName = "Doe",
                Email = "janedoe@example.com",
                PhoneNumber = "098-765-4321",
                Address = "SomeStreet 1"
            }
        };

        // Act
        var response = await _httpClient.PutAsJsonAsync($"api/restaurant/{restaurantId}", restaurant);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<RestaurantDto>(body, _jsonSerializerOptions);
        Assert.Equal(restaurantId, result.Id);
        Assert.Equal("Restaurant A", result.Name);
        Assert.Equal("Jane", result.OwnerContact.FirstName);
    }

    [Fact]
    public async Task UpdateRestaurant_NotFound()
    {
        // Arrange
        var restaurantId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa8");
        var restaurant = new RestaurantDto
        {
            Id = restaurantId,
            Name = "Restaurant A",
            Description = "This is a description for Restaurant A",
            CuisineType = "Chinese",
            PhoneNumber = "098-765-4321",
            Email = "restaurantB@example.com",
            Address = "SomeStreet 1",
            OwnerContact = new()
            {
                FirstName = "Jane",
                LastName = "Doe",
                Email = "janedoe@example.com",
                PhoneNumber = "098-765-4321",
                Address = "SomeStreet 1"
            }
        };

        // Act
        var response = await _httpClient.PutAsJsonAsync($"api/restaurant/{restaurantId}", restaurant);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }


    [Fact]
    public async Task DeleteRestaurant_Deleted()
    {
        // Arrange
        var restaurantId = Guid.Parse("f7eedbf4-3c35-46a6-8cda-f7beb81baf82");

        // Act
        var response = await _httpClient.DeleteAsync($"api/restaurant/{restaurantId}");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task DeleteRestaurant_NotFound()
    {
        // Arrange
        var nonExistingRestaurantId = Guid.Parse("d12be4e8-8c83-4548-a7a7-9a3f7f67a440");

        // Act
        var response = await _httpClient.DeleteAsync($"api/restaurant/{nonExistingRestaurantId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task PatchRestaurant_Patched()
    {
        // Arrange
        var restaurantId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6");
        var updateRestaurantOperation = @"
[
  {
    ""op"": ""replace"",
    ""path"": ""/Name"",
    ""value"": ""New Restaurant Name""
  },
  {
    ""op"": ""replace"",
    ""path"": ""/Description"",
    ""value"": ""New Restaurant Description""
  }
]
";

        // Act
        var response = await _httpClient.PatchAsync($"api/restaurant/{restaurantId}", new StringContent(updateRestaurantOperation, Encoding.UTF8, "application/json-patch+json"));

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<RestaurantDto>(body, _jsonSerializerOptions);
        Assert.Equal(restaurantId, result.Id);
        Assert.Equal("New Restaurant Name", result.Name);
        Assert.Equal("New Restaurant Description", result.Description);
    }

    [Fact]
    public async Task PatchRestaurant_NotFound()
    {
        // Arrange
        var nonExistingRestaurantId = Guid.Parse("5960c289-ceab-4a18-aa18-eb04183083ed");
        var updateRestaurantOperation = @"
[
  {
    ""op"": ""replace"",
    ""path"": ""/Name"",
    ""value"": ""New Restaurant Name""
  },
  {
    ""op"": ""replace"",
    ""path"": ""/Description"",
    ""value"": ""New Restaurant Description""
  }
]
";

        // Act
        var response = await _httpClient.PatchAsync($"api/restaurant/{nonExistingRestaurantId}", new StringContent(updateRestaurantOperation, Encoding.UTF8, "application/json-patch+json"));

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
