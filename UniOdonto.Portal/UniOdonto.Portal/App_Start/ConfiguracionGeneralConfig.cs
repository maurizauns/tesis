using System.Linq;
using System.Web.Mvc;

namespace UniOdonto
{
    public class ConfiguracionGeneralConfig : RazorViewEngine
    {
        public ConfiguracionGeneralConfig()
        {
            var viewFormat = ViewLocationFormats.ToList();
            viewFormat.Add("~/Views/Shared/ConfiguracionGeneral/{0}.cshtml");
            ViewLocationFormats = viewFormat.ToArray();
        }
    }
}