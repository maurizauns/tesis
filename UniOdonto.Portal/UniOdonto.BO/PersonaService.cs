using RP.DAL.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;
using UniOdonto.DAL.Entidad;
namespace UniOdonto.BO
{
    public class PersonaService : EntityService<Personas>
    {
        public PersonaService()
        {
        }
        public PersonaService(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        public override async Task<SaveResult> SaveAsync(Personas entity)
        {
            var result = FirstOrDefault(e => e.Id != entity.Id && e.Identificacion == entity.Identificacion && e.EmpresaId == entity.EmpresaId);

            if (result != null)
            {
                return SaveResult.Failed(new[] { string.Format("Identificacion: {0} ya asignado a {1} {2} {3} {4} ", result.Identificacion, result.PrimerNombre, result.SegundoNombre, result.PrimerApellido, result.SegundoApellido) });
            }

            return await base.SaveAsync(entity);
        }

        public static string GetTipoIdentificacion(string codigo)
        {
            return codigo == "05" ? "Cédula" : codigo == "04" ? "Ruc" : codigo == "06" ? "Pasaporte" : codigo == "07" ? "Consumidor Final" : codigo == "O9" ? "Pasaporte" : "No asignado";
        }

        public Personas GetByIdInclude(Guid personasId)
        {
            return GetAll().FirstOrDefault(f => f.Id == personasId);
        }
    }
}
