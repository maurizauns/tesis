using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using UniOdonto.DAL.Comun;
using UniOdonto.DAL.Entidad;
using EntityFramework.DynamicFilters;
namespace UniOdonto.DAL
{
    public class WebVentasContext : IdentityDbContext<ApplicationUser>
    {
        public static WebVentasContext Create()
        {
            return new WebVentasContext();
        }
        public WebVentasContext()
           // : base("DefaultConnection")
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            this.Database.CommandTimeout = 3000;
            //Database.SetInitializer<WebVentasContext>(null);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Filter("RegistrosEliminados", (IBaseEntity d, EstadoEnum estado) => d.Estado != estado, EstadoEnum.Eliminado);

            
        }

        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Menu> Menus { get; set; }
        new public DbSet<ApplicationRole> Roles { get; set; }
        public DbSet<Configuracion> Configuraciones { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Auditoria> Auditorias { get; set; }
        public DbSet<Paneles> Paneles { get; set; }
        public DbSet<Numeraciones> Numeraciones { get; set; }
        public DbSet<SubTipoIdentificacion> SubTipoIdentificacion { get; set; }
        public DbSet<TipoIdentificacion> TipoIdentificacion { get; set; }
        public DbSet<Provincias> Provincias { get; set; }
        public DbSet<Cantones> Cantones { get; set; }
        public DbSet<Personas> Personas { get; set; }
        public DbSet<Agendas> Agendas { get; set; }
        public DbSet<AgendaUsuario> AgendaUsuario { get; set; }
        public DbSet<Medicamentos> Medicamentos { get; set; }
        public DbSet<Horarios> Horarios { get; set; }
        public DbSet<Consultas> Consultas { get; set; }
        public DbSet<Odontograma> Odontograma { get; set; }
        public DbSet<Diente> Diente { get; set; }
        public DbSet<EvolucionesOdontograma> EvolucionesOdontograma { get; set; }
        public DbSet<Periodoncia> Periodoncia { get; set; }
        public DbSet<DientesPerio> DientesPerio { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<ArchivosAdjuntos> ArchivosAdjuntos { get; set; }
        public DbSet<ArchivosAdjuntosDet> ArchivosAdjuntosDet { get; set; }
        public DbSet<Receta> Receta { get; set; }
        public DbSet<Antecedentes> Antecedentes { get; set; }
    }
}