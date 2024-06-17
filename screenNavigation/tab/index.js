import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import ScreenDimensions from '../../src/static/dimensions';
import Colors from '../../src/static/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../../src/screens/app/home';
import More from '../../src/screens/app/more/more';
import ArticleScreen from '../../src/screens/app/articles';
const Tab = createBottomTabNavigator();

const WIDTH = ScreenDimensions.width;

const MainTabNavigation = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? (iconName = (
                    <Icon
                      name='home-sharp'
                      size={size}
                      color={color}
                    />
                  ))
                : (iconName = (
                    <Icon
                      name='home-outline'
                      size={size}
                      color={color}
                    />
                  ));
            } else if (route.name === 'ArticleScreen') {
              iconName = focused
                ? (iconName = (
                    <Icon
                      name='newspaper-sharp'
                      size={size}
                      color={color}
                    />
                  ))
                : (iconName = (
                    <Icon
                      name='newspaper-outline'
                      size={size}
                      color={color}
                    />
                  ));
            } else if (route.name === 'More') {
              iconName = (
                <Feather
                  name='more-horizontal'
                  size={size}
                  color={color}
                />
              );
            }

            // You can return any component that you like here!
            return iconName;
          },

          tabBarActiveTintColor: Colors.white,
          tabBarInactiveTintColor: '#E9E9E9B6',
          tabBarStyle: {
            backgroundColor: Colors.primary,
            padding: 10,
            height: 70,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontFamily: 'PoppinsMedium',
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: 'Beranda',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='ArticleScreen'
          component={ArticleScreen}
          options={{
            tabBarLabel: 'Artikel',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='More'
          component={More}
          options={{
            tabBarLabel: 'Menu Lainnya',
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainTabNavigation;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    bottom: WIDTH < 400 ? 35 : 40,
    height: WIDTH < 400 ? 58 : 70,
    width: WIDTH < 400 ? 58 : 70,
  },
  scanMenu: {
    backgroundColor: '#FF9430',
    borderRadius: 100,
    padding: 4,
    height: WIDTH < 400 ? 50 : 62,
    width: WIDTH < 400 ? 50 : 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
