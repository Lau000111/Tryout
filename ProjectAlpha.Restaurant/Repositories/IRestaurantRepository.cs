using ProjectAlpha.Restaurant.Entities;

namespace ProjectAlpha.Restaurant.Repositiories
{
    public interface IRestaurantRepository
    {
        Task<RestaurantEntity?> GetRestaurantById(Guid restaurantId);

        Task<RestaurantEntity> CreateRestaurant(RestaurantEntity restaurantEntity);

        Task<RestaurantEntity> UpdateRestaurant(RestaurantEntity restaurantEntity);

        Task DeleteRestaurant(RestaurantEntity restaurantEntity);
    }
}
