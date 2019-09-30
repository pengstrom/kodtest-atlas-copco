using System;
using System.Linq;
using System.Collections.Generic;

namespace hiddenGems {
    public class EquipmentExport {
        public int id { get; }
        public string name { get; }
        public BonusExport[] bonuses { get; }
        public string type { get; }
        public int price { get; }

        public EquipmentExport(Equipment equipment) {
            this.id = equipment.id;
            this.name = equipment.name;
            this.type = equipment.type.ToString().ToLower();
            this.price = equipment.price;

            var bonuses = this.exportBonuses(equipment);
            this.bonuses = bonuses;
        }

        private BonusExport[] exportBonuses(Equipment equipment) {
            return equipment.bonuses.Select(bonus => this.exportBonus(bonus.Value)).ToArray();
        }

        private BonusExport exportBonus((Attribute, int) bonus) {
            Attribute attribute = bonus.Item1;
            int modifier = bonus.Item2;

            AttributeExport attributeExport = new AttributeExport(bonus.Item1);
            BonusExport bonusExport = new BonusExport(attributeExport, bonus.Item2);

            return bonusExport;
        }
    }

    public class BonusExport {
        public int modifier { get; }
        public AttributeExport attribute { get; }

        public BonusExport(AttributeExport attribute, int modifier) {
            this.attribute = attribute;
            this.modifier = modifier;
        }
    }
}