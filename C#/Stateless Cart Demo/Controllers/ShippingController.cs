using System.Linq;
using System.Web;
using System.Web.Http;
using Checkout.WebAPI.Models;

namespace Checkout.WebAPI.Controllers
{
    public class ShippingController : MainController
    {
        // GET shipping/{myCartId}
        [Route("shipping")]
        public IHttpActionResult Get()
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId))
            {
                return Ok(new ShippingAddressResponse());
            }

            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId)
            {
                return NotFound();
            }

            var shippingAddressResponse = ToShippingAddressResponse(cart);

            if (shippingAddressResponse.State == "CA")
            {
                shippingAddressResponse.Errors.Add(new ResponseError
                {
                    ErrorCode = "5",
                    ErrorDescription = "Unable to ship to selected state"
                });
            }

            return Ok(shippingAddressResponse);
        }

        // POST shipping
        [HttpPost]
        [Route("shipping")]
        public IHttpActionResult Post(ShoppingAddressRequest request)
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId))
            {
                return BadRequest();
            }

            CartService.SaveShippingAddress(CartId, request);

            var url = string.Format("http://{0}/shipping", HttpContext.Current.Request.Url.Authority);

            var cart = CartService.GetCart(CartId);

            var shippingAddressResponse = ToShippingAddressResponse(cart);

            if (shippingAddressResponse.State == "CA")
            {
                shippingAddressResponse.Errors.Add(new ResponseError
                {
                    ErrorCode = "5",
                    ErrorDescription = "Unable to ship to selected state"
                });
            }

            return Created(url, shippingAddressResponse);
        }

        private ShippingAddressResponse ToShippingAddressResponse(WebCart cart)
        {
            var address = new ShippingAddressResponse
            {
                PostShippingAddress = string.Format("http://{0}/shipping", HttpContext.Current.Request.Url.Authority)
            };

            if (cart.ShippingAddress != null)
            {
                address.Address1 = cart.ShippingAddress.Address1;
                address.Address2 = cart.ShippingAddress.Address2;
                address.City = cart.ShippingAddress.City;
                address.FirstName = cart.ShippingAddress.FirstName;
                address.LastName = cart.ShippingAddress.LastName;
                address.State = cart.ShippingAddress.State;
                address.Zip = cart.ShippingAddress.Zip;
            }

            return address;
        }
    }    
}