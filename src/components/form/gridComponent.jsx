import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const GridComponent = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemPress = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<---'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Título</Text>

      <View style={styles.gridContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.gridItem,
              selectedItems.includes(item) && styles.selectedGridItem,
            ]}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.gridItemText}>Item {item}</Text>
            <Image
               // Replace with the correct path to your image
              style={styles.gridItemImage}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#2e5bff',
    borderRadius: 5,
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: itemWidth,
    height: itemWidth + 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  selectedGridItem: {
    backgroundColor: '#2e5bff',
    borderColor: '#2e5bff',
  },
  gridItemText: {
    fontSize: 16,
    marginBottom: -10,
  },
  gridItemImage: {
    width: 50,
    height: 50,
  },
});

export default GridComponent;
