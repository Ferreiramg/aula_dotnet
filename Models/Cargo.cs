
using System.Collections.Generic;

namespace projetoTeste.Models
{
    public partial class Cargo
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public double SalarioMaximo { get; set; }
        public double SalarioMinimo { get; set; }
        public string Tipo { get; set; }
        public string? Deleteat { get; set; }
        public virtual ICollection<Colaborador> Colaborador { get; set; }
    }
}
