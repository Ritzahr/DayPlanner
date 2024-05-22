import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Screens/Home'
import RoutePlanner from './Screens/RoutePlanner'
import Profile from './Screens/Profile'
import { Ionicons } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
        tabBarActiveTintColor: "dimgray",
        tabBarInactiveTintColor: "lightgray",
        })}
      >
        <Tab.Screen 
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={size} />
            ),
          }}/>
        <Tab.Screen 
          name="Route Planner" 
          component={RoutePlanner} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={size} />
            ),
          }}/>
        <Tab.Screen
						name="Profile"
						component={Profile}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="person" color={color} size={size} />
							),
						}}
					/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;