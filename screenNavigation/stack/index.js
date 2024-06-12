import { Button } from 'react-native';
import Index from '../../src/screens';
import Login from '../../src/screens/auth/login';
import NavAnimation from '../animation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomBackButton from './CustomBackButton';
import CustomLoginButton from './CustomLoginButton';

const Stack = createNativeStackNavigator();

const MainStackScreen = () => {
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
          // headerRight: () => {
          //   return (
          //     <Button
          //       title='Settings'
          //       onPress={() => {
          //         // navigate('setting');
          //       }}
          //       titleStyle={{
          //         color: 'rgba(0,122,255,1)',
          //       }}
          //       buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
          //     />
          //   );
          // },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackScreen;
