public partial class Program
{
    public static WebApplication App { get; private set; }

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.AddServiceDefaults();

        builder.Services.AddControllers().AddNewtonsoftJson();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<IRestaurantRepository, RestaurantRepository>();

        builder.Services.AddDbContext<RestaurantCosmosDbContext>(options =>
            options.UseCosmos(
                connectionString: "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
                databaseName: "RestaurantCosmosDb"));

        builder.Services.AddAutoMapper(typeof(RestaurantProfile));

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
            var restaurantCosmosDbContext = scope.ServiceProvider.GetRequiredService<RestaurantCosmosDbContext>();
            restaurantCosmosDbContext.Database.EnsureCreated();
            if (builder.Configuration["CosmosDb:DatabaseName"]!.StartsWith("Test"))
                restaurantCosmosDbContext.SeedDatabase();
        }

        App.UseHttpsRedirection();
        App.UseCors(static builder =>
            builder.AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyOrigin());

        App.UseRouting();
        App.MapControllers();

        App.Run();
    }
}
