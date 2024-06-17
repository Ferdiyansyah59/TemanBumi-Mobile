import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import ScreenDimensions from '../../static/dimensions';
import BtnClassification from './micro/btnClassification';
import BtnCarbons from './micro/btnCarbons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const WIDTH = ScreenDimensions.width;
const Middle = () => {
  const [carbon, setCarbon] = useState();
  const nav = useNavigation();

  const getEmission = async () => {
    const token = await AsyncStorage.getItem('token');

    const data = await AsyncStorage.getItem('data');
    const userId = JSON.parse(data);
    axios
      .get(`${API_URL}/getFootPrint/${userId.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCarbon(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEmission();
  }, []);

  const handleCallback = async () => {
    await getEmission();
  };

  return (
    <View style={styles.middleCard}>
      <View style={styles.innerMiddleCard}>
        <View style={styles.emissionCard}>
          <Text
            style={[
              styles.carbon,
              { fontFamily: 'Jakarta-Medium', fontSize: TEXT.xs },
            ]}
          >
            Jejak Karbon Kamu
          </Text>
          <Text
            style={[
              styles.carbon,
              {
                fontFamily: 'Jakarta-SemiBold',
                fontSize: TEXT.sm,
                marginTop: 5,
              },
            ]}
          >
            {carbon}
          </Text>
          <Text
            style={[
              styles.carbon,
              {
                fontFamily: 'Jakarta-medium',
                fontSize: TEXT.xxs,
              },
            ]}
          >
            Kg CO2e
          </Text>
        </View>
        <View style={styles.carbonBtnContainer}>
          <Text style={{ fontFamily: 'Jakarta-Regular', fontSize: TEXT.xs }}>
            Lihat detail emisi karbon kamu dengan tombol dibawah ini
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => nav.navigate('DetailCarbonUser')}
          >
            <View style={styles.btnCarbon}>
              <Text style={styles.txtBtnCarbon}>Detail Emisi Karbonmu</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Classification Button */}
      <BtnClassification
        onPress={() => nav.navigate('Classification', { image: null })}
      />
      {/* Btn Carbons */}
      <BtnCarbons
        onPress={() =>
          nav.navigate('InputCarbon', { onGoBack: handleCallback })
        }
      />
    </View>
  );
};

export default Middle;

const styles = StyleSheet.create({
  // Middle

  middleCard: {
    backgroundColor: '#D0EAD3',
    alignSelf: 'center',
    width: WIDTH * 0.9,
    marginVertical: 15,
    padding: 15,
    borderRadius: 20,
  },
  innerMiddleCard: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  emissionCard: {
    backgroundColor: '#D0EAD3',
    flex: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  carbonBtnContainer: {
    flex: 0.7,
    marginLeft: 10,
    marginTop: 10,
  },
  carbon: {
    fontSize: TEXT.xsm,
    textAlign: 'center',
  },
  btnCarbon: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 7,
    paddingVertical: 8,
    marginTop: 10,
  },
  txtBtnCarbon: {
    fontFamily: 'Jakarta-Medium',
    fontSize: TEXT.xs,
    textAlign: 'center',
    color: Colors.white,
  },
});
