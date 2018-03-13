using System.Linq;
using System.Web;
using System.Web.Http;
using Checkout.WebAPI.Models;

namespace Checkout.WebAPI.Controllers
{
    public class ProductController : MainController
    {
        // GET product
        [Route("product")]
        public IHttpActionResult Get()
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId))
            {
                return Ok(new CompleteProductResponse());
            }

            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId)
            {
                return NotFound();
            }

            var cartResponse = CreateProductsResponse(cart);

            return Ok(cartResponse);
        }

        // POST product
        [HttpPost]
        [Route("product")]
        public IHttpActionResult Post(AddProductRequest request)
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId) || string.IsNullOrWhiteSpace(request.ProductId) || request.ProductQty == null || request.ProductQty == 0)
            {
                return BadRequest();
            }

            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId)
            {
                return NotFound();
            }

            CartService.AddProduct(CartId, request.ProductId, request.ProductQty.Value);

            cart = CartService.GetCart(CartId);

            var url = string.Format("http://{0}/product", HttpContext.Current.Request.Url.Authority);

            var cartResponse = ToProductResponse(cart.Products.First(x => x.Id == request.ProductId));

            return Created(url, cartResponse);
        }

        // REMOVE product/remove/{cartId}/{productId}
        [HttpGet]
        [Route("product/remove/{productId}")]
        public IHttpActionResult Remove(string productId)
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId) || string.IsNullOrWhiteSpace(productId))
            {
                return BadRequest();
            }
            
            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId || cart.Products.All(x => x.Id != productId))
            {
                return NotFound();
            }

            CartService.DeleteProduct(CartId, productId);

            return Ok();
        }

        // UPDATE product/update/{productId}
        [HttpGet]
        [Route("product/update/{productId}/{productQty}")]
        public IHttpActionResult Update(string productId, int productQty)
        {
            SetCartToken();

            if (string.IsNullOrWhiteSpace(CartId) || string.IsNullOrWhiteSpace(productId))
            {
                return BadRequest();
            }

            var cart = CartService.GetCart(CartId);

            if (cart.Id != CartId || cart.Products.All(x => x.Id != productId))
            {
                return NotFound();
            }

            if (productQty == 0)
            {
                CartService.DeleteProduct(CartId, productId);

                return Ok("Removed");
            }

            CartService.UpdateProduct(CartId, productId, productQty);

            return Ok("Updated");
        }

        private CompleteProductResponse CreateProductsResponse(WebCart cart)
        {
            return new CompleteProductResponse
            {
                Products = cart.Products.Select(ToProductResponse).ToList(),
                CartId = cart.Id,
                AddProductLink = string.Format("http://{0}/product", HttpContext.Current.Request.Url.Authority)
            };
        }

        private ProductResponse ToProductResponse(Product product)
        {
            return new ProductResponse
            {
                Id = product.Id,
                Description = product.Description,
                ImagePath = product.ImagePath,
                Quantity = product.Quantity,
                Status = product.Status.ToString(),
                StatusId = (int)product.Status,
                DeleteLink = string.Format("http://{0}/product/remove/{1}", HttpContext.Current.Request.Url.Authority, product.Id),
                UpdateLink = string.Format("http://{0}/product/update/{1}/{{productQty}}", HttpContext.Current.Request.Url.Authority, product.Id)
            };
        }
    }
}