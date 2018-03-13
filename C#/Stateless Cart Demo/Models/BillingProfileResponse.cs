namespace Checkout.WebAPI.Models
{
    internal class BillingProfileResponse
    {
        public string FullName { get; set; }
        public string Number { get; set; }
        public string Pin { get; set; }
        public string Expiration { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string TokenRequest { get; set; }
        public string BillingPostRequest { get; set; }
    }
}