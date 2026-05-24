import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../types';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { AIScanningScreen } from '../screens/scan/AIScanningScreen';
import { ImagePreviewScreen } from '../screens/scan/ImagePreviewScreen';
import { IngredientConfirmationScreen } from '../screens/scan/IngredientConfirmationScreen';
import { PreferenceSelectionScreen } from '../screens/scan/PreferenceSelectionScreen';
import { RecipeRecommendationScreen } from '../screens/recipe/RecipeRecommendationScreen';
import { RecipeDetailScreen } from '../screens/recipe/RecipeDetailScreen';
import { CookingAssistantScreen } from '../screens/cooking/CookingAssistantScreen';
import { CookingCompletedScreen } from '../screens/cooking/CookingCompletedScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthFlow" component={AuthNavigator} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
        <Stack.Screen name="AIScanning" component={AIScanningScreen} />
        <Stack.Screen name="IngredientConfirmation" component={IngredientConfirmationScreen} />
        <Stack.Screen name="PreferenceSelection" component={PreferenceSelectionScreen} />
        <Stack.Screen name="RecipeRecommendation" component={RecipeRecommendationScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="CookingAssistant" component={CookingAssistantScreen} />
        <Stack.Screen name="CookingCompleted" component={CookingCompletedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
