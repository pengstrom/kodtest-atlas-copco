using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace hiddenGems.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly ILogger<CharacterController> _logger;
        private Store store;

        public CharacterController(ILogger<CharacterController> logger)
        {
            _logger = logger;
            store = Store.Instance;
        }

        [HttpGet("inventory")]
        public IEnumerable<EquipmentExport> Inventory()
        {
            var equipmentExports = from eq in store.getCharacterInventory() select new EquipmentExport(eq);
            return equipmentExports;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Info(int id) {
            try {
                var character = store.getCharacterById(id);
                return Ok(new CharacterExport(character));
            } catch (StoreError e) {
                string message = e.Message;
                return BadRequest(message);
            }
        }
    }
}
