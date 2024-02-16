using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace ProjectAlpha.Table.FunctionalTests;

public sealed class TableApiFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly IHost _app;

    public TableApiFixture()
    {
        var options = new DistributedApplicationOptions { AssemblyName = typeof(TableApiFixture).Assembly.FullName, DisableDashboard = true };
        var appBuilder = DistributedApplication.CreateBuilder(options);
        _app = appBuilder.Build();
    }

    protected override IHost CreateHost(IHostBuilder builder)
    {
        builder.ConfigureHostConfiguration(config =>
        {
            config.AddInMemoryCollection(new Dictionary<string, string> { { "CosmosDb:DatabaseName", "TestTableCosmosDb" } });
        });
        return base.CreateHost(builder);
    }

    public new async Task DisposeAsync()
    {
        Program.ResetTestData();
        await base.DisposeAsync();
        await _app.StopAsync();
        if (_app is IAsyncDisposable asyncDisposable)
        {
            await asyncDisposable.DisposeAsync().ConfigureAwait(false);
        }
        else
        {
            _app.Dispose();
        }
    }

    public async Task InitializeAsync()
    {
        await _app.StartAsync();
    }
}

[CollectionDefinition("EndToEndInitialisationCollection", DisableParallelization = true)]
public class EndToEndInitialisationCollection : ICollectionFixture<TableApiFixture>
{
}
