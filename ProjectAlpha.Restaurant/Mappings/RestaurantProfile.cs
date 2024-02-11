namespace ProjectAlpha.Restaurant.Mappings;

public class RestaurantProfile : Profile
{
    public RestaurantProfile()
    {
        CreateMap<RestaurantDto, RestaurantEntity>().ReverseMap();
        CreateMap<ContactDto, ContactEntity>().ReverseMap();
    }
}