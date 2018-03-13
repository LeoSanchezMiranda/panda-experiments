namespace Checkout.WebAPI.Models
{
    public class BillingProfile : ShoppingAddress
    {
        public string FullName { get; set; }
        public string Number { get; set; }
        public string Pin { get; set; }
        public string Expiration { get; set; }
    }
}