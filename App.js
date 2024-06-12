import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MainStackScreen from './screenNavigation/stack/index';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jakarta-Regular': require('./assets/font/jakarta/static/PlusJakartaSans-Regular.ttf'),
    'Jakarta-Medium': require('./assets/font/jakarta/static/PlusJakartaSans-Medium.ttf'),
    'Jakarta-SemiBold': require('./assets/font/jakarta/static/PlusJakartaSans-SemiBold.ttf'),
    'Jakarta-Bold': require('./assets/font/jakarta/static/PlusJakartaSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>
    </>
  );
}
