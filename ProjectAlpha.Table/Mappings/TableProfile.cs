using ProjectAlpha.Table.Entities;
using ProjectAlpha.Table.Models;

namespace ProjectAlpha.Table.Mappings;

public class TableProfile : Profile
{
    public TableProfile()
    {
        CreateMap<TableDto, TableEntity>().ReverseMap();
    }
}
