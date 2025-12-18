using api.Data;
using API;
using API.Models;
using API.Repositories.Implementations;
using API.Repositories.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

/* =======================
   CONFIGURAÇÕES
   ======================= */

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

/* =======================
   AUTENTICAÇÃO / AUTORIZAÇÃO
   ======================= */

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new ArgumentNullException("Jwt:Key", "Jwt:Key está faltando nas configurações.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = "api.onepunchman",
            ValidAudience = "onepunchman-client",

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            ),

            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

/* =======================
   MVC / JSON / CORS
   ======================= */

builder.Services
    .AddCors(options =>
    {
        options.AddPolicy("CorsPolicy", policy =>
            policy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
    })
    .AddMemoryCache()
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                );

            return new BadRequestObjectResult(
                ApiResponse<object>.Fail("Erro de validação.", errors)
            );
        };
    });

/* =======================
   BANCO DE DADOS
   ======================= */

builder.Services.AddDbContext<DataBaseContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

/* =======================
   DEPENDENCY INJECTION
   ======================= */

builder.Services.AddScoped<IBoxService, BoxService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddTransient<TokenService>();
builder.Services.AddTransient<ExcelService>();
builder.Services.AddTransient<EmailService>();

/* =======================
   SWAGGER (JWT INTEGRADO)
   ======================= */

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("api", new OpenApiInfo
    {
        Title = "API - OnePunchMan Management",
        Description = "Documento da API - OnePunchMan Management",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Informe o token JWT no formato: Bearer {seu_token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

/* =======================
   BUILD & PIPELINE
   ======================= */

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.RoutePrefix = "swagger";
    options.SwaggerEndpoint(
        "/swagger/api/swagger.json",
        "API OnePunchMan Management"
    );
});

app.UseCors("CorsPolicy");

app.UseWhen(
    context => !context.Request.Path.StartsWithSegments("/swagger"),
    appBuilder =>
    {
        appBuilder.UseAuthentication();
        appBuilder.UseAuthorization();
    });

app.MapControllers().RequireAuthorization();

app.Run();

