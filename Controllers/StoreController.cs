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
    public class StoreController : ControllerBase
    {
        private readonly ILogger<StoreController> _logger;
        private Store store;

        public StoreController(ILogger<StoreController> logger)
        {
            _logger = logger;
            store = Store.Instance;
        }

        [HttpGet("inventory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Inventory()
        {
            var equipmentExports = from eq in store.getInventory() select new EquipmentExport(eq);
            return Ok(equipmentExports);
        }

        [HttpPost("buy/{characterId}/{equipmentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Buy(int characterId, int equipmentId) {
            try {
                Equipment equipment = store.purchaseEquipment(characterId, equipmentId);
                return Ok(new EquipmentExport(equipment));
            } catch (StoreError e) {
                string message = e.Message;
                return BadRequest(message);
            }
        }

        [HttpPost("restock")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Restock() {
            var updatedEquipmentExports = store.generateEquipmentAndRestock().Select(eq => new EquipmentExport(eq));
            return Ok(updatedEquipmentExports);
        }

        [HttpGet("attributes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Attributes() {
            var attributeExports = store.attributes.Select(att => new AttributeExport(att.Value));
            return Ok(attributeExports);
        }
    }
}
