using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WaitTimeCalculationApi.Models;

namespace WaitTimeCalculationApi.Data
{
    public class ApplicationDbContext(DbContextOptions dbContextOptions) : IdentityDbContext<User>(dbContextOptions)
    {
        public DbSet<Line> Lines { get; set; }
        public DbSet<LineEntry> LineEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.UseGuidCollation(string.Empty);

            builder.Entity<LineEntry>()
            .HasOne(u => u.User)
            .WithMany(u => u.LineEntries)
            .HasForeignKey(p => p.UserId);

            builder.Entity<LineEntry>()
            .HasOne(u => u.Line)
            .WithMany(u => u.LineEntries)
            .HasForeignKey(p => p.LineId);

            List<IdentityRole> roles =
            [
                new IdentityRole
                {
                    Id = "admin-role-id",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "user-role-id",
                    Name = "User",
                    NormalizedName = "USER"
                }
            ];

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}