using BookReservationApp.Models;
using BookReservationApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReserveController : ControllerBase
    {
        private readonly LibDbContext _dbContext;
        public ReserveController(LibDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("reserve-book")]
        public IActionResult ReserveBook([FromBody] ReservationData reservationData)
        {
            var book = _dbContext.Books.FirstOrDefault(b => b.BookId == reservationData.BookId);
            if (book == null)
            {
                return NotFound("Book is not found.");
            }

            var user = _dbContext.Users.FirstOrDefault(u => u.UserId == reservationData.UserId);
            if (user == null)
            {
                return NotFound("User is not found.");
            }

            if (book.isReserved)
                return BadRequest("Book already reserved.");

            book.isReserved = true;
            book.ReservedBy = reservationData.UserId;
            if (user.ReservedBooks == null)
            {
                user.ReservedBooks = new List<Book>();
            }
            user.ReservedBooks.Add(book);


            _dbContext.SaveChanges();

            return Ok(new { message = "Book reserved successfully." });
        }


        [HttpPost("drop-book")]
        public IActionResult DropBook([FromBody] ReservationData reservationData)
        {
            var book = _dbContext.Books.FirstOrDefault(b => b.BookId == reservationData.BookId);
            if (book == null)
            {
                return NotFound("Book is not found.");
            }

            var user = _dbContext.Users.FirstOrDefault(u => u.UserId == reservationData.UserId);
            if (user == null)
            {
                return NotFound("User is not found.");
            }

            book.isReserved = false;
            book.ReservedBy = 0;
            if (!user.ReservedBooks.Remove(book))
                user.ReservedBooks = new List<Book>();

            _dbContext.SaveChanges();

            return Ok(new { message = "Book dropped successfully." });
        }


    }

    public class ReservationData
    {
        public int BookId { get; set; }
        public int UserId { get; set; }
    }

}
