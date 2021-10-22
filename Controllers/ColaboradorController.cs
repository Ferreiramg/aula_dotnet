
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetoTeste.Models;

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


        public Colaborador GetById(int id)
        {
            return selecteQuery().FirstOrDefault(c => c.Id == id);
        }

        [HttpPost]
        public Colaborador Store([FromBody] Models.Colaborador model)
        {
            contexto.Colaborador.Add(model);
            contexto.SaveChanges();

            return this.GetById(model.Id);
        }
        [HttpDelete]
        public string Delete([FromBody] int id)
        {
            Colaborador dados = contexto.Colaborador.FirstOrDefault(c => c.Id == id);
            if (dados == null)
            {
                return "Registro não encontrado!";
            }

            contexto.Remove(dados);
            contexto.SaveChanges();
            return "Registo Apagado com sucesso!";
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