// App.js
// Her sætter vi navigationen op og pakker hele appen ind i vores WatchlistProvider,
// så alle screens har adgang til listerne.
import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import { WatchlistProvider } from "./context/WatchlistContext";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ListScreen from "./screens/ListScreen";
import DetailScreen from "./screens/DetailScreen";
import { colors } from "./styles/GlobalStyle";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// De to faner i bunden: Forside og Søg
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: "#fff",
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="Forside"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>{"🏠"}</Text> }}
      />
      <Tab.Screen
        name="Søg"
        component={SearchScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>{"🔍"}</Text> }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <WatchlistProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Liste" component={ListScreen} options={({ route }) => ({ title: route.params.name })} />
          <Stack.Screen name="Detaljer" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WatchlistProvider>
  );
}
