using System;
using System.Collections.Generic;

namespace hiddenGems {
    public static class StoreConfig {
        public const double ATTRIBUTE_PROB = 0.5d;
        public const double MODIFIER_LAMBDA = 5.0d;
        public const double ADJECTIVE_PROB = 0.5d;
        public const double PROPERTY_PROB = 0.25d;

        public const double NEW_EQUIPMENT_COUNT_LAMBDA = 5;

        public const double MEAN_GOLD = 100.0d;
        public const double STDDEV_GOLD = 20.0d;
        public static string[] ARMOR_NAMES = {
            "Full-Plate Armor",
            "Shield",
            "Chail Mail",
            "Greaves",
            "Gauntlets",
        };

        public static string[] WEAPON_NAMES = {
            "Longsword",
            "Spear",
            "Cutlass",
            "Staff",
            "Longbow",
        };

        public static string[] TRINKET_NAMES = {
            "Lantern",
            "Rope",
            "Ladder",
            "Bedroll",
            "Rations",
        };

        public static string[] EQUIPMENT_PROPERTIES = {
            "of Malevolence",
            "of Power",
            "Everlasting",
        };

        public static string[] EQUIPMENT_ADJECTIVES = {
            "Greater",
            "Lesser",
            "Spirit",
            "Mythical",
        };

        public static string[] CHARACTER_NAMES = {
            "Elkas",
            "Norendithas",
            "Borj",
            "Arthur"
        };
    }
}