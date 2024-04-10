using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http;

var builder = DistributedApplication.CreateBuilder(args);


// Backend
var catalogProject = builder.AddProject<Projects.ProjectAlpha_Catalog>("catalog");
var restaurantProject = builder.AddProject<Projects.ProjectAlpha_Restaurant>("restaurant");
var tableProject = builder.AddProject<Projects.ProjectAlpha_Table>("table");

var reactbff = builder.AddProject<Projects.React_Bff>("react");

// Reverse-proxies
builder.AddProject<Projects.ProjectAlpha_Mobile_BFF>("reverse")
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
