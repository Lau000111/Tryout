namespace ProjectAlpha.Restaurant.Repositories
{
    public interface IRestaurantRepository
    {
        Task<RestaurantEntity?> GetRestaurantById(Guid restaurantId);

        Task<RestaurantEntity> CreateRestaurant(RestaurantEntity restaurantEntity);

        Task<RestaurantEntity> UpdateRestaurant(RestaurantEntity restaurantEntity);

        Task DeleteRestaurant(RestaurantEntity restaurantEntity);
    }
}
