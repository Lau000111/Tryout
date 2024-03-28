using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using IdentityModel;

namespace IdentityServerAspNetIdentity;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResource()
            {
                Name = "verification",
                UserClaims = new List<string> 
                { 
                    JwtClaimTypes.Email,
                    JwtClaimTypes.EmailVerified
                }
            },
            new IdentityResource("color", new [] { "favorite_color" })

        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        { 
            new ApiScope(name: "api1", displayName: "My API")
        };

    public static IEnumerable<Client> Clients =>
        new Client[] 
        {
            new Client
            {
                ClientId = "web",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,
                
                // where to redirect to after login
                RedirectUris = { "https://localhost:5002/signin-oidc" },

                // where to redirect to after logout
                PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },

                AllowOfflineAccess = true,

                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "verification",
                    "api1",
                    "color"
                }
            },
            new Client
            {
                ClientId = "interactive.confidential",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,
                
                // where to redirect to after login
                RedirectUris = { "https://localhost:5173/signin-oidc" },

                // where to redirect to after logout
                PostLogoutRedirectUris = { "https://localhost:5173/signout-callback-oidc" },

                AllowOfflineAccess = true,

                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "verification",
                    "api1",
                }
            }
        };
}