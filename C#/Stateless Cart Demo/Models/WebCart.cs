using System;
using System.Collections.Generic;
using Checkout.WebAPI.Controllers;

namespace Checkout.WebAPI.Models
{
    public class WebCart
    {
        public WebCart()
        {
            Products = new List<Product>();
        }
        public string Id { get; set; }
        public ContactInformation PersonalInformation { get; set; }
        public List<Product> Products { get; set; }
        public BillingProfile BillingProfile { get; set; }
        public ShoppingAddress ShippingAddress { get; set; }
    }
}