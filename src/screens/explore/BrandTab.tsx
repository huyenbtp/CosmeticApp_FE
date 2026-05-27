import { View, Text, SectionList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { IBrand } from "../../types/brand";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useBrands } from "../../services/brand.service";
import { useEffect, useState } from "react";

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
  {
    _id: "64f1a2b3c9e123110",
    name: "Rohto",
    logo: "https://picsum.photos/200/200?random=1",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123310",
    name: "Cléo",
    logo: "https://picsum.photos/200/200?random=2",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123114",
    name: "Mizumi",
    logo: "https://picsum.photos/200/200?random=3",
    status: "active",
  },
  {
    _id: "64f1a2b3c9e123114",
    name: "Senka",
    logo: "https://picsum.photos/200/200?random=4",
    status: "active",
  },
  {
    _id: "64f1a2b3che123114",
    name: "Maybelline",
    logo: "https://picsum.photos/200/200?random=5",
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
  const { data, isLoading } = useBrands();
  const [sections, setSections] = useState<any>();
  const navigation = useAppNavigation();

  useEffect(() => {
    if (!data) return;
    const filterData = data.filter((item: any) => item.status === "active")
    setSections(groupByAlphabet(filterData));

  }, [data]);

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
  if (sections) return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}

      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => { navigation.navigate("BrandProducts", { brand_id: item._id, brand_name: item.name }) }}
        >
          <Text style={styles.name}>{item.name}</Text>
          {item.logo &&
            <Image source={{ uri: item.logo }} style={styles.logo} />
          }
        </TouchableOpacity>
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