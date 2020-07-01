using RP.DAL.Repository;

namespace UniOdonto.BO
{
    public interface IUnitOfWorkService
    {
        IUnitOfWork UnitOfWork { get; set; }

    }
}
