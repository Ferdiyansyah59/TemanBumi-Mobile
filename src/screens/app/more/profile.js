import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../static/Colors';
import ScreenDimensions from '../../../static/dimensions';
import TEXT from '../../../static/Text';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = ScreenDimensions.width;

function Profile() {
  const route = useRoute().params;
  return (
    // <ScrollView>
    <>
      <StatusBar
        style='light'
        backgroundColor={Colors.primarBlue}
      />
      <View style={styles.container}>
        <View style={styles.topCard}>
          <View style={styles.imgContainer}>
            <View style={styles.imgCircle}>
              <Image
                style={styles.img}
                source={require('../../../../assets/img/people.png')}
              />
            </View>
            <Text style={styles.name}>{route.name}</Text>
          </View>
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          <Text style={styles.dataTitle}>Informasi</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Email</Text>
            <Text style={styles.data}>{route.email}</Text>
          </View>
        </View>
      </View>
    </>
    // </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: ScreenDimensions.height,
    backgroundColor: Colors.primarBlue,
    alignItems: 'center',
  },
  topCard: {
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: '#333333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    width: WIDTH * 0.8,
    padding: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  editTxt: {
    fontFamily: 'Jakarta-Medium',
    fontSize: TEXT.sm,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  imgContainer: {
    width: '100%',
    alignItems: 'center',
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
    fontSize: TEXT.sm,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomCard: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    marginTop: 20,
    borderTopColor: '#D4D4D4',
    borderTopWidth: 2,
    padding: 20,
  },
  dataTitle: {
    fontFamily: 'Jakarta-SemiBold',
    marginBottom: 10,
    fontSize: TEXT.sm,
  },
  dataContainer: {
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  dataLabel: {
    fontFamily: 'Jakarta-Medium',
    color: '#6D6D6D',
    fontSize: TEXT.sm,
  },
  data: {
    fontFamily: 'Jakarta-Medium',
    color: '#292241',
    marginVertical: 7,
    marginLeft: 10,
    fontSize: TEXT.sm,
  },
});
