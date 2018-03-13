using System.Collections.Generic;

namespace Checkout.WebAPI.Models
{
    internal class CompleteProductResponse
    {
        public List<ProductResponse> Products { get; set; }
        public string AddProductLink { get; set; }
        public string CartId { get; set; }
    }
}