using System;
using System.Collections.Generic;

namespace hiddenGems {
    public class User {
        public int id { get; }
        
        public User(int id) {
            this.id = id;
        }
    }

    public class Character : User {
        public string name { get; set; }
        public int gold { get; set; }
        public Dictionary<int, Equipment> equipment { get; }

        private Dictionary<int, int> attributes;

        public Character(int id, string name, int gold) : base(id) {
            this.name = name;
            this.gold = gold;

            this.attributes = new Dictionary<int, int>();
            this.equipment = new Dictionary<int, Equipment>();
        }

        public void setCharacterAttribute(int attributeId, int value) {
            this.attributes[attributeId] = value;
        }

        public void unsetCharacterAttribute(int attributeId) {
            this.attributes.Remove(attributeId);
        }

        public void addEquipment(Equipment equipment) {
            this.equipment.Add(equipment.id, equipment);
        }
    }
}