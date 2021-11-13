using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quizalot.DataAccess.Entities;
using Quizalot.DataAccess.Repositories;
using Quizalot.Services.Account;
using Quizalot.Core.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Quizalot
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //settings
            services.Configure<MongoDbSettings>(Configuration.GetSection("MongoDbSettings"));
            services.AddSingleton(provider => provider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

            //add mongo
            services.AddSingleton<IMongoClient>(c => new MongoClient(c.GetService<IOptions<MongoDbSettings>>().Value.ConnectionString));
            services.AddScoped(c => c.GetService<IMongoClient>().StartSession());

            //add repos
            services.AddScoped(typeof(IRepositoryBase<AccountEntity>), typeof(RepositoryBase<AccountEntity>));
            services.AddScoped<IAccountRepository, AccountRepository>();



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
                    ValidateIssuer = true,
                    ValidateAudience = true,
                };
            });

            services.AddControllers().AddNewtonsoftJson();
            services.AddScoped<IAccountService, AccountService>();
            services.AddHttpClient();

            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "Quizalot", Version = "v1" }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Quizalot v1"));
            }

            app.UseCors(policy => policy.AllowAnyMethod().WithOrigins("http://localhost:4200").AllowAnyHeader());
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
