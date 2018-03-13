namespace Checkout.WebAPI.Controllers
{
    public class AddProductRequest
    {
        public string ProductId { get; set; }
        public int? ProductQty { get; set; }
    }
}