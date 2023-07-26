using System.ComponentModel.DataAnnotations;

namespace BookReservationApp.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserDescription { get; set; }

        public RoleType Role { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }

        public List<Book> ReservedBooks { get; set; }
    }
}
