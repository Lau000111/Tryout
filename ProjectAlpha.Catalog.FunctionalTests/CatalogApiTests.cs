using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ProjectAlpha.Catalog.Models;

namespace ProjectAlpha.Catalog.FunctionalTests;

public sealed class CatalogApiTests(CatalogApiFixture fixture) : IClassFixture<CatalogApiFixture>
{
    private readonly HttpClient _httpClient = fixture.CreateClient();
    private readonly JsonSerializerOptions _jsonSerializerOptions = new(JsonSerializerDefaults.Web)
    {
        IncludeFields = true,
    };

    [Fact]
    public async Task GetCatalogById_Found()
    {
        // Arrange
        var catalogId = Guid.Parse("f2b86c70-6cde-4f0f-9f96-5206f4d8f1a9");

        // Act
        var response = await _httpClient.GetAsync($"api/catalog/{catalogId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<CatalogDto>(body, _jsonSerializerOptions);
        Assert.Equal(catalogId, result.Id);
        Assert.Equal(3, result.Dishes.Count);
    }

    [Fact]
    public async Task GetCatalogById_NotFound()
    {
        // Arrange
        var nonExistingCatalogId = Guid.Parse("d12be4e8-8c83-4548-a7a7-9a3f7f67a440");

        // Act
        var response = await _httpClient.GetAsync($"api/catalog/{nonExistingCatalogId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task CreateCatalog_Created()
    {
        // Arrange
        var catalogId = Guid.NewGuid();
        var catalog = new CatalogDto
        {
            Id = catalogId,
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
        var response = await _httpClient.PostAsJsonAsync("api/catalog", catalog);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<CatalogDto>(body, _jsonSerializerOptions);
        Assert.Equal( catalogId, result.Id);
        Assert.Single(result.Dishes);
        Assert.Equal("Italian Pasta", result.Dishes.First().Name);
        Assert.Equal("Penne Arrabiata", result.Dishes.Last().Items.Last().Name);
        Assert.Equal(2, result.Dishes.First().Items.Count);
    }

    [Fact]
    public async Task UpdateCatalog_Updated()
    {
        // Arrange
        var catalogId = Guid.Parse("f7eedbf4-3c35-46a6-8cda-f7beb81baf82");
        var catalogDto = new CatalogDto
        {
            Id = catalogId,
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
        var response = await _httpClient.PutAsJsonAsync($"api/catalog/{catalogId}", catalogDto);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<CatalogDto>(body, _jsonSerializerOptions);
        Assert.Equal(catalogId, result.Id);
        Assert.Equal("Italian Pasta", result.Dishes.First().Name);
        Assert.Equal("Penne Arrabiata", result.Dishes.First().Items.Last().Name);
    }

    [Fact]
    public async Task UpdateCatalog_NotFound()
    {
        // Arrange
        var nonExistingCatalogId = Guid.NewGuid();
        var catalogDto = new CatalogDto
        {
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
        var response = await _httpClient.PutAsJsonAsync($"api/catalog/{nonExistingCatalogId}", catalogDto);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteCatalog_Deleted()
    {
        // Arrange
        var catalogId = Guid.Parse("f7eedbf4-3c35-46a6-8cda-f7beb81baf82");

        // Act
        var response = await _httpClient.DeleteAsync($"api/catalog/{catalogId}");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task DeleteCatalog_NotFound()
    {
        // Arrange
        var nonExistingCatalogId = Guid.Parse("d12be4e8-8c83-4548-a7a7-9a3f7f67a440");

        // Act
        var response = await _httpClient.DeleteAsync($"api/catalog/{nonExistingCatalogId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task PatchCatalog_Patched()
    {
        // Arrange
        var catalogId = Guid.Parse("4cff0d5a-0e58-490c-9b48-950e0dd674fe");
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
        var response = await _httpClient.PatchAsync($"api/catalog/{catalogId}", new StringContent(addNewItemOperation, Encoding.UTF8, "application/json-patch+json"));

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<CatalogDto>(body, _jsonSerializerOptions);
        Assert.Equal(catalogId, result.Id);
        Assert.Equal(2, result.Dishes.First().Items.Count);
        Assert.NotEqual(Guid.Empty, result.Dishes.First().Items.Last().Id);
        Assert.Equal("New Pizza ItemEntity", result.Dishes.First().Items.Last().Name);
    }

    [Fact]
    public async Task PatchCatalog_NotFound()
    {
        // Arrange
        var nonExistingCatalogId = Guid.Parse("5960c289-ceab-4a18-aa18-eb04183083ed");
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
        var response = await _httpClient.PatchAsync($"api/catalog/{nonExistingCatalogId}", new StringContent(addNewItemOperation, Encoding.UTF8, "application/json-patch+json"));

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}