using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Quizalot.DataAccess.Entities;
using Quizalot.DataAccess.Repositories;
using Quizalot.Models.HttpDataModels;
using Quizalot.Core.Authentication;
using AuthServer.Models;

namespace Quizalot.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration configuration;
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IAccountRepository accountRepository;
        private readonly IJwtAuthentication jwtAuthentication;
        private readonly HttpClient httpClient;

        public AccountService(IConfiguration configuration, IHttpClientFactory httpClientFactory, IAccountRepository accountRepository, IJwtAuthentication jwtAuthentication)
        {
            this.configuration = configuration;
            this.httpClientFactory = httpClientFactory;
            this.accountRepository = accountRepository;
            this.jwtAuthentication = jwtAuthentication;
            this.httpClient = httpClientFactory.CreateClient();
        }

        public async Task Register(NewAccountModel newAccount)
        {
            var existingAccount = await accountRepository.FindByEmailAsync(newAccount.Email);

            if (existingAccount != null)
                throw new Exception("An account with this email already exists.");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(newAccount.Password);

            var accountEntity = new AccountEntity()
            {
                Email = newAccount.Email,
                Password = passwordHash,
            };

            await accountRepository.InsertAsync(accountEntity);
        }

        public async Task<AuthenticationResultModel> DefaultAuthentication(NewAccountModel account)
        {
            var existingAccount = await accountRepository.FindByEmailAsync(account.Email);

            if (existingAccount == null)
                throw new Exception("Wrong credentials.");

            var isVerified = BCrypt.Net.BCrypt.Verify(account.Password, existingAccount.Password);

            if (!isVerified)
                throw new Exception("Wrong credentials.");

            var jwt = jwtAuthentication.Authenticate(existingAccount.Email, existingAccount.Id);
            return new AuthenticationResultModel { Jwt = jwt };
        }

        public async Task<AuthenticationResultModel> DiscordAuthentication(string code)
        {
            var accessToken = await GetDiscordAccessTokenAsync(code);
            var userDetails = await GetDiscordUserDetailsAsync(accessToken);

            //check if user exists
            var account = await accountRepository.FindByEmailAsync(userDetails.Email);

            if (account == null)
            {
                account = new AccountEntity(){ Email = userDetails.Email };
                await accountRepository.InsertAsync(account);
            }

            var jwt = jwtAuthentication.Authenticate(account.Email, account.Id);
            return new AuthenticationResultModel { Jwt = jwt };
        }

        private async Task<string> GetDiscordAccessTokenAsync(string code)
        {
            var discord = configuration.GetSection("Auth").GetSection("Discord");
            var discordClientSecret = discord["ClientSecret"];
            var discordClientId = discord["ClientId"];

            using var requestMessage = new HttpRequestMessage(HttpMethod.Post, "https://discord.com/api/oauth2/token");
            var headers = new Dictionary<string, string>()
            {
                {"client_id", discordClientId },
                {"client_secret", discordClientSecret },
                {"code", code },
                {"grant_type", "authorization_code"},
                {"redirect_uri", "http://localhost:4200/auth/login?m=discord"},
            };

            var content = new FormUrlEncodedContent(headers);
            requestMessage.Content = content;

            var response = await httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            var value = await response.Content.ReadAsStringAsync();
            var jResponse = JsonConvert.DeserializeObject<JObject>(value);
            return jResponse["access_token"].ToString();
        }

        private async Task<DiscordUserDetailsModel> GetDiscordUserDetailsAsync(string accessToken)
        {
            using var requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://discordapp.com/api/users/@me");
            requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            var userDetails = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<DiscordUserDetailsModel>(userDetails);
        }

    }
}
