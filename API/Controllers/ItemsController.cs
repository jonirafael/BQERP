using Application.Items;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemsController : BaseApiController
    {
        [HttpGet] //api/items
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/items/id

        public async Task<ActionResult<Item>> GetItem(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult> CreateItem(Item item)
        {
            await Mediator.Send(new Create.Command { Item = item });
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(Guid id, Item item)
        {
            item.Id = id;
            await Mediator.Send(new Edit.Command { Item = item });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}