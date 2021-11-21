using AppServer.DataAccess.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Quizalot;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;
var configuration = builder.Configuration;

configuration.AddJsonFile("appserversettings.json");

//settings
services.Configure<MongoDbSettings>(configuration.GetSection("MongoDbSettings"));
services.AddSingleton(provider => provider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

//add mongo
services.AddSingleton<IMongoClient>(c => new MongoClient(c.GetService<IOptions<MongoDbSettings>>().Value.ConnectionString));
services.AddScoped(c => c.GetService<IMongoClient>().StartSession());

//add repos
services.AddScoped<ITuningRepository, TuningRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(policy => policy.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

