// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductManagementScreen from './screens/ProductManagementScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Product Management" component={ProductManagementScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
