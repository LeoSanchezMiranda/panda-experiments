using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Cors;
using System.Web.Http.Filters;
using Checkout.WebAPI.DataAccess;

namespace Checkout.WebAPI.Controllers
{
    [TokenAuthentication]
    public class MainController : ApiController
    {
        public string CartId {get; set; }
        public CartService CartService { get; set; }
        public MainController()
        {
            this.CartService = new CartService();
        }

        public void SetCartToken()
        {
            var token = Request.Headers.GetValues("Token").First();

            if (token.Contains("/"))
            {
                CartId = token.Split('/')[1];
            }
        }
    }


}

public class TokenAuthenticationAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(HttpActionContext actionContext)
    {
        if (actionContext.Request.Headers.Contains("Token") == false)
        {
            actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        base.OnActionExecuting(actionContext);
    }
}