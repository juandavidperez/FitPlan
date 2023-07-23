import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

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
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(1) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(1)}
        >
          <Text style={styles.gridItemText}>Item 1</Text>
          <Image
  
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(2) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(2)}
        >
          <Text style={styles.gridItemText}>Item 2</Text>
          <Image
            
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(3) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(3)}
        >
          <Text style={styles.gridItemText}>Item 3</Text>
          <Image
            
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(4) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(4)}
        >
          <Text style={styles.gridItemText}>Item 4</Text>
          <Image
            
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(5) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(5)}
        >
          <Text style={styles.gridItemText}>Item 5</Text>
          <Image
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(6) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(6)}
        >
          <Text style={styles.gridItemText}>Item 6</Text>
          <Image
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(7) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(7)}
        >
          <Text style={styles.gridItemText}>Item 7</Text>
          <Image
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(8) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(8)}
        >
          <Text style={styles.gridItemText}>Item 8</Text>
          <Image
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.gridItem,
            selectedItems.includes(9) && styles.selectedGridItem,
          ]}
          onPress={() => handleItemPress(9)}
        >
          <Text style={styles.gridItemText}>Item 9</Text>
          <Image
            style={styles.gridItemImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    width: 56,
    height: 60,
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