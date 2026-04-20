import { View, Text, SectionList, StyleSheet, Image } from "react-native";
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
function groupByAlphabet(data: IBrand[]) {
  const grouped: { [key: string]: IBrand[] } = {};

  data.forEach((item) => {
    const letter = item.name[0].toUpperCase();

    if (!grouped[letter]) {
      grouped[letter] = [];
    }

    grouped[letter].push(item);
  });

  return Object.keys(grouped)
    .sort()
    .map((key) => ({
      title: key,
      data: grouped[key].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }));
}

export default function BrandScreen() {
  const sections = groupByAlphabet(mockBrands);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}

      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Image source={{ uri: item.logo }} style={styles.logo} />
        </View>
      )}

      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderColor: Colors.border
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
  },
});