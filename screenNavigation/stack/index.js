import { NavAnimation } from '../animation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../src/screens/app/home';

const Stack = createNativeStackNavigator();

const MainStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          transitionSpec: {
            open: NavAnimation,
            close: NavAnimation,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackScreen;
