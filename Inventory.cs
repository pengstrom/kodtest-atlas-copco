using System;
using System.Collections.Generic;
using MathNet.Numerics.Distributions;
using System.Linq;

namespace hiddenGems {
    public class Inventory {

        private Dictionary<int, Equipment> equipment;
        private int nextEquipmentId = 1;
        private Func<int,Equipment>[] equipmentTypes;

        private Dictionary<int, Attribute> attributes;

        public Inventory(Dictionary<int, Attribute> attributes) {
            this.equipment = new Dictionary<int, Equipment>();

            this.attributes = attributes;

            this.generateEquipment(StoreConfig.NEW_EQUIPMENT_COUNT_LAMBDA);
        }

        public IEnumerable<Equipment> inventory() {
            return from eq in this.equipment select eq.Value;
        }

        private int getNextEquipmentId() {
            int id = this.nextEquipmentId;
            this.nextEquipmentId++;
            return id;
        }

        public void generateEquipment(double lambda) {
            int count = Poisson.Sample(lambda);

            Equipment[] newEquipment = Enumerable
            .Range(1, count)
            .Select(i => this.generateEquipment())
            .ToArray();

            foreach (Equipment eq in newEquipment) {
                this.equipment.Add(eq.id, eq);
            }
        }

        private Equipment generateEquipment() {
            int id = this.getNextEquipmentId();

            Equipment.EquipmentType[] types = Enum.GetValues(typeof(Equipment.EquipmentType)).Cast<Equipment.EquipmentType>().ToArray();
            Equipment.EquipmentType type = Utils.uniformFromArray(types);
            Equipment equipment = new Equipment(id, type);

            this.generateAttributes(equipment);
            this.nameEquipment(equipment);
            this.setPrice(equipment);

            return equipment;
        }

        public Equipment getEquipmentById(int equipmentId) {
            return this.equipment[equipmentId];
        }

        public void removeEquipmentById(int equipmentId) {
            this.equipment.Remove(equipmentId);
        }

        private void setPrice(Equipment equipment) {
            int price = Convert.ToInt32(Normal.Sample(StoreConfig.MEAN_GOLD / 5.0d, StoreConfig.STDDEV_GOLD / 5.0d));
            foreach (KeyValuePair<int, (Attribute, int)> bonus in equipment.bonuses) {
                price += bonus.Value.Item2 * DiscreteUniform.Sample(5, 15);
            }

            equipment.price = price;
        }

        private void generateAttributes(Equipment equipment) {
            foreach (KeyValuePair<int, Attribute> entry in this.attributes) {
                bool success = Bernoulli.Sample(StoreConfig.ATTRIBUTE_PROB) == 1;

                if (success) {
                    int modifier = Poisson.Sample(StoreConfig.MODIFIER_LAMBDA) - 1;
                    // Clamp modifier in [1,inf)
                    equipment.setAttributeBonus(entry.Value, modifier > 0 ? modifier : 1);
                }
            }
        }


        private void nameEquipment(Equipment equipment) {
            bool adjective = Bernoulli.Sample(StoreConfig.ADJECTIVE_PROB) == 1;
            bool property = Bernoulli.Sample(StoreConfig.PROPERTY_PROB) == 1;

            string name = "";

            switch (equipment.type) {
                case Equipment.EquipmentType.Armor:
                    name = this.randomArmorName();
                    break;
                case Equipment.EquipmentType.Weapon:
                    name = this.randomWeaponName();
                    break;
                case Equipment.EquipmentType.Trinket:
                    name = this.randomTrinketName();
                    break;
                default:
                    throw new Exception($"Unhandled equipment type {equipment.ToString()}!");
            }

            if (adjective) {
                name = this.randomAdjective() + " " + name;
            }

            if (property) { 
                name = name + " " + this.randomProperty();
            }

            equipment.name = name;
        }

        private string randomArmorName() {
           return Utils.uniformFromArray(StoreConfig.ARMOR_NAMES);
        }

        private string randomWeaponName() {
           return Utils.uniformFromArray(StoreConfig.WEAPON_NAMES);
        }

        private string randomTrinketName() {
           return Utils.uniformFromArray(StoreConfig.TRINKET_NAMES);
        }

        private string randomAdjective() {
            return Utils.uniformFromArray(StoreConfig.EQUIPMENT_ADJECTIVES);
        }

        private string randomProperty() {
            return Utils.uniformFromArray(StoreConfig.EQUIPMENT_PROPERTIES);
        }

    }
}