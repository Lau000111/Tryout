var builder = DistributedApplication.CreateBuilder(args);

var catalogProject = builder.AddProject<Projects.ProjectAlpha_Catalog>(nameof(Projects.ProjectAlpha_Catalog));

builder.AddProject<Projects.ProjectAlpha_Ordering>(nameof(Projects.ProjectAlpha_Ordering));

builder.AddProject<Projects.ProjectAlpha_Payment>(nameof(Projects.ProjectAlpha_Payment));

builder.AddProject<Projects.ProjectAlpha_Mobile_BFF>(nameof(Projects.ProjectAlpha_Mobile_BFF))
    .WithReference(catalogProject);

builder.AddNpmApp("DineFusion", "../DineFusion")
    .WithReference(catalogProject)
    .WithServiceBinding(containerPort: 3000, scheme: "http", env: "PORT")
    .AsDockerfileInManifest();


builder.AddNpmApp("admin-page", "../admin-page")
    .WithReference(catalogProject)
    .WithServiceBinding(containerPort: 3001, scheme: "http", env: "PORT")
    .AsDockerfileInManifest();

builder.Build().Run();
