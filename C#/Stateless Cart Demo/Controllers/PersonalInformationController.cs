using System.Linq;
using System.Web;
using System.Web.Http;
using Checkout.WebAPI.Models;

namespace Checkout.WebAPI.Controllers
{
    public class PersonalInformationController : MainController
    {
        // GET shipping/{myCartId}
        [Route("personalinformation")]
        public IHttpActionResult Get()
        {
            var token = Request.Headers.GetValues("Token").FirstOrDefault();

            if (token == null || token.Contains("/") == false)
            {
                return Ok(new PersonalInformationResponse());
            }

            var cartId = token.Split('/')[1];

            var cart = CartService.GetCart(cartId);

            if (cart.Id != cartId)
            {
                return NotFound();
            }

            var personalInformationResponse = ToPersonalInformationResponse(cart);

            return Ok(personalInformationResponse);
        }

        // POST shipping
        [HttpPost]
        [Route("personalinformation")]
        public IHttpActionResult Post(PersonalInformationRequest request)
        {
            var token = Request.Headers.GetValues("Token").FirstOrDefault();

            if (token == null || token.Contains("/") == false)
            {
                return BadRequest();
            }

            var cartId = token.Split('/')[1];

            CartService.SaveContactInformation(cartId, request);

            var url = string.Format("http://{0}/personalinformation", HttpContext.Current.Request.Url.Authority);

            var cart = CartService.GetCart(cartId);

            var shippingAddressResponse = ToPersonalInformationResponse(cart);

            return Created(url, shippingAddressResponse);
        }

        private PersonalInformationResponse ToPersonalInformationResponse(WebCart cart)
        {
            var personalInformation = new PersonalInformationResponse
            {
                PersonalInformationPostUrl = string.Format("http://{0}/personalinformation", HttpContext.Current.Request.Url.Authority)
            };

            if (cart.PersonalInformation != null)
            {
                personalInformation.Email = cart.PersonalInformation.Email;
                personalInformation.Phone = cart.PersonalInformation.Phone;
            }

            return personalInformation;
        }
    }
}
