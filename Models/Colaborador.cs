using System.Collections.Generic;

namespace projetoTeste.Models
{
    public partial class Colaborador
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public float Salario { get; set; }

        public int IdCargo { get; set; }

        public virtual Cargo IdCargoNavigation { get; set; }
    }
}
