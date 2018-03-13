using System;
using System.Linq;
using Checkout.WebAPI.Models;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace Checkout.WebAPI.DataAccess
{
    public class CartService : ICartService
    {
        private static readonly Lazy<ConnectionMultiplexer> Connection = new Lazy<ConnectionMultiplexer>(() => ConnectionMultiplexer.Connect("i.need.a.redis.db"));
        private static IDatabase Db => Connection.Value.GetDatabase();
        public void AddProduct(string cartId, string productId, int productQty)
        {
            var cart = GetCart(cartId);

            var product = cart.Products.FirstOrDefault(item => item.Id == productId);

            if (product == null)
            {
                cart.Products.Add(new Product { Id = productId, Quantity = productQty });
            }
            else
            {
                product.Quantity += productQty;
            }

            Db.StringSet(cartId, JsonConvert.SerializeObject(cart));
        }

        public void UpdateProduct(string cartId, string productId, int productQty)
        {
            var cart = GetCart(cartId);

            var product = cart.Products.FirstOrDefault(item => item.Id == productId);

            if (product != null)
            {
                product.Quantity = productQty;

                Db.StringSet(cartId, JsonConvert.SerializeObject(cart));
            }
            
        }
        public WebCart GetCart(string cartId = null)
        {
            if (string.IsNullOrWhiteSpace(cartId))
            {
                return new WebCart();
            }

            var cart = Db.StringGet(cartId);

            if (cart.IsNullOrEmpty)
            {
                return new WebCart();
            }

            return JsonConvert.DeserializeObject<WebCart>(cart);
        }
        public void DeleteProduct(string cartId, string productId)
        {
            var cart = GetCart(cartId);

            cart.Products.RemoveAll(item => item.Id == productId);

            Db.StringSet(cartId, JsonConvert.SerializeObject(cart));
        }
        public WebCart CreateCart()
        {
            var cartId = Guid.NewGuid().ToString();
            var cart = new WebCart { Id = cartId };
            Db.StringSet(cartId, JsonConvert.SerializeObject(cart));

            return cart;
        }
        public void SaveShippingAddress(string cartId, ShoppingAddressRequest request)
        {
            var cart = GetCart(cartId);
            cart.ShippingAddress = request;
            Db.StringSet(cartId, JsonConvert.SerializeObject(cart));
        }

        public void SaveBillingProfile(string cartId, BillingProfile billingProfile)
        {
            var cart = GetCart(cartId);
            cart.BillingProfile = billingProfile;
            Db.StringSet(cartId, JsonConvert.SerializeObject(cart));
        }
        public void SaveContactInformation (string cartId, PersonalInformationRequest request)
        {
            var cart = GetCart(cartId);
            cart.PersonalInformation = new ContactInformation {Email = request.Email, Phone = request.Phone};
            Db.StringSet(cartId, JsonConvert.SerializeObject(cart));
        }
    }
}