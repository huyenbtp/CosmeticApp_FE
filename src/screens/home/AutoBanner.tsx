import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { Colors } from "../../theme/colors";

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 28;
const HEIGHT = 220;

interface IBanner {
  _id: string;
  uri: string;
}

const banners: IBanner[] = [
  { _id: '1', uri: 'https://picsum.photos/300/300?random=1' },
  { _id: '2', uri: 'https://picsum.photos/300/300?random=2' },
  { _id: '3', uri: 'https://picsum.photos/300/300?random=3' },
];

export default function AutoBanner() {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderItem = ({ item }: { item: IBanner }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
          setActiveIndex(newIndex);
        }}
      />

      {/* Nút tròn nhỏ (Pagination dots) */}
      <View style={styles.dotContainer}>
        {banners.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: 15,
    overflow: 'hidden'
  },
  image: {
    width: BANNER_WIDTH,
    resizeMode: 'cover'
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textPlaceholder,
    margin: 4
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20
  },
});