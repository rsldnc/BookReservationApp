using BookReservationApp.Models;
using BookReservationApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LibDbContext _dbContext;
        private readonly PasswordService passwordService;
        public LoginController(LibDbContext dbContext)
        {
            _dbContext = dbContext;
            passwordService = new PasswordService();
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginData loginData)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == loginData.username);
            if (user != null)
            {
                bool passwordMatch = passwordService.VerifyPassword(loginData.password, user.Password);

                if (passwordMatch)
                {
                    if (user.Role == RoleType.Admin)
                    {
                        return Ok(new {message = "Login as admin."});
                    }
                    else
                    {
                        return Ok(new {message = "Login as reader.", userId = user.UserId});
                    }
                }
            }

            return Unauthorized(new {message = "Username or password is wrong."});
        }
    }

    public class LoginData
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
