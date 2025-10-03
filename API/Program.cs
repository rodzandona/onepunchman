using api.Data;
using API;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json.Serialization;

internal class Program 
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        StartAPI(builder);

        void StartAPI(WebApplicationBuilder builder)
        {

            builder.Configuration
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            //.AddJsonFile("appsettings.PD.json", optional: true)
            .AddEnvironmentVariables();

            ConfigureAuthentication(builder);
            ConfigureMvc(builder);
            ConfigureServices(builder);
            Configuration(builder);
        }

        void Configuration(WebApplicationBuilder builder)

        {           

            var app = builder.Build();

            string prod = "/onepunchman.api";
            if (app.Environment.IsDevelopment())
            {
                prod = "";
            }

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.RoutePrefix = "swagger";
                options.SwaggerEndpoint($"{prod}/swagger/api/swagger.json", "Documento - API Yard Management");
            });

            app.UseCors("CorsPolicy");
            app.Run();
        }

        void ConfigureAuthentication(WebApplicationBuilder builder)
        {
            var configuration = builder.Configuration;

            var jwtKey = configuration["JwtKey"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new ArgumentNullException("JwtKey", "JwtKey está faltando ou nula nas configurações.");
            }
            var key = Encoding.ASCII.GetBytes(jwtKey);

            builder.Services.
                AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }).
                AddJwtBearer(x =>
                {
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });
        }

        void ConfigureMvc(WebApplicationBuilder builder)
        {
            builder.Services
                .AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy", builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
                })
                .AddMemoryCache()
                .AddControllers()
                .AddJsonOptions(x =>
                {
                    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                    x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;
                })
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.SuppressModelStateInvalidFilter = true;
                });
        }

        void ConfigureServices(WebApplicationBuilder builder)
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<DataBaseContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddTransient<TokenService>();

            builder.Services.AddMvc().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.NullValueHandling = NullValueHandling.Include;
                options.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Include;
            });

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("api", new OpenApiInfo
                {
                    Title = "API - OnePunchMan Management",
                    Description = "Documento da API - OnePunchMan Management",
                    Version = "v1"
                });
            });

            builder.Services.AddScoped<AuthService>();
            builder.Services.AddTransient<ExcelService>();
            builder.Services.AddTransient<EmailService>();



        }


    }

}




