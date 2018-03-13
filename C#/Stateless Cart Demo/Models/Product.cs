using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Checkout.WebAPI.Models
{
    public class Product
    {
        public string Id { get; set; }
        public ProductStatus Status { get; set; }
        public string ImagePath { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
    }
}