using ProjectAlpha.Restaurant.DbContexts;
using ProjectAlpha.Restaurant.Entities;
using ProjectAlpha.Restaurant.Repositiories;

namespace ProjectAlpha.Restaurant.Repositories
{
    public class RestaurantRepository(RestaurantCosmosDbContext context) : IRestaurantRepository
    {
        public Task<RestaurantEntity?> GetRestaurantById(Guid restaurantId)
        {
            return context.Restaurant.FirstOrDefaultAsync(r => r.Id == restaurantId);
        }

        public async Task<RestaurantEntity> CreateRestaurant(RestaurantEntity restaurantEntity)
        {
            context.Restaurant.Add(restaurantEntity);
            await context.SaveChangesAsync();
            return restaurantEntity;
        }

        public async Task<RestaurantEntity> UpdateRestaurant(RestaurantEntity restaurantEntity)
        {
            context.Restaurant.Update(restaurantEntity);
            await context.SaveChangesAsync();
            return restaurantEntity;
        }

        public async Task DeleteRestaurant(RestaurantEntity restaurantEntity)
        {
            context.Restaurant.Remove(restaurantEntity);
            await context.SaveChangesAsync();
        }
    }
}
