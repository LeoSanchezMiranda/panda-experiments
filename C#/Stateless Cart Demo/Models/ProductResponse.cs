namespace Checkout.WebAPI.Models
{
    internal class ProductResponse
    {
        public string Id { get; set; }
        public string Status { get; set; }
        public string ImagePath { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string DeleteLink { get; set; }
        public string UpdateLink { get; set; }
        public int StatusId { get; set; }
    }
}