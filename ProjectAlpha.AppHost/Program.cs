var builder = DistributedApplication.CreateBuilder(args);

var catalogProject = builder.AddProject<Projects.ProjectAlpha_Catalog>(nameof(Projects.ProjectAlpha_Catalog));

builder.AddProject<Projects.ProjectAlpha_Ordering>(nameof(Projects.ProjectAlpha_Ordering));

builder.AddProject<Projects.ProjectAlpha_Payment>(nameof(Projects.ProjectAlpha_Payment));

builder.AddProject<Projects.ProjectAlpha_Mobile_BFF>(nameof(Projects.ProjectAlpha_Mobile_BFF))
    .WithReference(catalogProject);

builder.Build().Run();
