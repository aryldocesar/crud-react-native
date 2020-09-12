import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './screens/Index';
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }}/>
        <Stack.Screen name="Add" component={Add} options={{ headerShown: false }}/>
        <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;