import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {StatusBar} from "expo-status-bar";
import {ClerkLoaded, ClerkProvider} from "@clerk/clerk-expo";
import {tokenCache} from "@/lib/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
    throw new Error('Missing Publishable Key');
}

function RootLayout() {
  const [loaded] = useFonts({
      'Jakarta-ExtraLight': require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
      'Jakarta-Light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
      'Jakarta-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
      'Jakarta-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
      'Jakarta-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
      'Jakarta-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
      'Jakarta-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ClerkProvider publishableKey={publishableKey as string} tokenCache={tokenCache}>
          <ClerkLoaded>
              <Stack>
                  <Stack.Screen name='index' options={{headerShown: false}}/>
                  <Stack.Screen name='(auth)' options={{headerShown: false}}/>
                  <Stack.Screen name='(root)' options={{headerShown: false}}/>
                  <Stack.Screen name='+not-found'/>
              </Stack>
              <StatusBar style={'dark'}/>
          </ClerkLoaded>
      </ClerkProvider>
  );
}

export default RootLayout;
