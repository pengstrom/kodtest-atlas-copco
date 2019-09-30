using System;
using System.Collections.Generic;
using System.Linq;

namespace hiddenGems {

    public class Equipment {
        public enum EquipmentType { Armor, Weapon, Trinket };

        public int id { get; }
        public string name { get; set; } = "";
        public int price { get; set; } = 0;

        public Dictionary<int, (Attribute, int)> bonuses;

        public readonly EquipmentType type = EquipmentType.Armor;

        public Equipment(int id, EquipmentType type) {
            this.id = id;
            this.type = type;

            this.bonuses = new Dictionary<int, (Attribute, int)>();
        }

        public IEnumerable<(Attribute, int)> getBonuses() {
            return from bonus in this.bonuses select bonus.Value;
        }

        public void setAttributeBonus(Attribute attribute, int modifier) {
            this.bonuses[attribute.id] = (attribute, modifier);
        }

        public void unsetAttributeBonus(int attributeId) {
            this.bonuses.Remove(attributeId);
        }
    }

    // public class Armor : Equipment {
    //     public Armor(int id) : base(id) {}
    // }

    // public class Weapon : Equipment {
    //     public Weapon(int id) : base(id) {}
    // }

    // public class Trinket : Equipment {
    //     public Trinket(int id) : base(id) {}
    // }
}