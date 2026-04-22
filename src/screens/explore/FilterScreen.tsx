import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RangeSlider from "rn-range-slider";
import { useState } from "react";
import { Colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export interface IFilter {
  minPrice: number;
  maxPrice: number;
  skinTypes: ISkinType[];
  tags: ITag[];
}

export const NullFilter: IFilter = {
  minPrice: 0,
  maxPrice: 0,
  skinTypes: [],
  tags: [],
};

interface ISkinType {
  _id: string;
  name: string;
}
interface ITag {
  _id: string;
  name: string;
}

const mockSkinTypes: ISkinType[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "Dry skin",
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "Oily skin",
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "Normal skin",
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "Acne skin",
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "Combination skin",
  },
  {
    _id: "64f1a2b3c9e123006",
    name: "Sensitive skin",
  },
];

const mockTags: ITag[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "hydrating",
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "acne-care",
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "for-beginners",
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "fragrance-free,",
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "pregnancy",
  },
];

const Thumb = () => <View style={styles.thumb} />;
const Rail = () => <View style={styles.rail} />;
const RailSelected = () => <View style={styles.railSelected} />;

export default function FilterScreen({ navigation, route }: any) {
  const { currentFilter, handleApply } = route.params;

  const [min, setMin] = useState(currentFilter.minPrice ?? 0);
  const [max, setMax] = useState(currentFilter.maxPrice ?? 0);

  const [skinTypes, setSkinTypes] = useState<ISkinType[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
      </View>

      {/** price range */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Price Range
        </Text>

        <RangeSlider
          min={0}
          max={2000000}
          step={50000}
          low={Math.min(min, max)}
          high={Math.max(min, max)}
          renderThumb={Thumb}
          renderRail={Rail}
          renderRailSelected={RailSelected}
          onValueChanged={(l, h) => {
            setMin(l);
            setMax(h);
          }}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 12 }}>
            {min.toLocaleString()}₫
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 12 }}>
            {max.toLocaleString()}₫
          </Text>
        </View>
      </View>

      {/** skin type */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Skin Type
        </Text>

        <View style={styles.itemContainer}>
          {mockSkinTypes.map(item => (
            <TouchableOpacity
              key={item._id}
              style={[styles.item, skinTypes.includes(item) && styles.selectedItem]}
              onPress={() => {
                if (skinTypes.includes(item)) setSkinTypes(skinTypes.filter(item => item._id !== item._id));
                else setSkinTypes((prev) => [...prev, item])
              }}
            >
              <Text style={[styles.itemText, skinTypes.includes(item) && styles.selectedItemText]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/** tag */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Tag
        </Text>

        <View style={styles.itemContainer}>
          {mockTags.map(item => (
            <TouchableOpacity
              key={item._id}
              style={[styles.item, tags.includes(item) && styles.selectedItem]}
              onPress={() => {
                if (tags.includes(item)) setTags(tags.filter(item => item._id !== item._id));
                else setTags((prev) => [...prev, item])
              }}
            >
              <Text style={[styles.itemText, tags.includes(item) && styles.selectedItemText]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.button, { borderColor: Colors.primary, borderWidth: 1, }]}
          onPress={() => {
            handleApply(NullFilter);
            navigation.goBack();
          }}
        >
          <Text style={[styles.buttonText, { color: Colors.primary }]}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.primary, }]}
          onPress={() => {
            handleApply({
              minPrice: min,
              maxPrice: max,
              skinTypes,
              tags
            })
            navigation.goBack()
          }}
        >
          <Text style={styles.buttonText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    gap: 12,
  },
  title: {
    fontWeight: 700,
  },

  section: {
    backgroundColor: Colors.background,
    padding: 16,
    gap: 20,
    borderColor: Colors.border,
    borderTopWidth: 1
  },
  sectionTitle: {
    fontWeight: 600,
  },

  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.bgInput,
    borderRadius: 10,
  },
  itemText: {
    color: Colors.textLight,
    fontWeight: 500,
    fontSize: 12,
  },
  selectedItem: {
    backgroundColor: "#e9f0ce",
    opacity: 50
  },
  selectedItemText: {
    color: "#5c6142",
  },

  rail: {
    flex: 1,
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },
  railSelected: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    elevation: 3,
  },

  footerContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    paddingTop: 14,
    paddingBottom: 70,
    paddingHorizontal: 20,
    gap: 16,
    backgroundColor: Colors.background,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});