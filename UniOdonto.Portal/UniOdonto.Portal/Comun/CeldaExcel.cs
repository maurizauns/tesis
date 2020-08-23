using System;
using System.Globalization;


namespace UniOdonto.Comun
{
    [Serializable]
    public class CeldaExcel
    {
        public int Index { get; set; }
        public string Columna { get; set; }
        public int Fila { get; set; }
        public string Nombre { get; set; }
        public object Valor { get; set; }
        public string Celda
        {
            get { return string.Format("{0}{1}", Columna, Fila); }
        }

        public FilaExcel FilaExcel { get; set; }

        public CeldaExcel(string nombre)
        {
            Nombre = nombre;
        }

        public override string ToString()
        {
            return string.Format("{0}({1})={2}", Celda, Nombre, Valor);
        }

        public string ToValueString()
        {
            return !IsEmpty ? Valor.ToString() : null;
        }

        public int? ToValueInt()
        {
            if (IsEmpty)
            {
                return null;
            }

            int intValue;
            if (int.TryParse(Valor.ToString(), out intValue))
            {
                return intValue;
            }
            return null;
        }

        public bool? ToValueBool()
        {
            if (IsEmpty)
            {
                return null;
            }

            if (Valor.ToString().ToUpper() == "TRUE" || Valor.ToString().ToUpper() == "S")
            {
                return true;
            }
            if (Valor.ToString().ToUpper() == "FALSE" || Valor.ToString().ToUpper() == "N")
            {
                return false;
            }

            bool boolValue;
            if (bool.TryParse(Valor.ToString(), out boolValue))
            {
                return boolValue;
            }
            return null;
        }

        public DateTime? ToValueDateTime()
        {
            if (IsEmpty)
            {
                return null;
            }
            DateTime dateValue;
            var valor = Valor.ToString();
            if (valor.Length > 18)
            {
                valor = valor.Substring(0, 18);
            }

            if (DateTime.TryParseExact(valor, Context.FormatoFechaHora, null, DateTimeStyles.AdjustToUniversal,
                out dateValue))
            {
                return dateValue;
            }
            return null;
        }

        public DateTime? ToValueDate()
        {
            if (IsEmpty)
            {
                return null;
            }
            DateTime dateValue;
            var valor = Valor.ToString();
            if (valor.Length > 10)
            {
                valor = valor.Substring(0, 10);
            }

            if (DateTime.TryParseExact(valor, Context.FormatoFecha, null, DateTimeStyles.AdjustToUniversal,
                out dateValue))
            {
                return dateValue;
            }
            return null;
        }

        public float? ToValueFloat()
        {
            if (IsEmpty)
            {
                return null;
            }
            float floatValue;
            if (float.TryParse(Valor.ToString(), out floatValue))
            {
                return floatValue;
            }
            return null;
        }

        public decimal? ToValueDecimal()
        {
            if (IsEmpty)
            {
                return null;
            }
            decimal decimalValue;
            if (decimal.TryParse(Valor.ToString(), out decimalValue))
            {
                return decimalValue;
            }
            return null;
        }

        public bool IsEmpty
        {
            get
            {
                return Valor == null || string.IsNullOrEmpty(Valor.ToString());
            }
        }
    }
}