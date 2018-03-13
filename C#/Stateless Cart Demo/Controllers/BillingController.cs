using System.Linq;
using System.Web;
using System.Web.Http;
using Checkout.WebAPI.Models;

namespace Checkout.WebAPI.Controllers
{
    public class BillingController : MainController
    {

        // GET billing
        [Route("billing")]
        public IHttpActionResult Get()
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId))
            {
                return Ok(new BillingProfileResponse());
            }

            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId)
            {
                return NotFound();
            }

            return Ok(ToBillingProfileResponse(cart));
        }

        // POST billing
        [HttpPost]
        [Route("billing")]
        public IHttpActionResult Post(BillingProfileRequest request)
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId))
            {
                return BadRequest();
            }

            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId)
            {
                return NotFound();
            }

            CartService.SaveBillingProfile(CartId, request);

            var url = string.Format("http://{0}/billing", HttpContext.Current.Request.Url.Authority);

            cart = CartService.GetCart(CartId);

            return Created(url, ToBillingProfileResponse(cart));
        }

        private BillingProfileResponse ToBillingProfileResponse(WebCart cart)
        {
            var billing = new BillingProfileResponse
            {
                BillingPostRequest = string.Format("http://{0}/billing", HttpContext.Current.Request.Url.Authority),
                TokenRequest = string.Format("http://{0}/tokenUrlStuff", HttpContext.Current.Request.Url.Authority)
            };

            if (cart.BillingProfile != null)
            {
                billing.State = cart.BillingProfile.State;
                billing.City = cart.BillingProfile.City;
                billing.Zip = cart.BillingProfile.Zip;
                billing.FirstName = cart.BillingProfile.FirstName;
                billing.LastName = cart.BillingProfile.LastName;
                billing.Address2 = cart.BillingProfile.Address2;
                billing.Address1 = cart.BillingProfile.Address1;
                billing.Expiration = cart.BillingProfile.Expiration;
                billing.FullName = cart.BillingProfile.FullName;
                billing.Number = cart.BillingProfile.Number;
                billing.Pin = cart.BillingProfile.Pin;
            }

            return billing;
        }
    }
}