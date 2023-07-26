using System.ComponentModel.DataAnnotations;

namespace BookReservationApp.Models
{
    public class Book
    {
        [Key]
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string BookAuthor { get; set; }
        public int BookPublishedYear { get; set; }
        public string Category { get; set; }
        public string BookSummary { get; set; }

        public bool isReserved { get; set; }
        public int ReservedBy { get; set; }
    }
}
