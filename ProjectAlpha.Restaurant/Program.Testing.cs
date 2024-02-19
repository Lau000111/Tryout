﻿// Require a public Program class to implement the
// fixture for the WebApplicationFactory in the
// integration tests. Using IVT is not sufficient
// in this case, because the accessibility of the
// `Program` type is checked. 
namespace ProjectAlpha.Restaurant;

public partial class Program
{
    public static void ResetTestData()
    {
        var scopeFactory = App.Services.GetRequiredService<IServiceScopeFactory>();

        using (var scope = scopeFactory.CreateScope())
        {
            var restaurantCosmosDbContext = scope.ServiceProvider.GetRequiredService<RestaurantCosmosDbContext>();
            restaurantCosmosDbContext.Database.EnsureDeleted();
        }
    }
}