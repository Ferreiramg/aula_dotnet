
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using projetoTeste.Models;
using Microsoft.EntityFrameworkCore;

namespace projetoTeste.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ColaboradorController : ControllerBase
    {
        private BDContexto contexto;

        public ColaboradorController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }

        public List<Colaborador> Filter(string? cargo, string? nome)
        {

            if (nome != null && cargo != null)
                return this.selecteQuery().Where(x => x.IdCargoNavigation.Nome == cargo)
                .Where(x => x.Nome.Contains(nome)).ToList();

            if (cargo != null)
                return this.selecteQuery().Where(x => x.IdCargoNavigation.Nome == cargo).ToList();
            if (nome != null)
                return this.selecteQuery().Where(x => x.Nome.Contains(nome)).ToList();

            return this.Listar();
        }

        [HttpGet]
        public List<Colaborador> Listar()
        {
            return contexto.Colaborador.Include(c => c.IdCargoNavigation).OrderBy(c => c.Nome).Select
           (
               c => new Colaborador
               {
                   Id = c.Id,
                   Nome = c.Nome,
                   Salario = c.Salario,
                   IdCargoNavigation = new Cargo
                   {
                       Id = c.IdCargoNavigation.Id,
                       Nome = c.IdCargoNavigation.Nome,
                       Tipo = c.IdCargoNavigation.Tipo,
                       SalarioMinimo = c.IdCargoNavigation.SalarioMinimo,
                       SalarioMaximo = c.IdCargoNavigation.SalarioMaximo
                   }
               }).ToList();
        }
        [HttpPost]
        public List<Colaborador> Store(Models.Colaborador model)
        {
            contexto.Colaborador.Add(model);
            contexto.SaveChanges();

            return new List<Colaborador> { model };
        }

        private IQueryable<Colaborador> selecteQuery()
        {
            return contexto.Colaborador.Include(c => c.IdCargoNavigation).OrderBy(c => c.Nome).Select
           (
               c => new Colaborador
               {
                   Id = c.Id,
                   Nome = c.Nome,
                   Salario = c.Salario,
                   IdCargo = c.IdCargo,
                   IdCargoNavigation = new Cargo
                   {
                       Id = c.IdCargoNavigation.Id,
                       Nome = c.IdCargoNavigation.Nome,
                       Tipo = c.IdCargoNavigation.Tipo,
                       SalarioMinimo = c.IdCargoNavigation.SalarioMinimo,
                       SalarioMaximo = c.IdCargoNavigation.SalarioMaximo
                   }
               });
        }
    }
}