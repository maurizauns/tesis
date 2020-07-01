using System;
using System.Linq;
namespace UniOdonto.Comun
{

    public class RpException : Exception
    {
        private Exception ex;
        public string Mensaje2 { get; set; }

        public RpException()
        {
            this.ex = this;
            RegistrarError();
        }
        public RpException(string message)
            : base(message)
        {
            this.ex = this;
            RegistrarError();
        }
        public RpException(string message, Exception inner)
            : base(message, inner)
        {
            this.ex = this;
            RegistrarError();
        }
        protected RpException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context)
            : base(info, context)
        {
            this.ex = this;
            RegistrarError();
        }

        public RpException(Exception ex, params string[] mensajes)
            : base(ex.Message, ex)
        {
            this.ex = ex;
            Mensaje2 = RpException.ProcesarMensaje(mensajes);
            RegistrarError();
        }

        public RpException(params string[] mensajes)
            : base(RpException.ProcesarMensaje(mensajes))
        {
            this.ex = this;
            Mensaje2 = base.Message;
            RegistrarError();
        }

        private static string ProcesarMensaje(params string[] mensajes)
        {
            var mensajeCompleto = "";
            if (mensajes != null && mensajes.Any())
            {
                foreach (var mensaje in mensajes)
                {
                    mensajeCompleto = string.Concat(mensajeCompleto, mensaje);
                }
            }
            return mensajeCompleto;
        }

        private void RegistrarError()
        {
            Log(string.Concat("msj1=", base.Message), string.Concat("msj2=", Mensaje2));
        }

        private void Log(params string[] mensajes)
        {
            try
            {
                var rutaLogs = string.Format("{0}logs", AppDomain.CurrentDomain.BaseDirectory);

                if (!System.IO.Directory.Exists(rutaLogs))
                {
                    System.IO.Directory.CreateDirectory(rutaLogs);
                }

                var path = string.Format("{0}\\log_{1}.txt", rutaLogs, DateTime.Now.ToString("ddMMyyyy"));

                using (var sw = new System.IO.StreamWriter(path, true))
                {
                    sw.WriteLine();
                    sw.WriteLine(string.Format("-{0:dd/MM/yyyy HH:mm:ss}", DateTime.Now));
                    foreach (var mensaje in mensajes)
                    {
                        sw.WriteLine(mensaje);
                    }
                    sw.WriteLine(string.Format("StackTrace: {0}", ex.StackTrace));
                    sw.WriteLine("___");
                    sw.Close();
                }
            }
            catch
            {

            }
        }
    }

}
