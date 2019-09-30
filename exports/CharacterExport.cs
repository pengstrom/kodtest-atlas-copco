using System;
using System.Collections.Generic;
using System.Linq;

namespace hiddenGems {

    public class CharacterExport {
        public int id { get; }
        public string name { get; }
        public int gold { get; }
        public EquipmentExport[] equipment { get; }
        public BonusExport[] attributes { get; } 
    
        public CharacterExport(Character character) {
            id = character.id;
            name = character.name;
            gold = character.gold;

            equipment = character.equipment.Select(eq => new EquipmentExport(eq.Value)).ToArray();
            attributes = character.attributes.Select(at => new BonusExport(at.Value.Item1, at.Value.Item2)).ToArray();
        }
    }
}