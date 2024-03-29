﻿namespace ProjectAlpha.Restaurant.Entities;

public record RestaurantEntity
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    // public DateOnly InaugurationDate { get; set; }

    public string Address { get; set; }

    public string CuisineType { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    public ContactEntity OwnerContact { get; set; }
}
