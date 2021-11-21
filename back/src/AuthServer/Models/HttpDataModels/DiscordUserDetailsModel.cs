using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartuningServerModels.HttpDataModels
{
    public class DiscordUserDetailsModel
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Avatar { get; set; }
        public string Discriminator { get; set; }
        public string Email { get; set; }
        public bool Verified { get; set; }
    }
}
