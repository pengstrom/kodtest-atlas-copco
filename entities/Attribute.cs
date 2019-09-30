using System;

namespace hiddenGems {
    public class Attribute {
        public int id { get; }
        public string name { get; set; }

        public Attribute(int id, string name) {
            this.id = id;
            this.name = name;
        }
    }
}