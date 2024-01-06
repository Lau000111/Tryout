﻿namespace ProjectAlpha.Catalog.Models;

public class ItemDto
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Image { get; set; }

    public decimal Price { get; set; }
}