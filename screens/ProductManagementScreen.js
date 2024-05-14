import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';

// Define a list of products with names, specifications, and images
const productList = [
  { 
    name: 'Product 1', 
    image: require('./product1.png'), 
    specifications: ['Height', 'Width', 'Quantity', 'Price'],
    method: 1
  },
  { 
    name: 'Product 2', 
    image: require('./product2.png'), 
    specifications: ['Quantity', 'Price'],
    method: 2
  },
  { 
    name: 'Product 4', 
    image: require('./product1.png'), 
    specifications: ['Height', 'Width', 'Quantity', 'Price'],
    method: 4
  }
];

const ProductManagementScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');

  // Function to calculate the total amount of all added products
  const calculateTotal = () => {
    let total = 0;
    products.forEach(product => {
      switch (product.method) {
        case 1:
          total += parseFloat(product.width) * parseFloat(product.height) * parseInt(product.quantity) * parseFloat(product.price);
          break;
        case 2:
          total += parseInt(product.quantity) * parseFloat(product.price);
          break;
        case 4:
          total += (parseFloat(product.width) + parseFloat(product.height)) * 2 * parseInt(product.quantity) * parseFloat(product.price);
          break;
        default:
          break;
      }
    });
    return total.toFixed(2); // Return total amount rounded to 2 decimal places
  };

  const addProduct = () => {
    const newProduct = {
      name: selectedProduct,
      quantity,
      price,
      height,
      width,
      method: productList.find(item => item.name === selectedProduct).method // Set method attribute for the new product
    };
    setProducts([...products, newProduct]);
    setSelectedProduct('');
    setQuantity('');
    setPrice('');
    setHeight('');
    setWidth('');
  };

  const renderSpecifications = () => {
    const selectedProductObj = productList.find(product => product.name === selectedProduct);
    if (!selectedProductObj) return null;

    return selectedProductObj.specifications.map((specification, index) => {
      switch (specification) {
        case 'Height':
          return (
            <TextInput
              key={index}
              placeholder="Height"
              value={height}
              onChangeText={setHeight}
            />
          );
        case 'Width':
          return (
            <TextInput
              key={index}
              placeholder="Width"
              value={width}
              onChangeText={setWidth}
            />
          );
        case 'Quantity':
          return (
            <TextInput
              key={index}
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
            />
          );
        case 'Price':
          return (
            <TextInput
              key={index}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <View>
      <Text>Add Product</Text>
      {/* Dropdown for Product Name with images */}
      <Picker
        selectedValue={selectedProduct}
        onValueChange={(itemValue) => setSelectedProduct(itemValue)}
      >
        <Picker.Item label="Select Product" value="" />
        {productList.map((product, index) => (
          <Picker.Item
            key={index}
            label={product.name}
            value={product.name}
            // You can't use images directly in Picker, so you may need to find an alternative approach
          />
        ))}
      </Picker>
      {renderSpecifications()}
      <Button title="Add Product" onPress={addProduct} />
      {products.map((product, index) => (
        <View key={index}>
          <Text>{product.name}</Text>
          {product.height && <Text>Height: {product.height}</Text>}
          {product.width && <Text>Width: {product.width}</Text>}
          <Text>Quantity: {product.quantity}</Text>
          <Text>Price: {product.price}</Text>
        </View>
      ))}
      <Text>Total Amount: ${calculateTotal()}</Text> {/* Display total amount */}
    </View>
  );
};

export default ProductManagementScreen;
