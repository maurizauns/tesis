using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading;


namespace UniOdonto.Comun
{
    public class Helper
    {
        //public static string SeparadorDecimal = ",";

        public static string SeparadorDecimal
        {
            get { return Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator; }
        }

        public static Decimal StrToDecimal(string valor)
        {
            if (string.IsNullOrEmpty(valor))
            {
                return 0;
            }
            valor = valor.Replace(".", SeparadorDecimal);
            valor = valor.Replace(",", SeparadorDecimal);

            decimal decimarResultado = 0;

            Decimal.TryParse(valor, out decimarResultado);
            return decimarResultado;
        }

        public static int StrToEntero(string valor)
        {
            if (string.IsNullOrEmpty(valor))
            {
                return 0;
            }

            int enteroResultado = 0;

            int.TryParse(valor, out enteroResultado);
            return enteroResultado;
        }

        public static bool StrToBoolean(string valor)
        {
            if (string.IsNullOrEmpty(valor))
            {
                return false;
            }
            if (valor.ToUpper() == "TRUE" || valor.ToUpper() == "SI" || valor.ToUpper() == "1" || valor.ToUpper() == "S" || valor.ToUpper() == "YES" || valor.ToUpper() == "Y")
            {
                return true;
            }

            bool booleanResultado = false;

            bool.TryParse(valor, out booleanResultado);
            return booleanResultado;
        }

        public static DateTime StrToFecha(string valor)
        {
            if (string.IsNullOrEmpty(valor))
            {
                return new DateTime();
            }

            DateTime fechaResultado;

            DateTime.TryParse(valor, out fechaResultado);
            return fechaResultado;
        }

        public static DateTime StrToFecha(string valor, string formato)
        {
            if (string.IsNullOrEmpty(valor))
            {
                return new DateTime();
            }

            try
            {
                return DateTime.ParseExact(valor, formato, System.Globalization.CultureInfo.InvariantCulture);
            }
            catch (Exception ex)
            {
                new RpException(ex, "Error al StrToFecha");
                return StrToFecha(valor);
            }
        }

        public static string Str(int valor)
        {
            return valor.ToString();
        }

        public static string Str(Decimal valor)
        {
            return Str(valor, ".");
        }

        public static string Str(Decimal valor, string separadorDecimal)
        {
            string valorStr = valor.ToString();

            valorStr = valorStr.Replace(".", separadorDecimal);
            valorStr = valorStr.Replace(",", separadorDecimal);

            return valorStr;
        }

        public static bool EnviarCorreo(string de, string para, string conCopia, string conCopiaOculta, string asunto, string mensaje, string servidorCorreo, string usuario, string clave, ref string respuesta)
        {
            return EnviarCorreo(de, para, conCopia, conCopiaOculta, asunto, mensaje, servidorCorreo, usuario, clave, 25, false, null, ref respuesta);
        }

        public static bool EnviarCorreo(string de, string para, string conCopia, string conCopiaOculta, string asunto, string mensaje, ref string respuesta)
        {
            return EnviarCorreo(de, para, conCopia, conCopiaOculta, asunto, mensaje, null, ref respuesta);
        }

        public static bool EnviarCorreo(string de, string para, string conCopia, string conCopiaOculta, string asunto, string mensaje, string[] rutaAdjuntos, ref string respuesta)
        {
            //var config = ConfiguracionManager.ObtenerConfiguracionCorreo();

            //var servidorCorreo = config.CorreoServidor;
            //var usuario = config.CorreoUsuario;
            //var clave = config.CorreoClave;
            //var puerto = config.CorreoPuerto;
            //var habilitaSsl = config.CorreoHabilitaSsl;

            return true; //EnviarCorreo(de, para, conCopia, conCopiaOculta, asunto, mensaje, servidorCorreo, usuario, clave, puerto, habilitaSsl, rutaAdjuntos, ref respuesta);
        }

        public static bool EnviarCorreo(string de, string para, string conCopia, string conCopiaOculta, string asunto, string mensaje, string servidorCorreo, string usuario, string clave, int puerto, bool habilitaSsl, string[] rutaAdjuntos, ref string respuesta)
        {
            var correo = new System.Net.Mail.MailMessage();
            respuesta = "EXITOSO";

            try
            {
                if (string.IsNullOrEmpty(de))
                {
                    throw new ArgumentException("parámetro de no puede ser vacio");
                }

                if (string.IsNullOrEmpty(para))
                {
                    throw new ArgumentException("parámetro para no puede ser vacio");
                }

                correo.From = new System.Net.Mail.MailAddress(de);
                correo.To.Add(para);

                if (!String.IsNullOrEmpty(conCopia))
                {
                    correo.CC.Add(conCopia);
                }

                if (!String.IsNullOrEmpty(conCopiaOculta))
                {
                    correo.Bcc.Add(conCopiaOculta);
                }

                correo.Subject = asunto;
                correo.Body = mensaje;
                correo.IsBodyHtml = true;
                correo.Priority = System.Net.Mail.MailPriority.Normal;

                #region Adjuntos

                if (rutaAdjuntos != null)
                {
                    foreach (var pathFile in rutaAdjuntos)
                    {
                        if (!File.Exists(pathFile))
                        {
                            continue;
                        }

                        Attachment Data = new Attachment(pathFile);
                        correo.Attachments.Add(Data);
                    }
                }

                #endregion

                var smtp = new System.Net.Mail.SmtpClient();
                smtp.Host = servidorCorreo;
                smtp.Port = puerto;
                smtp.EnableSsl = habilitaSsl;
                smtp.Credentials = new System.Net.NetworkCredential(usuario, clave);

                try
                {
                    smtp.Send(correo);
                }
                catch (Exception ex)
                {
                    respuesta = string.Format("ex={0}, trace:{1}", ex.Message, ex.StackTrace);
                    new RpException(ex, "Error al enviar el correo");
                    return false;
                }
            }
            catch (Exception ex)
            {
                respuesta = string.Format("ex={0}, trace:{1}", ex.Message, ex.StackTrace);
                new RpException(ex, "Error al enviar el correo");
                return false;
            }
            finally
            {
                correo.Attachments.Dispose();
                correo.Dispose();
            }
            return true;
        }
        public static bool EnviarCorreoRespaldos(string de, string para, string conCopia, string conCopiaOculta, string asunto, string mensaje, string servidorCorreo, string usuario, string clave, int puerto, bool habilitaSsl, byte[] pdf, string fileNameXml, ref string respuesta)
        {
            var correo = new System.Net.Mail.MailMessage();
            respuesta = "EXITOSO";

            try
            {
                if (string.IsNullOrEmpty(de))
                {
                    throw new ArgumentException("parámetro de no puede ser vacio");
                }

                if (string.IsNullOrEmpty(para))
                {
                    throw new ArgumentException("parámetro para no puede ser vacio");
                }

                correo.From = new System.Net.Mail.MailAddress(de);
                correo.To.Add(para);

                if (!String.IsNullOrEmpty(conCopia))
                {
                    correo.CC.Add(conCopia);
                }

                if (!String.IsNullOrEmpty(conCopiaOculta))
                {
                    correo.Bcc.Add(conCopiaOculta);
                }

                correo.Subject = asunto;
                correo.Body = mensaje;
                correo.IsBodyHtml = true;
                correo.Priority = System.Net.Mail.MailPriority.Normal;

                #region Adjuntos


                if (pdf != null)
                {
                    Attachment att = new Attachment(new MemoryStream(pdf), fileNameXml);
                    correo.Attachments.Add(att);
                }

                #endregion

                var smtp = new System.Net.Mail.SmtpClient();
                smtp.Host = servidorCorreo;
                smtp.Port = puerto;
                smtp.EnableSsl = habilitaSsl;
                smtp.Credentials = new System.Net.NetworkCredential(usuario, clave);

                try
                {
                    smtp.Send(correo);
                }
                catch (Exception ex)
                {
                    respuesta = string.Format("ex={0}, trace:{1}", ex.Message, ex.StackTrace);
                    new RpException(ex, "Error al enviar el correo");
                    return false;
                }
            }
            catch (Exception ex)
            {
                respuesta = string.Format("ex={0}, trace:{1}", ex.Message, ex.StackTrace);
                new RpException(ex, "Error al enviar el correo");
                return false;
            }
            finally
            {
                correo.Attachments.Dispose();
                correo.Dispose();
            }
            return true;
        }

        public static bool IsFileLocked(string filename)
        {
            bool Locked = false;
            try
            {
                FileStream fs =
                    File.Open(filename, FileMode.OpenOrCreate,
                    FileAccess.ReadWrite, FileShare.None);
                fs.Close();
                fs.Dispose();
            }
            catch (IOException ex)
            {
                Locked = true;
            }
            return Locked;
        }

        #region Convertir Números a Letras


        private static String[] UNIDADES = { "", "uno ", "dos ", "tres ", "cuatro ", "cinco ", "seis ", "siete ", "ocho ", "nueve " };
        private static String[] DECENAS = {"diez ", "once ", "doce ", "trece ", "catorce ", "quince ", "dieciseis ",
        "diecisiete ", "dieciocho ", "diecinueve", "veinte ", "treinta ", "cuarenta ",
        "cincuenta ", "sesenta ", "setenta ", "ochenta ", "noventa "};
        private static String[] CENTENAS = {"", "ciento ", "doscientos ", "trecientos ", "cuatrocientos ", "quinientos ", "seiscientos ",
        "setecientos ", "ochocientos ", "novecientos "};
        public static String Convertir(String numero, bool mayusculas)
        {

            Regex r;
            String literal = "";
            String parte_decimal;
            //si el numero utiliza (.) en lugar de (,) -> se reemplaza
            numero = numero.Replace(".", ",");

            //si el numero no tiene parte decimal, se le agrega ,00
            if (numero.IndexOf(",") == -1)
            {
                numero = numero + ",00";
            }
            //se valida formato de entrada -> 0,00 y 999 999 999,00
            r = new Regex(@"\d{1,9},\d{1,2}");
            MatchCollection mc = r.Matches(numero);
            if (mc.Count > 0)
            {
                //se divide el numero 0000000,00 -> entero y decimal
                String[] Num = numero.Split(',');

                //de da formato al numero decimal
                parte_decimal = Num[1] + "/100 US Dólares.";
                //se convierte el numero a literal
                if (int.Parse(Num[0]) == 0)
                {//si el valor es cero                
                    literal = "cero ";
                }
                else if (int.Parse(Num[0]) > 999999)
                {//si es millon
                    literal = getMillones(Num[0]);
                }
                else if (int.Parse(Num[0]) > 999)
                {//si es miles
                    literal = getMiles(Num[0]);
                }
                else if (int.Parse(Num[0]) > 99)
                {//si es centena
                    literal = getCentenas(Num[0]);
                }
                else if (int.Parse(Num[0]) > 9)
                {//si es decena
                    literal = getDecenas(Num[0]);
                }
                else
                {//sino unidades -> 9
                    literal = getUnidades(Num[0]);
                }
                //devuelve el resultado en mayusculas o minusculas
                if (mayusculas)
                {
                    return (literal + parte_decimal).ToUpper();
                }
                else
                {
                    return (literal + parte_decimal);
                }
            }
            else
            {//error, no se puede convertir
                return literal = null;
            }
        }

        /* funciones para convertir los numeros a literales */

        private static String getUnidades(String numero)
        {   // 1 - 9            
            //si tuviera algun 0 antes se lo quita -> 09 = 9 o 009=9
            String num = numero.Substring(numero.Length - 1);
            return UNIDADES[int.Parse(num)];
        }

        private static String getDecenas(String num)
        {// 99                        
            int n = int.Parse(num);
            if (n < 10)
            {//para casos como -> 01 - 09
                return getUnidades(num);
            }
            else if (n > 19)
            {//para 20...99
                String u = getUnidades(num);
                if (u.Equals(""))
                { //para 20,30,40,50,60,70,80,90
                    return DECENAS[int.Parse(num.Substring(0, 1)) + 8];
                }
                else
                {
                    return DECENAS[int.Parse(num.Substring(0, 1)) + 8] + "y " + u;
                }
            }
            else
            {//numeros entre 11 y 19
                return DECENAS[n - 10];
            }
        }

        private static String getCentenas(String num)
        {// 999 o 099
            if (int.Parse(num) > 99)
            {//es centena
                if (int.Parse(num) == 100)
                {//caso especial
                    return " cien ";
                }
                else
                {
                    return CENTENAS[int.Parse(num.Substring(0, 1))] + getDecenas(num.Substring(1));
                }
            }
            else
            {//por Ej. 099 
                //se quita el 0 antes de convertir a decenas
                return getDecenas(int.Parse(num) + "");
            }
        }

        private static String getMiles(String numero)
        {// 999 999
            //obtiene las centenas
            String c = numero.Substring(numero.Length - 3);
            //obtiene los miles
            String m = numero.Substring(0, numero.Length - 3);
            String n = "";
            //se comprueba que miles tenga valor entero
            if (int.Parse(m) > 0)
            {
                n = getCentenas(m);
                return n + "mil " + getCentenas(c);
            }
            else
            {
                return "" + getCentenas(c);
            }

        }

        private static String getMillones(String numero)
        { //000 000 000        
            //se obtiene los miles
            String miles = numero.Substring(numero.Length - 6);
            //se obtiene los millones
            String millon = numero.Substring(0, numero.Length - 6);
            String n = "";
            if (millon.Length > 1)
            {
                n = getCentenas(millon) + "millones ";
            }
            else
            {
                n = getUnidades(millon) + "millon ";
            }
            return n + getMiles(miles);
        }


        #endregion
    }
}
