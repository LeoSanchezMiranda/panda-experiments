using Checkout.WebAPI.Controllers;
using Checkout.WebAPI.Models;

namespace Checkout.WebAPI.DataAccess
{
    interface ICartService
    {
        void AddProduct(string cartId, string productId, int productQty);
        void UpdateProduct(string cartId, string productId, int productQty);
        WebCart GetCart(string cartId = null);
        WebCart CreateCart();
        void DeleteProduct(string cartId, string productId);
        void SaveShippingAddress(string cartId, ShoppingAddressRequest shippingAddress);
        void SaveBillingProfile(string cartId, BillingProfile billingProfile);
        void SaveContactInformation(string cartId, PersonalInformationRequest request);
    }
}