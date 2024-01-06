using ProjectAlpha.Catalog.Entities;

public partial class Program
{
    public static WebApplication App { get; private set; }

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.AddServiceDefaults();

        builder.Services.AddControllers().AddNewtonsoftJson();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<ICatalogRepository, CatalogRepository>();
        builder.Services.AddSingleton(new ItemDbContext(
            connectionString: "AccountEndpoint=https://tryout123.documents.azure.com:443/;AccountKey=rSXVpb79bsO5yMWi9UvPImDp33BxVEzJYPeQdfnfuwk8JVZRuWO9pFHW6ocstwXqSagbRUP9yMLCACDbi1gB3w==",
            databaseName: "CatalogCosmosDb",
            containerName: "FoodCatalogs"));

        builder.Services.AddDbContext<CatalogCosmosDbContext>(options =>
            options.UseCosmos(
                connectionString: "AccountEndpoint=https://tryout123.documents.azure.com:443/;AccountKey=rSXVpb79bsO5yMWi9UvPImDp33BxVEzJYPeQdfnfuwk8JVZRuWO9pFHW6ocstwXqSagbRUP9yMLCACDbi1gB3w==",
                databaseName: "CatalogCosmosDb"));


        /*builder.Services.AddDbContext<CatalogCosmosDbContext>(options =>
            options.UseCosmos(
                builder.Configuration["CosmosDb:Endpoint"]!,
                builder.Configuration["CosmosDb:Key"]!,
                builder.Configuration["CosmosDb:DatabaseName"]!));*/

        builder.Services.AddAutoMapper(cfg =>
        {
            cfg.CreateMap<CatalogDto, CatalogEntity>().ForMember(m => m.Id, o =>
            {
                o.MapFrom(s => Guid.NewGuid());
            });
            cfg.CreateMap<CatalogEntity, CatalogDto>();
            cfg.CreateMap<DishDto, DishEntity>().ReverseMap();
            cfg.CreateMap<ItemDto, ItemEntity>().ReverseMap();
        });

        App = builder.Build();

        App.MapDefaultEndpoints();

        if (App.Environment.IsDevelopment())
        {
            App.UseSwagger();
            App.UseSwaggerUI();
        }

        var scopeFactory = App.Services.GetRequiredService<IServiceScopeFactory>();

        if (builder.Configuration["CosmosDb:DatabaseName"]!.StartsWith("Test"))
            ResetTestData();

        using (var scope = scopeFactory.CreateScope())
        {
            var catalogCosmosDbContext = scope.ServiceProvider.GetRequiredService<CatalogCosmosDbContext>();
            catalogCosmosDbContext.Database.EnsureCreated();
            if (builder.Configuration["CosmosDb:DatabaseName"]!.StartsWith("Test"))
                catalogCosmosDbContext.SeedDatabase();
        }

        App.UseRouting();

        App.MapControllers();

        App.Run();
    }
}
