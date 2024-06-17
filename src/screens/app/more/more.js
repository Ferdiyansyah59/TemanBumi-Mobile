import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenDimensions from '../../../static/dimensions';
import Colors from '../../../static/Colors';
import { useNavigation } from '@react-navigation/native';
import TEXT from '../../../static/Text';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../../../../config/store';

const WIDTH = ScreenDimensions.width;

function More() {
  const authCtx = useContext(AuthContext);
  const navi = useNavigation();
  // const [name, setName] = useState();
  const [data, setData] = useState({});
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const getDataStorage = async () => {
    const data = await AsyncStorage.getItem('data');
    const d = JSON.parse(data);
    setName(d.name);
    setEmail(d.email);
  };

  // const authCtx = useContext(AuthContext);

  useEffect(() => {
    getDataStorage();
  });

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <>
      <StatusBar
        style='light'
        backgroundColor={Colors.primary}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile */}
          <View style={styles.profileContainer}>
            <View style={styles.imgCircle}>
              <Image
                style={styles.img}
                source={require('../../../../assets/img/people.png')}
              />
            </View>
            <View>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
          {/* Menu */}
          <View style={{ marginTop: 30, marginBottom: 120 }}>
            <TouchableOpacity
              style={styles.menuContainer}
              activeOpacity={0.8}
              onPress={() =>
                navi.navigate('Profile', {
                  name: name,
                  email: email,
                })
              }
            >
              <FontAwesome5
                name='user'
                size={TEXT.xl}
                color={Colors.grey800}
              />
              <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>Profil</Text>
                <SimpleLineIcons
                  name='arrow-right'
                  size={TEXT.xs}
                  color='black'
                />
              </View>
            </TouchableOpacity>
            <View style={styles.lines} />
            {/* About */}
            <TouchableOpacity
              style={styles.menuContainer}
              activeOpacity={0.8}
              onPress={() => navi.navigate('About')}
            >
              <Feather
                name='info'
                size={TEXT.xl}
                color={Colors.grey800}
              />
              <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>Tentang Aplikasi</Text>
                <SimpleLineIcons
                  name='arrow-right'
                  size={TEXT.xs}
                  color='black'
                />
              </View>
            </TouchableOpacity>
            <View style={styles.lines} />
            {/* Logout */}
            <TouchableOpacity
              style={styles.menuContainer}
              activeOpacity={0.8}
              onPress={handleLogout}
            >
              <SimpleLineIcons
                name='logout'
                size={TEXT.xl}
                color={Colors.grey800}
              />
              <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>Logout</Text>
                <SimpleLineIcons
                  name='arrow-right'
                  size={TEXT.xs}
                  color='black'
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* <Text>
          Halaman More di dalemnya nanti ada profile, setting, petunjuk,
          tentang, logout
        </Text> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default More;

const styles = StyleSheet.create({
  container: {
    height: ScreenDimensions.height,
    width: WIDTH,
    backgroundColor: 'white',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: WIDTH >= 400 ? 30 : 25,
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 90,
  },
  imgCircle: {
    height: WIDTH < 400 ? 60 : WIDTH < 600 ? 80 : 110,
    width: WIDTH < 400 ? 60 : WIDTH < 600 ? 80 : 110,
    backgroundColor: Colors.white,
    borderRadius: 100,
    marginRight: 15,
  },
  img: {
    height: WIDTH < 400 ? 60 : WIDTH < 600 ? 80 : 110,
    width: WIDTH < 400 ? 60 : WIDTH < 600 ? 80 : 110,
    borderRadius: 100,
  },
  name: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.md,
    color: 'white',
    paddingRight: 20,
  },
  lines: {
    backgroundColor: '#F3F3F3',
    height: 10,
    width: ScreenDimensions.width,
    marginVertical: 20,
    marginBottom: 15,
  },
  menuContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  menuTitleContainer: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  menuTitle: {
    fontFamily: 'Jakarta-Medium',
    fontSize: TEXT.xsm,
    color: Colors.grey800,
  },
});
