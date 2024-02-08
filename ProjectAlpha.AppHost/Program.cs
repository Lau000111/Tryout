var builder = DistributedApplication.CreateBuilder(args);

// Backend
var catalogProject = builder.AddProject<Projects.ProjectAlpha_Catalog>(nameof(Projects.ProjectAlpha_Catalog));
// var restaurantProject = builder.AddProject<Projects.ProjectAlpha_Restaurant>(nameof(Projects.ProjectAlpha_Restaurant));

// Reverse-proxies
builder.AddProject<Projects.ProjectAlpha_Mobile_BFF>(nameof(Projects.ProjectAlpha_Mobile_BFF))
    .WithReference(catalogProject);

// Frontend
builder.AddNpmApp("dine-fusion", "../dine-fusion")
    .WithReference(catalogProject)
    .WithServiceBinding(containerPort: 3000, scheme: "http", env: "PORT")
    .AsDockerfileInManifest();


builder.AddNpmApp("admin-page", "../admin-page")
    .WithReference(catalogProject)
    .WithServiceBinding(containerPort: 3001, scheme: "http", env: "PORT")
    .AsDockerfileInManifest();

builder.Build().Run();
