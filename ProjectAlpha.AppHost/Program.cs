using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Duende.Bff.Yarp;
using React.Bff;
using Microsoft.AspNetCore.Http;

//Auth 2
var builder2 = WebApplication.CreateBuilder(args);

builder2.Services.AddBff()
    .AddRemoteApis();

builder2.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "cookie";
    options.DefaultChallengeScheme = "oidc";
    options.DefaultSignOutScheme = "oidc";
}).AddCookie("cookie", options =>
{
    options.Cookie.Name = "__Host-bff";
    options.Cookie.SameSite = SameSiteMode.Strict;
}).AddOpenIdConnect("oidc", options =>
{
    options.Authority = "https://localhost:5001/";
    options.ClientId = "interactive.confidential";
    options.ClientSecret = "secret";
    options.ResponseType = "code";
    options.ResponseMode = "query";

    options.GetClaimsFromUserInfoEndpoint = true;
    options.MapInboundClaims = false;
    options.SaveTokens = true;

    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("api1");
    options.Scope.Add("offline_access");

    options.TokenValidationParameters = new()
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

builder2.Services.AddAuthorization();

var app = builder2.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseBff();
app.UseAuthorization();
app.MapBffManagementEndpoints();

app.MapGroup("/todos")
    .ToDoGroup()
    .RequireAuthorization()
    .AsBffApiEndpoint();

app.MapFallbackToFile("/index.html");

app.Run();

var builder = DistributedApplication.CreateBuilder(args);

// Backend
var catalogProject = builder.AddProject<Projects.ProjectAlpha_Catalog>(nameof(Projects.ProjectAlpha_Catalog));
var restaurantProject = builder.AddProject<Projects.ProjectAlpha_Restaurant>(nameof(Projects.ProjectAlpha_Restaurant));

var tableProject = builder.AddProject<Projects.ProjectAlpha_Table>(nameof(Projects.ProjectAlpha_Table));

// Reverse-proxies
builder.AddProject<Projects.ProjectAlpha_Mobile_BFF>(nameof(Projects.ProjectAlpha_Mobile_BFF))
    .WithReference(catalogProject);

// Frontend
builder.AddNpmApp("dine-fusion", "../dine-fusion")
       .WithReference(catalogProject)
       .WithEndpoint(containerPort: 3000, scheme: "http", env: "PORT")
       .AsDockerfileInManifest();

builder.AddNpmApp("admin-page", "../admin-page")
    .WithReference(catalogProject)
    .WithReference(restaurantProject)
    .WithEndpoint(containerPort: 3001, scheme: "http", env: "PORT")
    .AsDockerfileInManifest();



builder.Build().Run();
