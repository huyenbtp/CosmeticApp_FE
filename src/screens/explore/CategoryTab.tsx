import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ICategory, ICategoryUI } from "../../types/category";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";

const mockCategories: ICategory[] = [
  {
    _id: "1",
    parent_id: null,
    name: "Skincare",
    slug: "skincare",
  },
  {
    _id: "2",
    parent_id: "1",
    name: "Cleanser",
    slug: "cleanser",
  },
  {
    _id: "3",
    parent_id: "1",
    name: "Toner",
    slug: "toner",
  },
  {
    _id: "4",
    parent_id: "2",
    name: "Makeup Remover",
    slug: "makeup-remover",
  },
  {
    _id: "6",
    parent_id: "2",
    name: "Exfoliators/Scrub",
    slug: "exfoliators-scrub",
  },
  {
    _id: "7",
    parent_id: "1",
    name: "Suncare",
    slug: "suncare",
  },
  {
    _id: "8",
    parent_id: null,
    name: "Makeup",
    slug: "makeup",
  },
  {
    _id: "9",
    parent_id: "8",
    name: "Face",
    slug: "face",
  },
  {
    _id: "10",
    parent_id: "9",
    name: "Cushion",
    slug: "cushion",
  },
  {
    _id: "11",
    parent_id: "9",
    name: "Blush",
    slug: "blush",
  },
  {
    _id: "12",
    parent_id: "8",
    name: "Eyes",
    slug: "eyes",
  },
  {
    _id: "13",
    parent_id: "8",
    name: "Lips",
    slug: "lips",
  },
  {
    _id: "14",
    parent_id: null,
    name: "Chăm sóc cơ thể",
    slug: "personal-care",
  },
  {
    _id: "15",
    parent_id: "14",
    name: "Body Care",
    slug: "body-care",
  },
  {
    _id: "16",
    parent_id: "14",
    name: "Hands Care",
    slug: "hands-care",
  },
  {
    _id: "17",
    parent_id: "14",
    name: "Oral",
    slug: "oral",
  },
  {
    _id: "18",
    parent_id: "14",
    name: "Fragnance",
    slug: "fragnance",
  },
];

function buildTree(data: ICategory[]) {
  const map: any = {};
  const roots: any[] = [];

  // tạo map
  data.forEach((item) => {
    map[item._id] = { ...item, children: [] };
  });

  // build tree
  data.forEach((item) => {
    if (!item.parent_id) {
      roots.push(map[item._id]);
    } else {
      map[item.parent_id]?.children.push(map[item._id]);
    }
  });

  return roots;
}
function transformToUI(data: ICategory[]): ICategoryUI[] {
  const tree = buildTree(data);

  return tree.map((root) => ({
    _id: root._id,
    name: root.name,
    sections: root.children.map((parent: any) => ({
      _id: parent._id,
      title: parent.name,
      items: parent.children,
    })),
  }));
}

export default function CategoryScreen() {
  const navigation = useAppNavigation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState<ICategoryUI[]>([]);

  const selectedCategory = categories[selectedIndex];

  useEffect(() => {
    const uiData = transformToUI(mockCategories);
    setCategories(uiData);
  }, []);

  return (
    <View style={styles.container}>
      {/* LEFT MENU */}
      <View style={styles.left}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={cat._id}
            style={[
              styles.leftItem,
              selectedIndex === index && styles.activeLeftItem,
            ]}
            onPress={() => setSelectedIndex(index)}
          >
            <Feather
              name="shopping-bag" size={30}
              color={selectedIndex === index ? Colors.primary : Colors.textLight}
            />
            <Text
              style={{
                fontWeight: "700",
                fontSize: 10,
                textAlign: "center",
                color: selectedIndex === index ? Colors.primary : Colors.textLight
              }}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RIGHT CONTENT */}
      {!selectedCategory ? (
        <View>
          <Text>Select a category</Text>
        </View>
      ) : (
        <FlatList
          style={styles.right}
          data={selectedCategory.sections}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.section}>
              {/* HEADER */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{item.title}</Text>

                <TouchableOpacity
                  style={styles.viewAllButton}
                  onPress={() => navigation.navigate("CategoryProducts", { category_id: item._id })}
                >
                  <Text style={styles.viewAllText}>View all</Text>
                  <Ionicons name="chevron-forward" size={15} color={Colors.textLight} />
                </TouchableOpacity>
              </View>

              {/* GRID */}
              <View style={styles.grid}>
                {item.items.map((sub, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.item}
                    onPress={() => navigation.navigate("CategoryProducts", { category_id: sub._id })}
                  >
                    <Text style={styles.itemText}>{sub.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  // LEFT
  left: {
    width: 120,
    backgroundColor: Colors.bgSecondary,
    borderColor: Colors.divider,
    borderRightWidth: 1,
  },

  leftItem: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 14,
    gap: 10
  },

  activeLeftItem: {
    backgroundColor: Colors.card,
  },

  // RIGHT
  right: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  section: {
    padding: 16,
    paddingBottom: 36,
    borderColor: Colors.divider,
    borderBottomWidth: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  sectionTitle: {
    fontWeight: "600",
    fontSize: 12,
  },

  viewAllButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontWeight: "600",
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  item: {
    width: "30%",
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.bgMuted,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    fontSize: 11,
    textAlign: "center",
  },
});