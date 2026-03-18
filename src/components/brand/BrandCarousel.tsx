import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { IBrand } from "../../types/brand";
import { Colors } from "../../theme/colors";

const mockBrands: IBrand[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "Centella",
    logo: "https://picsum.photos/seed/technova/200/200",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "Simple",
    logo: "https://picsum.photos/seed/urbanstyle/200/200",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "Clair",
    logo: "https://picsum.photos/seed/greenleaf/200/200",
    status: "archived",
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "Cocoon",
    logo: "https://picsum.photos/seed/blueocean/200/200",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "Gucci",
    logo: "https://picsum.photos/seed/reddragon/200/200",
    status: "archived",
  },
  {
    _id: "64f1a2b3c9e123006",
    name: "Hada Labo",
    logo: "https://picsum.photos/seed/minimalist/200/200",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123007",
    name: "Innisfree",
    logo: "https://picsum.photos/seed/retro/200/200",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123008",
    name: "Color Key",
    logo: "https://picsum.photos/seed/foodie/200/200",
    status: "archived",
  },
  {
    _id: "64f1a2b3c9e123009",
    name: "JulyDoll",
    logo: "https://picsum.photos/seed/cosmic/200/200",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123010",
    name: "3CE",
    logo: "https://picsum.photos/seed/sporty/200/200",
    status: "active",
  },
];

export default function BrandCarousel() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose Brand</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={mockBrands}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (          
          <TouchableOpacity style={styles.item}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.primary
  },
  
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  logo: {
    width: 42,
    height: 42,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
  },
});