using System;
namespace UniOdonto.DAL.Entidad
{
   public  class Horarios: BaseEntity
    {
        public Guid? PropietarioId { get; set; }
        public virtual Usuario Propietario { get; set; }
        public Guid AgendasId { get; set; }
        public virtual Agendas Agendas { get; set; }
        public int Dia { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }
    }
}