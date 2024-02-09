﻿namespace ProjectAlpha.Restaurant.Models
{
    public class RestaurantDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        // public DateOnly InaugurationDate { get; set; }

        public string Address { get; set; }

        public string CuisineType { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public ContactDto OwnerContact { get; set; }
    }
}
