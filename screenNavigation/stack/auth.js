import { Button } from 'react-native';
import Index from '../../src/screens';
import Login from '../../src/screens/auth/login';
import { NavAnimation, NavAnimationSlideRight } from '../animation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomBackButton from '../../src/components/stack/CustomBackButton';
import CustomLoginButton from '../../src/components/stack/CustomLoginButton';
import Register from '../../src/screens/auth/register';
import CustomRegisterButton from '../../src/components/stack/CustomRegisterButton';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Index'>
      <Stack.Screen
        name='Index'
        component={Index}
        options={{
          headerShown: false,
          transitionSpec: {
            open: NavAnimation,
            close: NavAnimation,
          },
        }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShadowVisible: false,
          headerTransparent: true,
          title: '',
          transitionSpec: {
            open: NavAnimation,
            close: NavAnimation,
          },

          headerLeft: () => {
            return <CustomBackButton />;
          },
          headerRight: () => {
            return <CustomLoginButton />;
          },
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShadowVisible: false,
          headerTransparent: true,
          title: '',
          // animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          headerLeft: () => {
            return <CustomBackButton />;
          },
          headerRight: () => {
            return <CustomRegisterButton />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
