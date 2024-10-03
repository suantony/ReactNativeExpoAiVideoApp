import {Stack} from 'expo-router';
import {GlobalProvider} from '../context/GlobalProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const RootLayout = () => {
  return (
    <GlobalProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="(auth)" options={{headerShown: false}} />
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="search/[query]" options={{headerShown: false}} />
        </Stack>
      </GestureHandlerRootView>
    </GlobalProvider>
  );
};

export default RootLayout;
