using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace projetoTeste.Models
{
    public partial class BDContexto : DbContext
    {
        public BDContexto()
        {
        }

        public BDContexto(DbContextOptions<BDContexto> options)
            : base(options)
        {
        }

        public virtual DbSet<Cargo> Cargo { get; set; }
        public virtual DbSet<Colaborador> Colaborador { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=root;database=projeto_teste");
            }
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cargo>(entity =>
            {
                entity.ToTable("cargo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(100);

                entity.Property(e => e.SalarioMaximo).HasColumnName("salario_maximo");

                entity.Property(e => e.SalarioMinimo).HasColumnName("salario_minimo");
                entity.Property(e => e.Deleteat).HasColumnName("deleted_at");
                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasColumnName("tipo")
                    .HasMaxLength(1)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Colaborador>(entity =>
            {
                entity.ToTable("colaborador");

                entity.HasIndex(e => e.IdCargo)
                    .HasName("id_cargo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdCargo).HasColumnName("id_cargo");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(100);

                entity.Property(e => e.Salario).HasColumnName("salario");
                entity.Property(e => e.Deleteat).HasColumnName("deleted_at");

                entity.HasOne(d => d.IdCargoNavigation)
                    .WithMany(p => p.Colaborador)
                    .HasForeignKey(d => d.IdCargo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("colaborador_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
