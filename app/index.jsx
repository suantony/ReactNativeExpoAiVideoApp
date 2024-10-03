/* eslint-disable react-hooks/exhaustive-deps */
import {SplashScreen, useRouter} from 'expo-router';
import {useGlobalContext} from '../context/GlobalProvider';
import {useEffect} from 'react';
import {useFonts} from 'expo-font';
import {View} from 'react-native';
import {Image} from 'expo-image';
import {images} from '../constants';

SplashScreen.preventAutoHideAsync();

export default function App() {
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
    SplashScreen.hideAsync();
  }, [isLoggedIn, fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View className="w-full h-full bg-primary">
      <Image
        contentFit="contain"
        source={images.splashScreen}
        className="h-full w-full"
      />
    </View>
  );
}
