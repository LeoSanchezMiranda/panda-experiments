using System.Collections.Generic;

namespace Checkout.WebAPI.Models
{
    public class ShippingAddressResponse
    {
        public ShippingAddressResponse()
        {
            Errors = new List<ResponseError>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string PostShippingAddress { get; set; }
        public List<ResponseError> Errors { get; set; }
    }
}