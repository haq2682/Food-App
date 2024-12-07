import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen, Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CartProvider from '@/store/CartProvider';
import AuthProvider from '@/store/AuthProvider';
import QueryProvider from '@/store/QueryProvider';
import NotificationProvider from '@/store/NotificationProvider';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryProvider>
          <NotificationProvider>
            <CartProvider>
              <Slot />
            </CartProvider>
          </NotificationProvider>
        </QueryProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}