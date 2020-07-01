using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FirmasUtilities
{
    public class Correo
    {
        public string De { get; set; }
        public string Para { get; set; }
        public string ConCopia { get; set; }
        public string ConCopiaOculta { get; set; }
        public string Asunto { get; set; }
        public string Mensaje { get; set; }
        public string AdjuntosString { get; set; }
        public string ServidorCorreo { get; set; }
        public string Usuario { get; set; }
        public string Clave { get; set; }
        public int Puerto { get; set; }
        public bool HabilitaSsl { get; set; }
    }
}
