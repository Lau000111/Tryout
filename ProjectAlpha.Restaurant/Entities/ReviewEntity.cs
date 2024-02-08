namespace ProjectAlpha.Restaurant.Entities
{
    public record ReviewEntity
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string Comment { get; set; }

        public double Rating { get; set; }

        public DateTime Date { get; set; }
    }
}
