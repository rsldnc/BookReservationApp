using BookReservationApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly LibDbContext _dbContext;
        public BookController(LibDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAllBooks")]
        public IActionResult Get()
        {
            var books = _dbContext.Books.ToList();
            return Ok(books);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Book book)
        {
            book.isReserved = false;
            book.ReservedBy = 0;
            _dbContext.Books.Add(book);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public IActionResult Update([FromBody] Book book)
        {
            var bk = _dbContext.Books.FirstOrDefault(d => d.BookId == book.BookId);
            if (bk == null)
                return NotFound();

            bk.BookName = book.BookName;
            bk.BookAuthor = book.BookAuthor;
            bk.BookPublishedYear = book.BookPublishedYear;
            bk.Category = book.Category;
            bk.BookSummary = book.BookSummary;
            _dbContext.SaveChanges();
            return Ok(bk);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var bk = _dbContext.Books.FirstOrDefault(d => d.BookId == id);
            if (bk == null)
                return NotFound();

            _dbContext.Books.Remove(bk);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
