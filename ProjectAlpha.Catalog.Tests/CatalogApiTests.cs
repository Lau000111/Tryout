using System.Net.Http.Json;
using System.Text.Json;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Moq;
using Newtonsoft.Json;
using ProjectAlpha.Catalog.Controllers;
using ProjectAlpha.Catalog.Entities.FoodCatalog;
using ProjectAlpha.Catalog.Models;
using ProjectAlpha.Catalog.Repositories;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ProjectAlpha.Catalog.Tests
{
    public class CatalogApiTests
    {
        private readonly WebApplicationFactory<Program> _webApplicationFactory;
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonSerializerOptions = new(JsonSerializerDefaults.Web);

        public CatalogApiTests(CatalogApiFixture fixture)
        {
            _webApplicationFactory = fixture;
            _httpClient = _webApplicationFactory.CreateClient();
        }

        [SetUp]
        public void Setup()
        {
            // use the baseaddress from aspire
            _client = new HttpClient { BaseAddress = new Uri("http://localhost:5000") };
        }

        [Test]
        public async Task GetCatalogById_ReturnsOkResult_WhenCatalogExists()
        {
            // Arrange
            var catalogId = Guid.NewGuid();

            // Act
            var response = await _client.GetAsync($"/api/catalog/{catalogId}");
            response.EnsureSuccessStatusCode();
            var stringResponse = await response.Content.ReadAsStringAsync();
            var catalog = JsonSerializer.Deserialize<FoodCatalog>(stringResponse);

            // Assert
            Assert.IsNotNull(catalog);
            Assert.AreEqual(catalogId, catalog.Id);
        }
    }
}