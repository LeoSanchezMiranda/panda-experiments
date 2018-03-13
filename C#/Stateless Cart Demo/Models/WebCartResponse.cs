namespace Checkout.WebAPI.Models
{
    internal class WebCartResponse
    {
        public string CartId { get; set; }
        public string CartItemsInformation { get; set; }
        public string ShippingProfile { get; set; }
        public string BillingProfile { get; set; }
        public string PersonalInformation { get; set; }
    }
}