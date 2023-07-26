using BookReservationApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookReservationApp.Services;

namespace BookReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly LibDbContext _dbContext;
        private readonly PasswordService passwordService;
        public UserController(LibDbContext dbContext)
        {
            _dbContext = dbContext;
            passwordService = new PasswordService();
        }

        [HttpGet("GetAllUsers")]
        public IActionResult Get()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Username == user.Username);
            if (existingUser != null)
            {
                return BadRequest("This username has already been used.");
            }

            string hashedPassword = passwordService.HashPassword(user.Password);
            user.Password = hashedPassword;

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public IActionResult Update([FromBody] User user)
        {
            var usr = _dbContext.Users.FirstOrDefault(b => b.UserId == user.UserId);
            if (usr == null)
                return NotFound();

            usr.UserFirstName = user.UserFirstName;
            usr.UserLastName = user.UserLastName;
            usr.UserDescription = user.UserDescription;
            _dbContext.SaveChanges();
            return Ok(usr);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var usr = _dbContext.Users.FirstOrDefault(b => b.UserId == id);
            if (usr == null)
                return NotFound();

            _dbContext.Users.Remove(usr);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
