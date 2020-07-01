using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(UniOdonto.Portal.Startup))]
namespace UniOdonto.Portal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
