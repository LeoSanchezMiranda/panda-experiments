using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Checkout.WebAPI.Models;

namespace Checkout.WebAPI.Controllers
{
    public class CartController : MainController
    {
        // GET cart
        [Route("cart")]
        public IHttpActionResult Get()
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId))
            {
                return Ok(ToCartResponse(CartService.CreateCart()));
            }

            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId)
            {
                return NotFound();
            }

            return Ok(ToCartResponse(cart));
        }

        private WebCartResponse ToCartResponse(WebCart cart)
        {
            return new WebCartResponse
            {
                CartId = cart.Id,
                CartItemsInformation = string.Format("http://{0}/product", HttpContext.Current.Request.Url.Authority),
                ShippingProfile = string.Format("http://{0}/shipping", HttpContext.Current.Request.Url.Authority),
                BillingProfile = string.Format("http://{0}/billing", HttpContext.Current.Request.Url.Authority),
                PersonalInformation = string.Format("http://{0}/personalinformation", HttpContext.Current.Request.Url.Authority)
            };
        }
    }
}