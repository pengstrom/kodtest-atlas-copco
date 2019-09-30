using System;
using System.Linq;
using System.Collections.Generic;
using MathNet.Numerics.Distributions;

namespace hiddenGems {
    public sealed class Store {
        public Dictionary<int, Attribute> attributes;
        public readonly string[] attributeNames = {"Hit Points", "Luck"};
        public Character character;
        public static Store Instance {
            get {
                lock(padlock) {
                    if (instance == null) {
                        instance = new Store();
                    }
                    return instance;
                }
            }
        }

        private static Store instance = null;
        private Inventory inventory;
        private static readonly object padlock = new Object();

        public Store() {
            this.addAttributes();

            this.inventory = new Inventory(this.attributes);

            this.generateCharacter();
        }

        public IEnumerable<Equipment> getInventory() {
            return this.inventory.inventory();
        }

        public IEnumerable<Equipment> getCharacterInventory() {
            return from eq in this.character.equipment select eq.Value;
        }

        public Equipment purchaseEquipment(int charachterId, int equipmentId) {
            Character character = this.getCharacterById(charachterId);
            Equipment equipment = this.inventory.getEquipmentById(equipmentId);
            int cost = equipment.price;

            if (cost > character.gold) {
                throw new InsufficientFundsError();
            }

            character.gold -= cost;
            this.inventory.removeEquipmentById(equipmentId);
            character.addEquipment(equipment);
            return equipment;
        }

        public Character getCharacterById(int charachterId)
        {
            // Future work: add support for multiple users
            return this.character;
        }

        public void generateEquipmentAndRestock() {
            this.inventory.generateEquipment(StoreConfig.NEW_EQUIPMENT_COUNT_LAMBDA);
        }

        private void addAttributes() {
            this.attributes = new Dictionary<int, Attribute>();
            for (int i = 0; i < this.attributeNames.Length; i++)
            {
                string name = this.attributeNames[i];
                this.attributes.Add(i, new Attribute(i, name));
            }
        }

        private void generateCharacter() {
            string name = Utils.uniformFromArray(StoreConfig.CHARACTER_NAMES);
            int gold = (int) Math.Round(Normal.Sample(StoreConfig.MEAN_GOLD, StoreConfig.STDDEV_GOLD));

            this.character = new Character(1, name, gold);
        }
    }

    public class StoreError : Exception {
        public StoreError(string message) : base(message) {}
    }

    public class InsufficientFundsError : StoreError {
        public InsufficientFundsError() : base("Insufficient funds") {}
    }
}