using AutoMapper;

namespace ProjectAlpha.Catalog.Mappings;

public class CatalogProfile : Profile
{
    public CatalogProfile()
    {
        CreateMap<CatalogDto, CatalogEntity>().ForMember(m => 
            m.Id,
            o =>
            {
                o.MapFrom(s => Guid.NewGuid());
            });
        CreateMap<CatalogEntity, CatalogDto>();
        CreateMap<DishDto, DishEntity>().ReverseMap();
        CreateMap<ItemDto, ItemEntity>().ReverseMap();
    }
}
