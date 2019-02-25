using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HelpDesk.Client.Startup))]
namespace HelpDesk.Client
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
