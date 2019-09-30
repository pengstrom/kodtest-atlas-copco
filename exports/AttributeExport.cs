namespace hiddenGems {
    public class AttributeExport {
        public int id { get; }
        public string name { get; }

        public AttributeExport(Attribute attribute) {
            this.id = attribute.id;
            this.name = attribute.name;
        }
    }
}