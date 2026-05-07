using Microsoft.EntityFrameworkCore;
using WaitTimeCalculationApi.Data;
using WaitTimeCalculationApi.Interfaces;
using WaitTimeCalculationApi.Repositories;
using WaitTimeCalculationApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var conn = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseMySql(conn, ServerVersion.AutoDetect(conn));
});

// dependency injection
builder.Services.AddScoped<ILineRepository, LineRepository>();
builder.Services.AddScoped<ILineService, LineService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();