using UniOdonto.DAL.Entidad;
using RP.DAL.Repository;
using System;

namespace UniOdonto.BO
{
    public class NumeracionService : EntityService<Numeraciones>
    {
        public NumeracionService()
        {

        }
        public NumeracionService(IUnitOfWork unitOfWork)
                : base(unitOfWork)
        {
        }
        
        public static string GetCodigoSecuencial(Guid EmpresaId, string TipoDoc, char caracter, int numeroDigitos)
        {
            var secuencial = GetSecuencial(EmpresaId, TipoDoc);
            return secuencial.ToString().PadLeft(numeroDigitos, caracter);
        }
        public static int GetSecuencial(Guid EmpresaId, string TipoDoc)
        {
            try
            {
                var numero = 1;
                 
                using (var service = new NumeracionService())
                {
                    var result = service.FirstOrDefault(n => n.EmpresaId == EmpresaId && n.TipoDoc == TipoDoc);
                    if (result == null)
                    {
                        result = new Numeraciones()
                        {
                            EmpresaId = EmpresaId,
                            TipoDoc = TipoDoc,
                            Secuencial = numero
                        };
                        service.Create(result);
                    }
                    else
                    {
                        numero = result.Secuencial + 1;
                        result.Secuencial = numero;
                        service.Update(result);
                    }
                }

                return numero;
            }
            catch
            {
                return 0;
            }
        }
    }
}