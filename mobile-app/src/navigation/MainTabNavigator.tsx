import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import type { MainTabParamList } from '../types';
import { colors } from '../styles/colors';
import { fontFamilies, fontSizes } from '../styles/typography';
import { CameraScanScreen } from '../screens/scan/CameraScanScreen';
import { FavoriteRecipesScreen } from '../screens/main/FavoriteRecipesScreen';
import { CookingHistoryScreen } from '../screens/main/CookingHistoryScreen';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconMap: Record<keyof MainTabParamList, string> = {
  Home: '🏠',
  CameraScan: '📷',
  Favorites: '❤️',
  History: '🕘',
  Profile: '👤',
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamilies.bold,
          fontSize: fontSizes.xs,
        },
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 16, color }}>{iconMap[route.name]}</Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="CameraScan" component={CameraScanScreen} options={{ title: 'Scan' }} />
      <Tab.Screen name="Favorites" component={FavoriteRecipesScreen} options={{ title: 'Favorites' }} />
      <Tab.Screen name="History" component={CookingHistoryScreen} options={{ title: 'History' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
