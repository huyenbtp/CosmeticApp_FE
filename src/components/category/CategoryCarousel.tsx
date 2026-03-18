import { View, Text, FlatList, StyleSheet, TouchableOpacity, } from "react-native";
import { ICategory } from "../../types/category";
import { Colors } from "../../theme/colors";

const mockCategories: ICategory[] = [
  {
    _id: "1",
    parent_id: null,
    name: "Skincare",
    slug: "skincare",
  },
  {
    _id: "2",
    parent_id: null,
    name: "Makeup",
    slug: "makeup",
  },
  {
    _id: "3",
    parent_id: null,
    name: "Personal Care",
    slug: "personal-care",
  },
  {
    _id: "4",
    parent_id: null,
    name: "Hair Care",
    slug: "hair-care",
  },
];

export default function CategoryCarousel() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={mockCategories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (          
          <TouchableOpacity style={styles.item}>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 50,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
  },
});