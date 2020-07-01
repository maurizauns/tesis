using System;
using System.Data.Entity;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using AutoMapper;
using UniOdonto.DAL;
//using UniOdonto.DAL.Migrations;
using UniOdonto.Helpers;


namespace UniOdonto.Portal
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //if (Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["MigrateDatabaseToLatestVersion"]))
            //{
            //    Database.SetInitializer(new MigrateDatabaseToLatestVersion<WebVentasContext, Configuration>());
            //}

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Mapper.Initialize(c => c.AddProfile(new MaperConfig()));

            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new ConfiguracionGeneralConfig());

            ModelBinders.Binders.Add(typeof(float), new DecimalModelBinder());
            ModelBinders.Binders.Add(typeof(float?), new DecimalModelBinder());

            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            WebVentasConfig.Init();
        }
    }
}
