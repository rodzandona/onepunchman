using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailWithAttachmentAsync(string toEmail, string subject, string body, string attachmentPath)
        {
            var smtpHost = _config["Smtp:Host"];
            var smtpPort = int.Parse(_config["Smtp:Port"]);
            var smtpUser = _config["Smtp:User"];
            var smtpPass = _config["Smtp:Pass"];
            var fromEmail = _config["Smtp:From"];

            // Console.WriteLine($"SMTP Host: {_config["Smtp:Host"]}");
            // Console.WriteLine($"SMTP Port: {_config["Smtp:Port"]}");
            // Console.WriteLine($"SMTP User: {_config["Smtp:User"]}");
            // Console.WriteLine($"SMTP From: {_config["Smtp:From"]}");
            // Console.WriteLine($"SMTP Pass is null? {_config["Smtp:Pass"] == null}");


            using var client = new SmtpClient(smtpHost, smtpPort)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl = true
            };

            using var mail = new MailMessage(fromEmail, toEmail, subject, body);
            mail.Attachments.Add(new Attachment(attachmentPath));

            await client.SendMailAsync(mail);
        }
    }
}
