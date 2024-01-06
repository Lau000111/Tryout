using Microsoft.AspNetCore.Mvc;
using Dapr.Client;

namespace ProjectAlpha.Payment.Controllers;

[ApiController]
[Route("[controller]")]
public class PaymentController() : ControllerBase
{

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IActionResult> Get()
    {
        return Ok();
    }
}