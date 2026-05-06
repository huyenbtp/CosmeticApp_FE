import { View, Text, StyleSheet, } from "react-native";
import { Colors } from "../../theme/colors";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";

export default function ProductDescriptionScreen({ navigation, route }: any) {
  const { data } = route.params;

  useEffect(() => {

  }, []);

  return (
    <View style={styles.container}>
      <Header title="Description" />

      <View style={styles.section}>
        <Text style={styles.text300}>{data.description}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.text400}>SKU</Text>
          <Text style={styles.text500}>{data.sku}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text400}>Brand</Text>
          <Text style={styles.text500}>{data.brand.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text400}>Category</Text>
          <Text style={styles.text500}>{data.category.name}</Text>
        </View>
        {data.skinTypes.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.text400}>Skin Type</Text>
            <View style={styles.itemContainer}>
              {data.skinTypes.map((item: any) => (
                <View style={styles.item} key={item._id}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {data.tags.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.text400}>Tag</Text>
            <View style={styles.itemContainer}>
              {data.tags.map((item: any) => (
                <View style={styles.item} key={item._id}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },
  section: {
    backgroundColor: Colors.card,
    padding: 18,
    marginBottom: 12,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30
  },

  itemContainer: {
    width: "60%",
    flexDirection: "row-reverse",
    gap: 2,
    flexWrap: "wrap"
  },
  item: {
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 12,

  },

  text300: {
    fontWeight: 300,
    fontSize: 15,
    lineHeight: 24,
  },
  text400: {
    fontWeight: 400,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  text500: {
    fontWeight: 500,
  },

});