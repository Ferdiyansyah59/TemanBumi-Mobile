import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MainStackScreen from './screenNavigation/stack/index';
import AppLoading from 'expo-app-loading';
import { useContext, useEffect, useState } from 'react';
import AuthContextProvider, { AuthContext } from './config/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './screenNavigation/stack/auth';

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthNavigator />}
      {authCtx.isAuthenticated && <MainStackScreen />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  // if (isTryingLogin) {
  //   return <AppLoading />;
  // }

  return <Navigation />;
}

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
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
