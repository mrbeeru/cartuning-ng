using AppServer.DataAccess.Repositories;
using AppServer.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Quizalot;
using Quizalot.Core.Authentication;
using System.Text;

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
//services.AddSingleton<IAuthorizationMiddlewareResultHandler, AuthorizePermissionMiddlewareResultHandler>();
services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();

//add authentication
string key = @"YKBRWt6MzLc$uZfM+E^xM6_PqJbxEjAx?D_hQMG2Wq8unpbBJKu@QaP&UGD?^2sDhr-4gL&%&Rf3Hkaytk4G6Mnb93ZGgq3fNH^zKM_@$D^67NRa_JdCp8FZ5Hzgx7P9";
services.AddSingleton<IJwtAuthentication>(new JwtAuthentication(key));
services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});


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

