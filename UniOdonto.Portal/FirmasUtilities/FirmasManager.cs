using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using UniOdonto.Comun;

namespace FirmasUtilities
{
    public class FirmasManager
    {
        private string _FormatoFecha = "dd/MM/yyyy";
        public string FormatoFecha
        {
            get { return _FormatoFecha; }
            set { _FormatoFecha = value; }
        }


        private int _TimeOut = 10000;
        public int TimeOut
        {
            get { return _TimeOut; }
            set { _TimeOut = value; }
        }

        public string EncodeTo64(string texto)
        {
            var toEncodeAsBytes = ASCIIEncoding.ASCII.GetBytes(texto);
            var returnValue = Convert.ToBase64String(toEncodeAsBytes);
            return returnValue;
        }

        public string DecodeTo64(string texto64)
        {
            var data = Convert.FromBase64String(texto64);
            var decodedString = Encoding.UTF8.GetString(data);
            return decodedString;
        }


        public bool EnviarCorreo(Correo correo, ref string respuesta)
        {
            try
            {
                var adjuntos = new string[1];

                if (correo.AdjuntosString != null)
                {
                    adjuntos = correo.AdjuntosString.Split('|');
                }

                return Helper.EnviarCorreo(correo.De,
                                correo.Para,
                                correo.ConCopia,
                                correo.ConCopiaOculta,
                                correo.Asunto,
                                correo.Mensaje,
                                correo.ServidorCorreo,
                                correo.Usuario,
                                correo.Clave,
                                correo.Puerto,
                                correo.HabilitaSsl,
                                adjuntos, ref respuesta);
            }
            catch (Exception ex)
            {
                respuesta = string.Format("ex={0}, trace:{1}", ex.Message, ex.StackTrace);
                new RpException(ex, "Error al EnviarCorreo");
                return false;
            }

        }

        public string ObtenerString(string rutaArchivo)
        {
            try
            {
                if (File.Exists(rutaArchivo))
                {
                    return File.ReadAllText(rutaArchivo);
                }
                return "";
            }
            catch (Exception ex)
            {
                new RpException(ex, "Error al ObtenerString");
                return "";
            }
        }

        public int GrabarString(string rutaArchivo, string contenido)
        {
            try
            {
                using (var stream = new FileStream(rutaArchivo, FileMode.Create))
                {
                    using (var sw = new StreamWriter(stream))
                    {
                        sw.Write(contenido);
                        sw.Flush();
                    }
                }
                return 1;
            }
            catch (Exception ex)
            {
                new RpException(ex, "Error al GrabarString");
                return 0;
            }

        }
        public string[] ObtenerClavesContingencia(string rutaArchivo)
        {
            try
            {
                var tamanioClave = 37;
                var claves = new List<string>();

                var contenido = File.ReadAllText(rutaArchivo);

                var clave = "";
                char token;
                for (int i = 0; i < contenido.Length; i++)
                {
                    token = contenido[i];
                    if (!Char.IsDigit(token))
                    {
                        continue;
                    }
                    if (clave.Length == tamanioClave)
                    {
                        if (!string.IsNullOrEmpty(clave))
                        {
                            claves.Add(clave);
                        }
                        clave = "";
                    }
                    clave = string.Format("{0}{1}", clave, token);
                }

                if (!string.IsNullOrEmpty(clave) && clave.Length == tamanioClave)
                {
                    claves.Add(clave);
                }

                return claves.ToArray();
            }
            catch (Exception ex)
            {
                new RpException(ex, "Error al ObtenerClavesContingencia");
                return new string[0];
            }
        }
    }
}
