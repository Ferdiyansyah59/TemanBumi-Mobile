import { NavAnimation } from '../animation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../src/screens/app/home';
import ArticleScreen from '../../src/screens/app/articles';
import MainTabNavigation from '../tab';
import Classification from '../../src/screens/app/classification';
import CustomBackButton from '../../src/components/stack/CustomBackButton';
import CameraMenu from '../../src/screens/app/classification/camera';
import Colors from '../../src/static/Colors';
import TEXT from '../../src/static/Text';
import DetailCarbonUser from '../../src/screens/app/carbon/detailCarbonUser';
import InputCarbon from '../../src/screens/app/carbon/inputCarbon';
import ShowArticle from '../../src/screens/app/articles/showArticle';
import Profile from '../../src/screens/app/more/profile';
import About from '../../src/screens/app/more/about';

const Stack = createNativeStackNavigator();

const MainStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='home'
        component={MainTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Classification'
        component={Classification}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'Jakarta-SemiBold',
            fontSize: TEXT.sm,
          },
          title: 'Teman Bumi',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return <CustomBackButton />;
          },
        }}
      />
      <Stack.Screen
        name='Camera'
        component={CameraMenu}
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor: Colors.white,
          // animation: 'fade',
          // animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name='DetailCarbonUser'
        component={DetailCarbonUser}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'Jakarta-SemiBold',
            fontSize: TEXT.sm,
          },
          title: 'Teman Bumi',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return <CustomBackButton />;
          },
        }}
      />
      <Stack.Screen
        name='InputCarbon'
        component={InputCarbon}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'Jakarta-SemiBold',
            fontSize: TEXT.sm,
          },
          title: 'Teman Bumi',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return <CustomBackButton />;
          },
        }}
      />
      <Stack.Screen
        name='ShowArticle'
        component={ShowArticle}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'Jakarta-SemiBold',
            fontSize: TEXT.sm,
          },
          title: 'Teman Bumi',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return <CustomBackButton />;
          },
        }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'Jakarta-SemiBold',
            fontSize: TEXT.sm,
          },
          title: 'Teman Bumi',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return <CustomBackButton />;
          },
        }}
      />
      <Stack.Screen
        name='About'
        component={About}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'Jakarta-SemiBold',
            fontSize: TEXT.sm,
          },
          title: 'Teman Bumi',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return <CustomBackButton />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackScreen;
