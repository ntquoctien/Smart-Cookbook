import React, { useState } from 'react';
import '../styles/fonts.css';
import { ScreenName } from './components/shared/data';
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CameraScanScreen } from './components/screens/CameraScanScreen';
import { ImagePreviewScreen } from './components/screens/ImagePreviewScreen';
import { AIScanningScreen } from './components/screens/AIScanningScreen';
import { IngredientConfirmScreen } from './components/screens/IngredientConfirmScreen';
import { PreferenceScreen } from './components/screens/PreferenceScreen';
import { RecipeRecommendScreen } from './components/screens/RecipeRecommendScreen';
import { RecipeDetailScreen } from './components/screens/RecipeDetailScreen';
import { CookingAssistantScreen } from './components/screens/CookingAssistantScreen';
import { CookingCompletedScreen } from './components/screens/CookingCompletedScreen';
import { FavoriteRecipesScreen } from './components/screens/FavoriteRecipesScreen';
import { CookingHistoryScreen } from './components/screens/CookingHistoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

// Screen labels for the navigator UI
const SCREEN_LABELS: Partial<Record<ScreenName, string>> = {
  splash: 'Splash',
  onboarding: 'Onboarding',
  login: 'Login',
  register: 'Register',
  home: 'Home',
  camera: 'Camera',
  imagePreview: 'Preview',
  aiScanning: 'AI Scan',
  ingredientConfirm: 'Ingredients',
  preferences: 'Preferences',
  recipeRecommend: 'Recipes',
  recipeDetail: 'Detail',
  cookingAssistant: 'Cooking',
  cookingCompleted: 'Done!',
  favorites: 'Favorites',
  history: 'History',
  profile: 'Profile',
};

const ALL_SCREENS: ScreenName[] = [
  'splash', 'onboarding', 'login', 'register', 'home',
  'camera', 'imagePreview', 'aiScanning', 'ingredientConfirm',
  'preferences', 'recipeRecommend', 'recipeDetail',
  'cookingAssistant', 'cookingCompleted', 'favorites', 'history', 'profile',
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [history, setHistory] = useState<ScreenName[]>([]);
  const [navOpen, setNavOpen] = useState(false);

  const navigate = (screen: ScreenName) => {
    setHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
    setNavOpen(false);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setCurrentScreen(prev);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onDone={() => navigate('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen navigate={navigate} />;
      case 'login':
        return <LoginScreen navigate={navigate} />;
      case 'register':
        return <RegisterScreen navigate={navigate} goBack={goBack} />;
      case 'home':
        return <HomeScreen navigate={navigate} />;
      case 'camera':
        return <CameraScanScreen navigate={navigate} goBack={goBack} />;
      case 'imagePreview':
        return <ImagePreviewScreen navigate={navigate} goBack={goBack} />;
      case 'aiScanning':
        return <AIScanningScreen navigate={navigate} />;
      case 'ingredientConfirm':
        return <IngredientConfirmScreen navigate={navigate} goBack={goBack} />;
      case 'preferences':
        return <PreferenceScreen navigate={navigate} goBack={goBack} />;
      case 'recipeRecommend':
        return <RecipeRecommendScreen navigate={navigate} goBack={goBack} />;
      case 'recipeDetail':
        return <RecipeDetailScreen navigate={navigate} goBack={goBack} />;
      case 'cookingAssistant':
        return <CookingAssistantScreen navigate={navigate} goBack={goBack} />;
      case 'cookingCompleted':
        return <CookingCompletedScreen navigate={navigate} />;
      case 'favorites':
        return <FavoriteRecipesScreen navigate={navigate} />;
      case 'history':
        return <CookingHistoryScreen navigate={navigate} />;
      case 'profile':
        return <ProfileScreen navigate={navigate} />;
      default:
        return <SplashScreen onDone={() => navigate('onboarding')} />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nunito Sans, sans-serif',
        padding: '20px 0',
        overflowY: 'auto',
      }}
    >
      {/* App title */}
      <div style={{
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #FF7A45, #E05A25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>
          🍳
        </div>
        <span style={{
          fontFamily: 'Nunito Sans',
          fontSize: 18,
          fontWeight: 900,
          color: '#fff',
          letterSpacing: -0.5,
        }}>
          Smart Cookbook AI
        </span>
      </div>

      {/* Phone frame */}
      <div style={{
        width: 390,
        height: 844,
        borderRadius: 55,
        background: '#1a1a1a',
        padding: '12px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Inner screen */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: 46,
          overflow: 'hidden',
          background: '#FFF8F0',
          position: 'relative',
        }}>
          {/* Notch */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 34,
            background: '#1a1a1a',
            borderRadius: '0 0 20px 20px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: '#333' }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: '#222', border: '1px solid #444' }} />
          </div>

          {/* Status bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 44,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '0 28px 6px',
            zIndex: 999,
            pointerEvents: 'none',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: currentScreen === 'camera' || currentScreen === 'splash' ? '#fff' : '#1F2933', fontFamily: 'Nunito Sans' }}>
              9:41
            </span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: currentScreen === 'camera' || currentScreen === 'splash' ? '#fff' : '#1F2933' }}>●●●</span>
              <span style={{ fontSize: 10, color: currentScreen === 'camera' || currentScreen === 'splash' ? '#fff' : '#1F2933' }}>WiFi</span>
              <span style={{ fontSize: 10, color: currentScreen === 'camera' || currentScreen === 'splash' ? '#fff' : '#1F2933' }}>🔋</span>
            </div>
          </div>

          {/* Screen content */}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {renderScreen()}
          </div>
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 130,
          height: 5,
          borderRadius: 2.5,
          background: 'rgba(255,255,255,0.3)',
        }} />
      </div>

      {/* Screen navigator */}
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <button
          onClick={() => setNavOpen(!navOpen)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 20,
            padding: '8px 20px',
            color: '#fff',
            fontFamily: 'Nunito Sans',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>📱</span>
          Navigate Screens ({SCREEN_LABELS[currentScreen]})
          <span style={{ transform: navOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {navOpen && (
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 20,
            padding: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            maxWidth: 460,
            justifyContent: 'center',
          }}>
            {ALL_SCREENS.map(screen => (
              <button
                key={screen}
                onClick={() => {
                  setHistory([]);
                  setCurrentScreen(screen);
                  setNavOpen(false);
                }}
                style={{
                  background: currentScreen === screen ? '#FF7A45' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${currentScreen === screen ? '#FF7A45' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: 12,
                  padding: '7px 14px',
                  color: '#fff',
                  fontFamily: 'Nunito Sans',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {SCREEN_LABELS[screen]}
              </button>
            ))}
          </div>
        )}

        {/* Flow hint */}
        <div style={{
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'Nunito Sans',
          fontSize: 11,
          textAlign: 'center',
          maxWidth: 400,
          lineHeight: 1.5,
        }}>
          Main flow: Splash → Onboarding → Login → Home → Camera → Preview → AI Scan → Ingredients → Preferences → Recipes → Detail → Cooking → Done
        </div>
      </div>
    </div>
  );
}
