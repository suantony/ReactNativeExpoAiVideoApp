/* eslint-disable react-hooks/exhaustive-deps */
import {SplashScreen, useRouter} from 'expo-router';
import {useGlobalContext} from '../context/GlobalProvider';
import {useEffect, useRef} from 'react';
import {useFonts} from 'expo-font';
import {Animated} from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });
  const {isLoggedIn} = useGlobalContext();

  useEffect(() => {
    if (error) throw error;

    if (isLoggedIn === null || !fontsLoaded) return;

    if (isLoggedIn) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      SplashScreen.hideAsync();
    });
  }, [isLoggedIn, fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
}
