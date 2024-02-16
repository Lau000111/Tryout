using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ProjectAlpha.Table.Models;

namespace ProjectAlpha.Table.FunctionalTests;

[Collection("EndToEndInitialisationCollection")]
public sealed class TableApiTests(TableApiFixture fixture)
{
    private readonly HttpClient _httpClient = fixture.CreateClient();
    private readonly JsonSerializerOptions _jsonSerializerOptions = new(JsonSerializerDefaults.Web)
    {
        IncludeFields = true,
    };

    private readonly Guid _restaurantId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6");

    [Fact]
    public async Task GetTableById_Found()
    {
        // Arrange
        var tableId = Guid.Parse("f2b86c70-6cde-4f0f-9f96-5206f4d8f1a9");

        // Act
        var response = await _httpClient.GetAsync($"api/{_restaurantId}/table/{tableId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<TableDto>(body, _jsonSerializerOptions);
        Assert.Equal(tableId, result.Id);
        Assert.Equal(_restaurantId, result.RestaurantId);
        Assert.Equal(3, result.Dishes.Count);
    }

    [Fact]
    public async Task GetTableById_NotFound()
    {
        // Arrange
        var nonExistingTableId = Guid.Parse("d12be4e8-8c83-4548-a7a7-9a3f7f67a440");

        // Act
        var response = await _httpClient.GetAsync($"api/{_restaurantId}/table/{nonExistingTableId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task CreateTable_Created()
    {
        // Arrange
        var tableId = Guid.NewGuid();
        var table = new TableDto
        {
            Id = tableId,
            RestaurantId = _restaurantId,
            Dishes = new List<DishDto>
            {
                new()
                {
                    Name = "Italian Pasta",
                    Items = new List<ItemDto>
                    {
                        new()
                        {
                            Id = Guid.NewGuid(),
                            Name = "Spaghetti Carbonara",
                            Description = "Classic Italian pasta dish with eggs, cheese, bacon, and black pepper",
                            Image = "carbonara.jpg",
                            Price = 12.99M
                        },
                        new()
                        {
                            Id = Guid.NewGuid(),
                            Name = "Penne Arrabiata",
                            Description = "Spicy tomato sauce with garlic, tomatoes, and red chili peppers cooked in olive oil",
                            Image = "arrabiata.jpg",
                            Price = 10.50M
                        }
                    }
                }
            }
        };

        // Act
        var response = await _httpClient.PostAsJsonAsync($"api/{_restaurantId}/table", table);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<TableDto>(body, _jsonSerializerOptions);
        Assert.Equal( tableId, result.Id);
        Assert.Equal(_restaurantId, result.RestaurantId);
        Assert.Single(result.Dishes);
        Assert.Equal("Italian Pasta", result.Dishes.First().Name);
        Assert.Equal("Penne Arrabiata", result.Dishes.Last().Items.Last().Name);
        Assert.Equal(2, result.Dishes.First().Items.Count);
    }

    [Fact]
    public async Task UpdateTable_Updated()
    {
        // Arrange
        var tableId = Guid.Parse("f7eedbf4-3c35-46a6-8cda-f7beb81baf82");
        var tableDto = new TableDto
        {
            Id = tableId,
            RestaurantId = _restaurantId,
            Dishes = new List<DishDto>
            {
                new()
                {
                    Name = "Italian Pasta",
                    Items = new List<ItemDto>
                    {
                        new()
                        {
                            Name = "Spaghetti Carbonara",
                            Description = "Classic Italian pasta dish with eggs, cheese, bacon, and black pepper",
                            Image = "carbonara.jpg",
                            Price = 12.99M
                        },
                        new()
                        {
                            Name = "Penne Arrabiata",
                            Description = "Spicy tomato sauce with garlic, tomatoes, and red chili peppers cooked in olive oil",
                            Image = "arrabiata.jpg",
                            Price = 10.50M
                        }
                    }
                }
            }
        };

        // Act
        var response = await _httpClient.PutAsJsonAsync($"api/{_restaurantId}/table/{tableId}", tableDto);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<TableDto>(body, _jsonSerializerOptions);
        Assert.Equal(tableId, result.Id);
        Assert.Equal(_restaurantId, result.RestaurantId);
        Assert.Equal("Italian Pasta", result.Dishes.First().Name);
        Assert.Equal("Penne Arrabiata", result.Dishes.First().Items.Last().Name);
    }

    [Fact]
    public async Task UpdateTable_NotFound()
    {
        // Arrange
        var nonExistingTableId = Guid.NewGuid();
        var tableDto = new TableDto
        {
            Id = nonExistingTableId,
            RestaurantId = _restaurantId,
            Dishes = new List<DishDto>
            {
                new()
                {
                    Name = "Italian Pasta",
                    Items = new List<ItemDto>
                    {
                        new()
                        {
                            Name = "Spaghetti Carbonara",
                            Description = "Classic Italian pasta dish with eggs, cheese, bacon, and black pepper",
                            Image = "carbonara.jpg",
                            Price = 12.99M
                        },
                        new()
                        {
                            Name = "Penne Arrabiata",
                            Description = "Spicy tomato sauce with garlic, tomatoes, and red chili peppers cooked in olive oil",
                            Image = "arrabiata.jpg",
                            Price = 10.50M
                        }
                    }
                }
            }
        };

        // Act
        var response = await _httpClient.PutAsJsonAsync($"api/{_restaurantId}/table/{nonExistingTableId}", tableDto);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteTable_Deleted()
    {
        // Arrange
        var tableId = Guid.Parse("f7eedbf4-3c35-46a6-8cda-f7beb81baf82");

        // Act
        var response = await _httpClient.DeleteAsync($"api/{_restaurantId}/table/{tableId}");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task DeleteTable_NotFound()
    {
        // Arrange
        var nonExistingTableId = Guid.Parse("d12be4e8-8c83-4548-a7a7-9a3f7f67a440");

        // Act
        var response = await _httpClient.DeleteAsync($"api/{_restaurantId}/table/{nonExistingTableId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task PatchTable_Patched()
    {
        // Arrange
        var tableId = Guid.Parse("4cff0d5a-0e58-490c-9b48-950e0dd674fe");
        var addNewItemOperation = @"
[
  {
    ""op"": ""add"",
    ""path"": ""/dishes/0/Items/-"",
    ""value"": {
      ""Name"": ""New Pizza ItemEntity"",
      ""Description"": ""Description of the new pizza"",
      ""Image"": ""newpizza.jpg"",
      ""Price"": 12.99
    }
  }
]
";

        // Act
        var response = await _httpClient.PatchAsync($"api/{_restaurantId}/table/{tableId}", new StringContent(addNewItemOperation, Encoding.UTF8, "application/json-patch+json"));

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<TableDto>(body, _jsonSerializerOptions);
        Assert.Equal(tableId, result.Id);
        Assert.Equal(_restaurantId, result.RestaurantId);
        Assert.Equal(2, result.Dishes.First().Items.Count);
        Assert.NotEqual(Guid.Empty, result.Dishes.First().Items.Last().Id);
        Assert.Equal("New Pizza ItemEntity", result.Dishes.First().Items.Last().Name);
    }

    [Fact]
    public async Task PatchTable_NotFound()
    {
        // Arrange
        var nonExistingTableId = Guid.Parse("5960c289-ceab-4a18-aa18-eb04183083ed");
        var addNewItemOperation = @"
[
  {
    ""op"": ""add"",
    ""path"": ""/dishes/0/Items/-"",
    ""value"": {
      ""Name"": ""New Pizza ItemEntity"",
      ""Description"": ""Description of the new pizza"",
      ""Image"": ""newpizza.jpg"",
      ""Price"": 12.99
    }
  }
]
";

        // Act
        var response = await _httpClient.PatchAsync($"api/{_restaurantId}/table/{nonExistingTableId}", new StringContent(addNewItemOperation, Encoding.UTF8, "application/json-patch+json"));

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}