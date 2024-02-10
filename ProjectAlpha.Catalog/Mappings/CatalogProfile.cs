using AutoMapper;

namespace ProjectAlpha.Catalog.Mappings;

public class CatalogProfile : Profile
{
    public CatalogProfile()
    {
        CreateMap<CatalogDto, CatalogEntity>().ReverseMap();
        CreateMap<DishDto, DishEntity>().ReverseMap();
        CreateMap<ItemDto, ItemEntity>().ReverseMap();
    }
}
