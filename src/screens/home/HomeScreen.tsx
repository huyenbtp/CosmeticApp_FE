import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";
import BrandCarousel from "../../components/brand/BrandCarousel";
import CategoryCarousel from "../../components/category/CategoryCarousel";
import { IProduct } from "../../types/product";
import ProductCarousel from "../../components/product/ProductCarousel";

const mockRecommendProducts: IProduct[] = [
  {
    _id: "1",
    name: "Son Dior Addict Lip Glow",
    selling_price: 850000,
    image: "https://picsum.photos/200/300?random=1",
  },
  {
    _id: "2",
    name: "Kem nền Estee Lauder Double Wear",
    selling_price: 1200000,
    image: "https://picsum.photos/200/300?random=2",
  },
  {
    _id: "3",
    name: "Son Dior Addict Lip Glow",
    selling_price: 850000,
    image: "https://picsum.photos/200/300?random=3",
  },
  {
    _id: "4",
    name: "Kem nền Estee Lauder Double Wear",
    selling_price: 1200000,
    image: "https://picsum.photos/200/300?random=4",
  },
  {
    _id: "5",
    name: "Son Dior Addict Lip Glow",
    selling_price: 850000,
    image: "https://picsum.photos/200/300?random=5",
  },
  {
    _id: "6",
    name: "Kem nền Estee Lauder Double Wear",
    selling_price: 1200000,
    image: "https://picsum.photos/200/300?random=6",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome,</Text>
      <Text style={styles.name}>Nina</Text>

      <TouchableOpacity style={styles.searchBar}>
        <Feather name="search" size={20} />
        <Text style={styles.placeholder}>Search...</Text>
      </TouchableOpacity>

      <BrandCarousel />

      <CategoryCarousel />

      <View style={styles.section}>
        <Text style={styles.title}>For you</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ProductCarousel data={mockRecommendProducts}/>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 70,
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 25,
    fontWeight: 700
  },
  name: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.textLight,
  },

  searchBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
    gap: 14,
    backgroundColor: Colors.input,
    borderRadius: 30,
  },
  placeholder: {
    color: Colors.placeholder
  },

  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.textLight
  },
});